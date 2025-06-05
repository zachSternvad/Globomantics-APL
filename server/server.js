const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Sökvägen till din datafil
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

// ---- UPPDATERAD ENDPOINT ----
// Endpoint för att ta emot och SPARA ett nytt bud
app.post("/api/houses/:id/bids", (req, res) => {
    const houseId = parseInt(req.params.id, 10);
    const newBid = req.body;

    // 1. Läs den nuvarande datan från filen
    fs.readFile(housesPath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while reading the houses data.");
        }

        const houses = JSON.parse(data);

        // 2. Hitta rätt hus och lägg till det nya budet
        const updatedHouses = houses.map(h => {
            if (h.id === houseId) {
                const newBids = h.bids ? [...h.bids, newBid] : [newBid];
                return { ...h, bids: newBids };
            }
            return h;
        });

        // 3. Skriv tillbaka hela den uppdaterade listan till filen
        fs.writeFile(housesPath, JSON.stringify(updatedHouses, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("An error occurred while saving the new bid.");
            }

            // 4. Skicka ett framgångsmeddelande tillbaka
            res.status(201).json({
                message: "Bid saved successfully!",
                bid: newBid
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});