import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { TableClient } from "@azure/data-tables";

const connectionString = process.env.STORAGE_CONNECTION_STRING || "UseDevelopmentStorage=true";

const getTableClient = (tableName: string) => {
  return TableClient.fromConnectionString(connectionString, tableName);
};

// GET /api/returns - Get all SAN returns
async function getReturns(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const client = getTableClient("returns");
    const returns = [];

    for await (const entity of client.listEntities()) {
      returns.push({
        id: entity.rowKey,
        sanNumber: entity.sanNumber,
        generation: entity.generation,
        returnedBy: entity.returnedBy,
        returnedTo: entity.returnedTo,
        notes: entity.notes,
        timestamp: entity.timestamp
      });
    }

    // Sort by timestamp descending
    returns.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return { jsonBody: returns };
  } catch (error) {
    context.error("Error getting returns:", error);
    return { status: 500, jsonBody: { error: "Failed to get returns" } };
  }
}

// POST /api/returns - Record new SAN return
async function addReturn(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = await request.json() as any;
    const client = getTableClient("returns");

    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const entity = {
      partitionKey: "return",
      rowKey: id,
      sanNumber: body.sanNumber,
      generation: body.generation,
      returnedBy: body.returnedBy,
      returnedTo: body.returnedTo,
      notes: body.notes || "",
      timestamp: new Date().toISOString()
    };

    await client.createEntity(entity);

    return { status: 201, jsonBody: { id, timestamp: entity.timestamp } };
  } catch (error) {
    context.error("Error adding return:", error);
    return { status: 500, jsonBody: { error: "Failed to add return" } };
  }
}

app.http("getReturns", {
  methods: ["GET"],
  route: "returns",
  authLevel: "anonymous",
  handler: getReturns
});

app.http("addReturn", {
  methods: ["POST"],
  route: "returns",
  authLevel: "anonymous",
  handler: addReturn
});
