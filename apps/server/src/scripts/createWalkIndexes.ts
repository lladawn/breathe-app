/**
 * One-time script to create indexes for Walk Together collections.
 * Run from apps/server: npx ts-node src/scripts/createWalkIndexes.ts
 */
import "dotenv/config";
import { client } from "../lib/mongo";

const db = client.db("breathe");

async function main() {
  await client.connect();

  const walkRequests = db.collection("walk_requests");
  await walkRequests.createIndex({ receiverId: 1 });
  await walkRequests.createIndex({ senderId: 1 });
  await walkRequests.createIndex({ createdAt: -1 });
  console.log("walk_requests indexes created.");

  const walkRooms = db.collection("walk_rooms");
  await walkRooms.createIndex({ users: 1 });
  await walkRooms.createIndex({ expiresAt: 1 });
  console.log("walk_rooms indexes created.");

  await client.close();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
