import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { TableClient, TableServiceClient } from "@azure/data-tables";

const connectionString = process.env.STORAGE_CONNECTION_STRING || "UseDevelopmentStorage=true";

const getTableClient = (tableName: string) => {
  return TableClient.fromConnectionString(connectionString, tableName);
};

// GET /api/sans - Get all SAN records
async function getSANs(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const client = getTableClient("sans");
    const sans = [];

    for await (const entity of client.listEntities()) {
      sans.push({
        sanNumber: entity.rowKey,
        item: entity.item,
        timestamp: entity.timestamp,
        location: entity.location
      });
    }

    return { jsonBody: sans };
  } catch (error) {
    context.error("Error getting SANs:", error);
    return { status: 500, jsonBody: { error: "Failed to get SANs" } };
  }
}

// POST /api/sans - Add new SAN
async function addSAN(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = await request.json() as any;
    const client = getTableClient("sans");

    // Check if SAN already exists
    try {
      await client.getEntity("san", body.sanNumber);
      return { status: 409, jsonBody: { error: "SAN already exists" } };
    } catch {
      // SAN doesn't exist, we can create it
    }

    const entity = {
      partitionKey: "san",
      rowKey: body.sanNumber,
      item: body.item,
      timestamp: new Date().toISOString(),
      location: body.location
    };

    await client.createEntity(entity);

    return { status: 201, jsonBody: { success: true } };
  } catch (error) {
    context.error("Error adding SAN:", error);
    return { status: 500, jsonBody: { error: "Failed to add SAN" } };
  }
}

// DELETE /api/sans/{sanNumber}
async function deleteSAN(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const sanNumber = request.params.sanNumber;

  try {
    const client = getTableClient("sans");
    await client.deleteEntity("san", sanNumber);

    return { status: 200, jsonBody: { success: true } };
  } catch (error) {
    context.error("Error deleting SAN:", error);
    return { status: 500, jsonBody: { error: "Failed to delete SAN" } };
  }
}

// GET /api/sans/check/{sanNumber} - Check if SAN exists
async function checkSAN(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const sanNumber = request.params.sanNumber;

  try {
    const client = getTableClient("sans");
    const entity = await client.getEntity("san", sanNumber);

    return {
      jsonBody: {
        exists: true,
        item: entity.item,
        location: entity.location
      }
    };
  } catch {
    return { jsonBody: { exists: false } };
  }
}

app.http("getSANs", {
  methods: ["GET"],
  route: "sans",
  authLevel: "anonymous",
  handler: getSANs
});

app.http("addSAN", {
  methods: ["POST"],
  route: "sans",
  authLevel: "anonymous",
  handler: addSAN
});

app.http("deleteSAN", {
  methods: ["DELETE"],
  route: "sans/{sanNumber}",
  authLevel: "anonymous",
  handler: deleteSAN
});

app.http("checkSAN", {
  methods: ["GET"],
  route: "sans/check/{sanNumber}",
  authLevel: "anonymous",
  handler: checkSAN
});
