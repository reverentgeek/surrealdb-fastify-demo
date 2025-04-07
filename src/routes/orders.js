import { RecordId } from "surrealdb";

export default async function coffeeApi( fastify, options ) {
  // Get all orders
  fastify.get( "/", async ( request, reply ) => {
    try {
      const orders = await fastify.db.select( "order" );
      return orders;
    } catch ( err ) {
      reply
        .code( 500 )
        .send( { error: "Failed to get orders", message: err.message } );
    }
  } );

  // Get order by ID
  fastify.get( "/:id", async ( request, reply ) => {
    try {
      // Use SurrealDB's RecordId to create an ID in correct format
      const orderId = new RecordId( "order", request.params.id );
      const order = await fastify.db.select( orderId );
      if ( order === undefined ) {
        return reply.code( 404 ).send( { message: "Order not found" } );
      }
      return order;
    } catch ( err ) {
      request.log.error( err );
      reply
        .code( 500 )
        .send( { error: "Failed to get order", message: err.message } );
    }
  } );

  // Create new order
  fastify.post( "/", async ( request, reply ) => {
    try {
      const { customerName, drink, size, extras, price } = request.body;
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;
      const status = "pending";
      const order = await fastify.db.insert( "order", { customerName, drink, size, extras, price, createdAt, updatedAt, status } );
      return order;
    } catch ( err ) {
      reply
        .code( 500 )
        .send( { error: "Failed to create order", message: err.message } );
    }
  } );

  // Update an order by ID
  fastify.put( "/:id", async ( request, reply ) => {
    try {
      const orderId = new RecordId( "order", request.params.id );
      const { customerName, drink, extras, price, size, status } = request.body;
      // Object destructuring to get only the supplied fields
      const orderUpdate = {
        ...( customerName !== undefined && { customerName } ),
        ...( drink !== undefined && { drink } ),
        ...( extras !== undefined && { extras } ),
        ...( price !== undefined && { price } ),
        ...( size !== undefined && { size } ),
        ...( status !== undefined && { status } ),
        updatedAt: new Date().toISOString()
      };
      // db.update() will replace the entire record with supplied data
      // db.merge() updates an existing record with the new data
      const order = await fastify.db.merge( orderId, orderUpdate );
      if ( order === undefined ) {
        return reply.code( 404 ).send( { message: "Order not found" } );
      }
      return order;
    } catch ( err ) {
      request.log.error( err );
      reply
        .code( 500 )
        .send( { error: "Failed to update order", message: err.message } );
    }
  } );

  // Delete an order by ID
  fastify.delete( "/:id", async ( request, reply ) => {
    try {
      const orderId = new RecordId( "order", request.params.id );
      const order = await fastify.db.delete( orderId );
      if ( order === undefined ) {
        return reply.code( 404 ).send( { message: "Order not found" } );
      }
      return reply.code( 204 ).send();
    } catch ( err ) {
      request.log.error( err );
      reply
        .code( 500 )
        .send( { error: "Failed to delete order", message: err.message } );
    }
  } );
}
