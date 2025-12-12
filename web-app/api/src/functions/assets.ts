import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { TableClient, TableServiceClient } from "@azure/data-tables";

const connectionString = process.env.STORAGE_CONNECTION_STRING || "UseDevelopmentStorage=true";

// Initialize table clients
const getTableClient = (tableName: string) => {
  return TableClient.fromConnectionString(connectionString, tableName);
};

// Ensure tables exist
async function ensureTables() {
  const tableService = TableServiceClient.fromConnectionString(connectionString);
  const tables = ["assets", "sans", "returns", "transactions"];

  for (const table of tables) {
    try {
      await tableService.createTable(table);
    } catch {
      // Table already exists
    }
  }
}

// GET /api/assets?location=xxx
async function getAssets(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const location = request.query.get("location") || "basement-4.2";

  try {
    await ensureTables();
    const client = getTableClient("assets");
    const assets = [];

    const iterator = client.listEntities({
      queryOptions: { filter: `PartitionKey eq '${location}'` }
    });

    for await (const entity of iterator) {
      assets.push({
        id: entity.rowKey,
        item: entity.item,
        lastCount: entity.lastCount,
        newCount: entity.newCount,
        threshold: entity.threshold,
        location: entity.partitionKey
      });
    }

    return { jsonBody: assets };
  } catch (error) {
    context.error("Error getting assets:", error);
    return { status: 500, jsonBody: { error: "Failed to get assets" } };
  }
}

// POST /api/assets
async function createOrUpdateAsset(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    await ensureTables();
    const body = await request.json() as any;
    const client = getTableClient("assets");

    const entity = {
      partitionKey: body.location,
      rowKey: body.id,
      item: body.item,
      lastCount: body.lastCount,
      newCount: body.newCount,
      threshold: body.threshold
    };

    await client.upsertEntity(entity);

    return { status: 200, jsonBody: { success: true } };
  } catch (error) {
    context.error("Error saving asset:", error);
    return { status: 500, jsonBody: { error: "Failed to save asset" } };
  }
}

// Register HTTP endpoints
app.http("getAssets", {
  methods: ["GET"],
  route: "assets",
  authLevel: "anonymous",
  handler: getAssets
});

app.http("saveAsset", {
  methods: ["POST", "PUT"],
  route: "assets",
  authLevel: "anonymous",
  handler: createOrUpdateAsset
});
