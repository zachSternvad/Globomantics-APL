const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Jag skapar en instans av express-appen och definierar en port.
const app = express();
const port = 4000;

// Jag använder middleware. cors() för att tillåta anrop från min React-app
// och express.json() för att servern ska kunna förstå JSON-data som skickas till den.
app.use(cors());
app.use(express.json());

// Jag definierar en konstant för sökvägen till min datafil för att enkelt kunna återanvända den.
const housesPath = path.join(__dirname, '../public/houses.json');


// --- API Endpoints ---

// Detta är min endpoint för att hämta alla hus. Den använder GET-metoden.
app.get("/api/houses", (req, res) => {
    // Jag läser innehållet från min houses.json-fil.
    fs.readFile(housesPath, "utf8", (err, data) => {
        if (err) {
            // Om ett fel uppstår skickar jag ett felmeddelande.
            console.error(err);
            return res.status(500).send("An error occurred while reading the houses data.");
        }
        // Om allt går bra skickar jag tillbaka datan som JSON.
        res.send(JSON.parse(data));
    });
});

// Detta är min endpoint för att lägga till ett bud på ett specifikt hus. Den använder POST-metoden.
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

// Detta är min endpoint för att lägga till ett helt nytt hus. Den använder också POST.
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

// Här skapar jag en ny endpoint med metoden DELETE för att kunna ta bort ett hus.
// Den tar emot ett ID som en parameter i URL:en för att veta vilket hus som ska tas bort.
app.delete("/api/houses/:id", (req, res) => {
    // Jag hämtar husets ID från URL:en och gör om det till ett heltal.
    const houseId = parseInt(req.params.id, 10);

    // Jag läser in hela listan med hus från min JSON-fil.
    fs.readFile(housesPath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading houses file.");
        }
        let houses = JSON.parse(data);

        // Jag använder filter() för att skapa en ny lista som innehåller alla hus FÖRUTOM det med det ID jag vill ta bort.
        const updatedHouses = houses.filter(h => h.id !== houseId);

        // Jag kollar om listans längd har ändrats, för att säkerställa att ett hus faktiskt togs bort.
        if (houses.length === updatedHouses.length) {
            return res.status(404).send("House not found.");
        }

        // Jag skriver över den gamla filen med den nya listan av hus (där ett hus nu är borttaget).
        fs.writeFile(housesPath, JSON.stringify(updatedHouses, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error saving updated houses file.");
            }
            // Jag skickar ett framgångsmeddelande tillbaka till klienten.
            res.status(200).json({ message: `House with id ${houseId} deleted successfully.` });
        });
    });
});

// Här startar jag servern så att den börjar lyssna efter anrop på den port jag angett.
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});