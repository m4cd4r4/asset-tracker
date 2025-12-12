import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { TableClient } from "@azure/data-tables";

const connectionString = process.env.STORAGE_CONNECTION_STRING || "UseDevelopmentStorage=true";

const getTableClient = (tableName: string) => {
  return TableClient.fromConnectionString(connectionString, tableName);
};

// GET /api/transactions?location=xxx
async function getTransactions(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const location = request.query.get("location");

  try {
    const client = getTableClient("transactions");
    const transactions = [];

    const filter = location ? `location eq '${location}'` : undefined;

    for await (const entity of client.listEntities({ queryOptions: filter ? { filter } : undefined })) {
      transactions.push({
        id: entity.rowKey,
        timestamp: entity.timestamp,
        item: entity.item,
        action: entity.action,
        sanNumber: entity.sanNumber,
        volume: entity.volume,
        location: entity.location
      });
    }

    // Sort by timestamp descending
    transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return { jsonBody: transactions };
  } catch (error) {
    context.error("Error getting transactions:", error);
    return { status: 500, jsonBody: { error: "Failed to get transactions" } };
  }
}

// POST /api/transactions - Log new transaction
async function addTransaction(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = await request.json() as any;
    const client = getTableClient("transactions");

    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const entity = {
      partitionKey: body.location || "default",
      rowKey: id,
      timestamp: new Date().toISOString(),
      item: body.item,
      action: body.action,
      sanNumber: body.sanNumber || "",
      volume: body.volume,
      location: body.location
    };

    await client.createEntity(entity);

    return { status: 201, jsonBody: { id, timestamp: entity.timestamp } };
  } catch (error) {
    context.error("Error adding transaction:", error);
    return { status: 500, jsonBody: { error: "Failed to add transaction" } };
  }
}

app.http("getTransactions", {
  methods: ["GET"],
  route: "transactions",
  authLevel: "anonymous",
  handler: getTransactions
});

app.http("addTransaction", {
  methods: ["POST"],
  route: "transactions",
  authLevel: "anonymous",
  handler: addTransaction
});
