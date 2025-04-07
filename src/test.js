import "dotenv/config.js";

import config from "./config/surreal.js";
import { getDatabase } from "./data/db.js";

// Add sample coffee orders to the database
async function addCoffeeOrders( db ) {
  const orders = [
    {
      customerName: "Sarah",
      drink: "Oat Milk Latte",
      size: "medium",
      extras: [ "Extra Shot", "Sugar-Free Vanilla" ],
      price: 6.75,
      createdAt: new Date().toISOString(),
      status: "completed"
    },
    {
      customerName: "Marcus",
      drink: "Cold Brew",
      size: "large",
      extras: [ "Light Ice", "Sweet Cream" ],
      price: 5.95,
      createdAt: new Date().toISOString(),
      status: "in-progress"
    },
    {
      customerName: "Emma",
      drink: "Caramel Macchiato",
      size: "small",
      extras: [ "Whipped Cream", "Extra Caramel" ],
      price: 5.25,
      createdAt: new Date().toISOString(),
      status: "pending"
    },
    {
      customerName: "Liam",
      drink: "Espresso",
      size: "espresso",
      extras: [],
      price: 3.50,
      createdAt: new Date().toISOString(),
      status: "completed"
    }
  ];
  await db.insert( "order", orders );
}

async function main() {
  let db;
  try {
    // Connect to the database
    db = await getDatabase( config );
    if ( !db ) {
      console.error( "Could not connect to database!" );
      return;
    }

    // Insert sample coffee orders
    await addCoffeeOrders( db );

    // Query the coffee orders
    const orders = await db.query( `
		  SELECT customerName, drink, size 
		  FROM order 
		  WHERE status = 'completed';` );

    console.log( orders );
  }
  catch( err ) {
    console.log( err );
  } finally {
    // Close the database connection
    if ( db ) {
      await db.close();
    }
  }
}

// Call the main function to start the script
main();
