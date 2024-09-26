const express = require('express') // Imports the express module, which is a web application framework for Node.js. It simplifies routing and handling HTTP requests.

const mysql = require('mysql')  //  Imports the mysql module, which allows Node.js to interact with MySQL databases.

const cors = require ('cors') // Imports the cors module, which enables Cross-Origin Resource Sharing, allowing your server to handle requests from different origins.


const app = express() // Creates an instance of an Express application.
app.use(cors()) // Applies the CORS middleware to the Express app.


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dse_6100"
})

// let's see whether we can connect to the database successfully or not
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// when the browser points to localhost:8081/
app.get('/', (request, response) => { 
     return response.json("Welcome to the DB class.")
});

// when the browser points to localhost:8081/listall
app.get('/listall', (request, response) => {
    const stmt = "SELECT * FROM botanicalgardens"
    db.query(stmt, (err, data) => {
        if(err) return response.json(err)
        else return response.json(data)
    })
});


app.get('/joins', async(request,response) => {
    const sql1 = `
        SELECT HomeDecorStores.StoreName,HomeDecorStores.Location,FurnitureCollections.CollectionName, FurnitureCollections.Description
        FROM HomeDecorStores, FurnitureCollections
        WHERE HomeDecorStores.StoreID = FurnitureCollections.StoreID
        AND FurnitureCollections.CollectionName = 'MALM'
        AND HomeDecorStores.Location = 'New York';`;
    
    const sql2 = `
        SELECT HomeDecorStores.StoreName, HomeDecorStores.Location, FurnitureCollections.CollectionName, FurnitureCollections.Description
        FROM HomeDecorStores, FurnitureCollections
        WHERE HomeDecorStores.StoreID = FurnitureCollections.StoreID
        AND FurnitureCollections.Description LIKE "Side tables%";`;
    
    const sql3 = `
        SELECT CoffeeShops.ShopName, MenuItems.ItemName, CoffeeShops.Location, MenuItems.Price
        FROM CoffeeShops, MenuItems
        WHERE CoffeeShops.ShopID = MenuItems.ShopID
        AND MenuItems.ItemName = 'Caramel Macchiato';`;
  
    const sql4 = `
        SELECT CoffeeShops.ShopName,MenuItems.ItemName, CoffeeShops.Location, MenuItems.Price
        FROM CoffeeShops, MenuItems
        WHERE CoffeeShops.ShopID = MenuItems.ShopID
        AND CoffeeShops.Location = 'Los Angeles'
        AND MenuItems.Price < 5;`;
  
    const sql5 = `
        SELECT TravelAgencies.AgencyName, Packages.PackageName,TravelAgencies.Location,Packages.Description
        FROM TravelAgencies, Packages
        WHERE TravelAgencies.AgencyID = Packages.AgencyID
        AND TravelAgencies.Location = 'Dallas';`;
  
    const sql6 = `
        SELECT TravelAgencies.AgencyName,Packages.PackageName,TravelAgencies.Location,Packages.Description
        FROM TravelAgencies, Packages
        WHERE TravelAgencies.AgencyID = Packages.AgencyID
        AND Packages.Description LIKE "7-night%";`;
    
    const sql7 = `
        SELECT RealEstateAgents.AgentName, Properties.PropertyType, Properties.Address, RealEstateAgents.Location
        FROM RealEstateAgents, Properties
        WHERE RealEstateAgents.AgentID = Properties.AgentID
        AND Properties.PropertyType = 'Apartment';`;
  
    const sql8 = `
        SELECT RealEstateAgents.AgentName, Properties.PropertyType, Properties.Address,RealEstateAgents.Location
        FROM RealEstateAgents, Properties
        WHERE RealEstateAgents.AgentID = Properties.AgentID
        AND RealEstateAgents.Location = "New York";`;
  
    const sql9 = `
        SELECT BotanicalGardens.GardenName, PlantSpecies.SpeciesName, PlantSpecies.Description, BotanicalGardens.Location
        FROM BotanicalGardens, PlantSpecies
        WHERE BotanicalGardens.GardenID = PlantSpecies.GardenID
        AND PlantSpecies.SpeciesName = 'Rose'
        AND BotanicalGardens.GardenName = 'New York Botanical Garden';`;
  
    const sql10 = `
        SELECT BotanicalGardens.GardenName, PlantSpecies.SpeciesName, PlantSpecies.Description, BotanicalGardens.Location
        FROM BotanicalGardens, PlantSpecies
        WHERE BotanicalGardens.GardenID = PlantSpecies.GardenID
        AND PlantSpecies.SpeciesName = 'Succulent';`;
    
    const queries = [sql1,sql2,sql3,sql4,sql5,sql6,sql7,sql8,sql9,sql10];
    try {
      const results = await Promise.all(
        queries.map((sql, index) => {
          return new Promise((resolve, reject) => {
            db.query(sql, (err, data) => {
              if (err) return reject(err);
              resolve ({ [`join${index + 1}`]: data });
            });
          });
        })
      );
      return response.json(results);
    }catch (err) {
      return response.status(500).json({error : err.messsage});
    }
  });



// set up the web server listener
app.listen(8081, () => {
    console.log("I am listening.")
});