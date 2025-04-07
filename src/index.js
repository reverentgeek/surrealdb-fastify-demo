import "dotenv/config.js";
import Fastify from "fastify";

import surrealConfig from "./config/surreal.js";
import surreal from "./plugins/surreal.js";
import ordersApi from "./routes/orders.js";

const port = process.env.PORT || 3000;

// Create a Fastify instance
const fastify = Fastify( { logger: true } );

// Register plugins and routes
fastify.register( surreal, surrealConfig );
fastify.register( ordersApi, { prefix: "/api/order" } );

// Start the server
const start = async () => {
  try {
    await fastify.listen( { port } );
  } catch ( err ) {
    fastify.log.error( err );
  }
};
start();
