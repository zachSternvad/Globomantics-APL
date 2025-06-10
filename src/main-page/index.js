// Importerar React-funktioner och alla komponenter som behövs.
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './main-page.css';
import Header from "./header.js";
import SearchResults from "../components/search-results/index.js";
import Housefilter from "./house-filter.js";
import HouseFromQuery from "../components/house/HouseFromQuery.js";
import AddHouseForm from "../components/add-house/AddHouseForm";
import HouseList from "../components/house-list/HouseList";

// Detta är min huvudkomponent för hela appen.
function App() {
    // State för att hålla listan med alla hus.
    const [allHouses, setAllHouses] = useState([]);
    // State för att visa eller dölja formuläret för att lägga till hus.
    const [showAddForm, setShowAddForm] = useState(false);

    // useEffect körs en gång när appen startar för att hämta all husdata från min backend.
    useEffect(() => {
        const fetchHouses = async () => {
            const rsp = await fetch("http://localhost:4000/api/houses");
            const houses = await rsp.json();
            setAllHouses(houses);
        };
        fetchHouses();
    }, []);
    
    // Funktion för att hantera när ett nytt bud läggs till.
    const addBid = async (houseId, bid) => {
        await fetch(`http://localhost:4000/api/houses/${houseId}/bids`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bid),
        });
        const updatedHouses = allHouses.map((h) => {
            if (h.id !== houseId) return h;
            const newBids = h.bids ? [...h.bids, bid] : [bid];
            return { ...h, bids: newBids };
        });
        setAllHouses(updatedHouses);
    };

    // Funktion för att hantera när ett nytt hus läggs till.
    const handleAddHouse = async (newHouse) => {
        const response = await fetch("http://localhost:4000/api/houses", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newHouse),
        });
        const savedHouse = await response.json();
        // Uppdaterar listan med hus lokalt så att den syns direkt.
        setAllHouses([...allHouses, savedHouse]);
    };

    // Funktion för att hantera när ett hus ska tas bort.
    const handleDeleteHouse = async (houseId) => {
        const response = await fetch(`http://localhost:4000/api/houses/${houseId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            // Uppdaterar listan lokalt så huset försvinner från sidan.
            setAllHouses(allHouses.filter(h => h.id !== houseId));
        } else {
            console.error("Failed to delete house.");
        }
    };

    // Här renderas hela appen, med Header, filter och knappar.
    // Inuti <Routes> definieras vilken komponent som ska visas för varje URL.
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
                    {/* Startsidan visar nu en lista med alla hus. */}
                    <Route path="/" element={<HouseList allHouses={allHouses} deleteHouse={handleDeleteHouse} />} />
                    {/* Visar ett specifikt hus baserat på ID. */}
                    <Route path="/house/:id" element={<HouseFromQuery allHouses={allHouses} addBid={addBid} />} />
                    {/* Visar en lista med hus filtrerat på land. */}
                    <Route path="/searchresults/:country" element={<SearchResults allHouses={allHouses} deleteHouse={handleDeleteHouse} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;