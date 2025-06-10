import { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './main-page.css';
import Header from "./header.js";
import FeaturedHouse from "./featured-house.js";
import SearchResults from "../search-results/index.js";
import Housefilter from "./house-filter.js";
import HouseFromQuery from "../house/HouseFromQuery.js";
import AddHouseForm from "../add-house/AddHouseForm";

function App() {
    // Jag använder useState för att hålla reda på alla hus och om "Add"-formuläret ska visas.
    const [allHouses, setAllHouses] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    // Jag använder useEffect för att hämta all data från min backend-server när komponenten laddas för första gången.
    useEffect(() => {
        const fetchHouses = async () => {
            const rsp = await fetch("http://localhost:4000/api/houses");
            const houses = await rsp.json();
            setAllHouses(houses);
        };
        fetchHouses();
    }, []);

    // Jag använder useMemo för att slumpa fram ett "featured house" utan att behöva göra om beräkningen vid varje rendering.
    const featuredHouse = useMemo(() => {
        if (allHouses.length) {
            const randomIndex = Math.floor(Math.random() * allHouses.length);
            return allHouses[randomIndex];
        }
    }, [allHouses]);
    
    // Detta är funktionen som hanterar när ett nytt bud läggs till.
    const addBid = async (houseId, bid) => {
        const response = await fetch(`http://localhost:4000/api/houses/${houseId}/bids`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bid),
        });
        const result = await response.json();
        console.log(result.message);

        const updatedHouses = allHouses.map((h) => {
            if (h.id !== houseId) return h;
            const newBids = h.bids ? [...h.bids, bid] : [bid];
            return { ...h, bids: newBids };
        });
        setAllHouses(updatedHouses);
    };

    // Detta är funktionen som hanterar när ett nytt hus läggs till.
    const handleAddHouse = async (newHouse) => {
        const response = await fetch("http://localhost:4000/api/houses", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newHouse),
        });
        const savedHouse = await response.json();
        setAllHouses([...allHouses, savedHouse]);
    };

    // Jag skapar en ny funktion, handleDeleteHouse, som ska hantera borttagningen av ett hus.
    const handleDeleteHouse = async (houseId) => {
        // Jag använder fetch för att skicka ett DELETE-anrop till min backend.
        // Jag skickar med husets ID i URL:en så servern vet vilket hus som ska tas bort.
        const response = await fetch(`http://localhost:4000/api/houses/${houseId}`, {
            method: 'DELETE'
        });

        // Om anropet lyckades (response.ok är true), uppdaterar jag mitt lokala state 'allHouses'.
        if (response.ok) {
            // Jag använder filter för att skapa en ny lista utan det hus som har det ID jag precis tagit bort.
            // Detta gör att listan på sidan uppdateras direkt utan en omladdning.
            setAllHouses(allHouses.filter(h => h.id !== houseId));
        } else {
            // Om något går fel loggar jag ett felmeddelande.
            console.error("Failed to delete house.");
        }
    };


    // Här renderar jag hela min applikation, inklusive Router och alla Routes.
    return (
        <Router>
            <div className="container">
                <Header />
                <Housefilter allHouses={allHouses} />

                <div className="my-3 text-center">
                    <button className="btn btn-success" onClick={() => setShowAddForm(!showAddForm)}>
                        {showAddForm ? "Cancel" : "Add House"}
                    </button>
                </div>

                {showAddForm && <AddHouseForm onAddHouse={handleAddHouse} onDone={() => setShowAddForm(false)} />}
                
                <Routes>
                    <Route path="/house/:id" element={<HouseFromQuery allHouses={allHouses} addBid={addBid} />} />
                    
                    {/* Här, i min Route för sökresultaten, skickar jag med den nya handleDeleteHouse-funktionen som en prop. */}
                    <Route path="/searchresults/:country" element={<SearchResults allHouses={allHouses} deleteHouse={handleDeleteHouse} />} />
                    
                    <Route path="/" element={<FeaturedHouse house={featuredHouse} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;