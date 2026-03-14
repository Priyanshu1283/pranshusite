import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/Message";
import type { ContactPayload } from "@/types/message";

/**
 * Persists a contact message to MongoDB.
 * Uses centralized connection from lib/mongodb.
 */
export async function createMessage(payload: ContactPayload): Promise<{ id: string }> {
  await connectDB();
  const doc = await Message.create({
    name: payload.name,
    email: payload.email,
    message: payload.message,
  });
  return { id: doc._id.toString() };
}
