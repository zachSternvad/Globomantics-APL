// Importerar paket för servern.
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Skapar en instans av express-appen och definierar en port.
const app = express();
const port = 4000;

// Använder middleware.
app.use(cors());
app.use(express.json());

// Sökväg till datafilen.
const housesPath = path.join(__dirname, '../public/houses.json');


// --- API Endpoints ---

// Endpoint för att hämta alla hus.
app.get("/api/houses", (req, res) => {
    fs.readFile(housesPath, "utf8", (err, data) => {
        if (err) { return res.status(500).send("Error reading file."); }
        res.send(JSON.parse(data));
    });
});

// Endpoint för att lägga till ett bud.
app.post("/api/houses/:id/bids", (req, res) => {
    const houseId = parseInt(req.params.id, 10);
    const newBid = req.body;
    fs.readFile(housesPath, "utf8", (err, data) => {
        if (err) { return res.status(500).send("Error reading file."); }
        const houses = JSON.parse(data);
        const updatedHouses = houses.map(h => {
            if (h.id === houseId) {
                const newBids = h.bids ? [...h.bids, newBid] : [newBid];
                return { ...h, bids: newBids };
            }
            return h;
        });
        fs.writeFile(housesPath, JSON.stringify(updatedHouses, null, 2), (err) => {
            if (err) { return res.status(500).send("Error writing file."); }
            res.status(201).json({ message: "Bid saved!" });
        });
    });
});

// Endpoint för att lägga till ett nytt hus.
app.post("/api/houses", (req, res) => {
    const newHouse = req.body;
    fs.readFile(housesPath, "utf8", (err, data) => {
        if (err) { return res.status(500).send("Error reading houses file."); }
        const houses = JSON.parse(data);
        const maxId = Math.max(...houses.map(h => h.id));
        newHouse.id = maxId + 1;
        houses.push(newHouse);
        fs.writeFile(housesPath, JSON.stringify(houses, null, 2), (err) => {
            if (err) { return res.status(500).send("Error saving new house."); }
            res.status(201).json(newHouse);
        });
    });
});

// Endpoint för att ta bort ett hus.
app.delete("/api/houses/:id", (req, res) => {
    const houseId = parseInt(req.params.id, 10);
    fs.readFile(housesPath, "utf8", (err, data) => {
        if (err) { return res.status(500).send("Error reading houses file."); }
        let houses = JSON.parse(data);
        const updatedHouses = houses.filter(h => h.id !== houseId);
        if (houses.length === updatedHouses.length) {
            return res.status(404).send("House not found.");
        }
        fs.writeFile(housesPath, JSON.stringify(updatedHouses, null, 2), (err) => {
            if (err) { return res.status(500).send("Error saving updated houses file."); }
            res.status(200).json({ message: `House with id ${houseId} deleted successfully.` });
        });
    });
});

// Ny endpoint för att ta bort ett specifikt bud från ett hus.
app.delete("/api/houses/:houseId/bids/:bidIndex", (req, res) => {
    // Jag hämtar husets ID och budets index från URL:en.
    const houseId = parseInt(req.params.houseId, 10);
    const bidIndex = parseInt(req.params.bidIndex, 10);

    // Jag läser in hela listan med hus.
    fs.readFile(housesPath, "utf8", (err, data) => {
        if (err) { return res.status(500).send("Error reading houses file."); }
        const houses = JSON.parse(data);
        
        // Jag letar upp det specifika huset.
        const houseIndex = houses.findIndex(h => h.id === houseId);
        if (houseIndex === -1) {
            return res.status(404).send("House not found.");
        }
        
        // Jag kollar om det finns några bud att ta bort.
        if (!houses[houseIndex].bids || !houses[houseIndex].bids[bidIndex]) {
            return res.status(404).send("Bid not found.");
        }

        // Jag tar bort budet från listan med splice-metoden.
        houses[houseIndex].bids.splice(bidIndex, 1);

        // Jag skriver tillbaka den uppdaterade listan med hus till filen.
        fs.writeFile(housesPath, JSON.stringify(houses, null, 2), (err) => {
            if (err) { return res.status(500).send("Error saving updated data."); }
            res.status(200).json({ message: "Bid deleted successfully." });
        });
    });
});

// Startar servern.
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});