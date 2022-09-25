import * as assert from "assert";
import Client from "client";

const endpoint = process.env.ENDPOINT;
assert(endpoint != undefined, "ENDPOINT not defined at .env");

const client = new Client(endpoint);
client.connect();
