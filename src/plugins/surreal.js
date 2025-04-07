import fp from "fastify-plugin";
import { getDatabase  } from "../data/db.js";

export default fp( async function ( fastify, opts ) {
  const db = await getDatabase( opts );
  fastify.decorate( "db", db );
} );
