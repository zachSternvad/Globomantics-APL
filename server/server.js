const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const housesPath = path.join(__dirname, '../public/houses.json');

// --- API Endpoints ---

// Endpoint för att hämta alla hus (samma som förut)
app.get("/api/houses", (req, res) => {
    fs.readFile(housesPath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while reading the houses data.");
        }
        res.send(JSON.parse(data));
    });
});

// Endpoint för att hantera bud (samma som förut)
app.post("/api/houses/:id/bids", (req, res) => {
    // ... (ingen ändring i denna endpoint)
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


// ---- NY ENDPOINT FÖR ATT LÄGGA TILL ETT HUS ----
app.post("/api/houses", (req, res) => {
    const newHouse = req.body;

    fs.readFile(housesPath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading houses file.");
        }
        const houses = JSON.parse(data);

        // Skapa ett nytt unikt ID
        const maxId = Math.max(...houses.map(h => h.id));
        newHouse.id = maxId + 1;

        // Lägg till det nya huset i listan
        houses.push(newHouse);

        // Skriv tillbaka hela listan till filen
        fs.writeFile(housesPath, JSON.stringify(houses, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error saving new house.");
            }
            // Skicka tillbaka det nya huset med sitt nya ID
            res.status(201).json(newHouse);
        });
    });
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});