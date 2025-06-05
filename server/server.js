const express = require("express");
const cors = require("cors");
const fs = require("fs"); // Node.js inbyggda modul för att hantera filsystemet
const path = require("path"); // Node.js inbyggda modul för att hantera sökvägar

const app = express();
const port = 4000; // Vi väljer en port som inte krockar med React (som kör på 3000)

// Middleware
app.use(cors()); // Tillåt anrop från andra domäner/portar (din React-app)
app.use(express.json()); // Tillåt servern att ta emot och tolka JSON i request body

// --- API Endpoints ---

// En endpoint för att hämta alla hus
app.get("/api/houses", (req, res) => {
    // Skapa en korrekt sökväg till houses.json från serverns plats
    const housesPath = path.join(__dirname, '../public/houses.json');
    
    fs.readFile(housesPath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while reading the houses data.");
        }
        res.send(JSON.parse(data));
    });
});

// En endpoint för att ta emot ett nytt bud (vi implementerar bara mottagandet nu)
app.post("/api/houses/:id/bids", (req, res) => {
    const houseId = req.params.id;
    const bidData = req.body;

    console.log(`Received a new bid for house ${houseId}:`, bidData);
    
    // Svarar klienten för att bekräfta mottagandet
    // Senare kommer vi att spara detta bud till filen här.
    res.status(201).json({ 
        message: "Bid received successfully", 
        houseId: houseId, 
        bid: bidData 
    });
});


// Starta servern och lyssna på den valda porten
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});