import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.STREAM_API_KEY || "";
const apiSecret = process.env.STREAM_API_SECRET || "";

if (!apiKey || !apiSecret) {
  throw new Error("Stream API key and secret must be defined");
}

const client = new StreamClient(apiKey, apiSecret);

export default client;
