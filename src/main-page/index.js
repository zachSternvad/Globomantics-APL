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
    const [allHouses, setAllHouses] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchHouses = async () => {
            const rsp = await fetch("http://localhost:4000/api/houses");
            const houses = await rsp.json();
            setAllHouses(houses);
        };
        fetchHouses();
    }, []);
    
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

    const handleAddHouse = async (newHouse) => {
        const response = await fetch("http://localhost:4000/api/houses", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newHouse),
        });
        const savedHouse = await response.json();
        setAllHouses([...allHouses, savedHouse]);
    };

    const handleDeleteHouse = async (houseId) => {
        const response = await fetch(`http://localhost:4000/api/houses/${houseId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            setAllHouses(allHouses.filter(h => h.id !== houseId));
        } else {
            console.error("Failed to delete house.");
        }
    };

    // Ny funktion för att ta bort ett specifikt bud.
    const handleDeleteBid = async (houseId, bidIndex) => {
        // Skickar ett DELETE-anrop till den nya endpointen.
        const response = await fetch(`http://localhost:4000/api/houses/${houseId}/bids/${bidIndex}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Om det lyckas, uppdatera state lokalt för en snabb UI-ändring.
            const updatedHouses = allHouses.map((h) => {
                if (h.id === houseId) {
                    // Skapar en ny lista med bud utan det borttagna budet.
                    const newBids = h.bids.filter((bid, index) => index !== bidIndex);
                    return { ...h, bids: newBids };
                }
                return h;
            });
            setAllHouses(updatedHouses);
        } else {
            console.error("Failed to delete bid.");
        }
    };

    // Renderar appen.
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
                    <Route path="/" element={<HouseList allHouses={allHouses} deleteHouse={handleDeleteHouse} />} />
                    {/* Jag skickar med den nya delete-bid-funktionen som en prop. */}
                    <Route path="/house/:id" element={<HouseFromQuery allHouses={allHouses} addBid={addBid} deleteBid={handleDeleteBid} />} />
                    <Route path="/searchresults/:country" element={<SearchResults allHouses={allHouses} deleteHouse={handleDeleteHouse} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;