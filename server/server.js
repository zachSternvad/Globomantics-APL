// Importerar paket för servern.
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Skapar en instans av express-appen och definierar en port.
const app = express();
const port = 4000;

// Använder middleware för att tillåta anrop från React-appen och för att tolka JSON.
app.use(cors());
app.use(express.json());

// Sökväg till datafilen.
const housesPath = path.join(__dirname, '../public/houses.json');


// --- API Endpoints ---

// Endpoint för att hämta alla hus.
app.get("/api/houses", (req, res) => {
    fs.readFile(housesPath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while reading the houses data.");
        }
        res.send(JSON.parse(data));
    });
});

// Endpoint för att lägga till ett bud på ett hus.
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
        if (err) {
            return res.status(500).send("Error reading houses file.");
        }
        const houses = JSON.parse(data);
        const maxId = Math.max(...houses.map(h => h.id));
        newHouse.id = maxId + 1;
        houses.push(newHouse);
        fs.writeFile(housesPath, JSON.stringify(houses, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error saving new house.");
            }
            res.status(201).json(newHouse);
        });
    });
});

// Endpoint för att ta bort ett hus med ett visst id.
app.delete("/api/houses/:id", (req, res) => {
    const houseId = parseInt(req.params.id, 10);
    fs.readFile(housesPath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading houses file.");
        }
        let houses = JSON.parse(data);
        // Skapar en ny lista utan huset som ska tas bort.
        const updatedHouses = houses.filter(h => h.id !== houseId);
        if (houses.length === updatedHouses.length) {
            return res.status(404).send("House not found.");
        }
        // Skriver över den gamla filen med den nya listan.
        fs.writeFile(housesPath, JSON.stringify(updatedHouses, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error saving updated houses file.");
            }
            res.status(200).json({ message: `House with id ${houseId} deleted successfully.` });
        });
    });
});

// Startar servern så den lyssnar på anrop.
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});