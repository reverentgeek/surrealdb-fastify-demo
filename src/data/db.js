import Surreal from "surrealdb";

export async function getDatabase( config ) {
  const { url, namespace, database, username, password } = config;
  const options = { auth: { username, password } };
  const db = new Surreal();
  try {
    await db.connect( url, options );
    await db.use( { namespace, database } );
    return db;
  } catch ( err ) {
    console.error( "Failed to connect to SurrealDB:", err instanceof Error ? err.message : String( err ) );
    throw err;
  }
}
