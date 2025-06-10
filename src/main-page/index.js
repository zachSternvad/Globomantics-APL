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
    const [allHouses, setAllHouses] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    // ... (useEffect och useMemo är samma som förut) ...
    useEffect(() => {
        const fetchHouses = async () => {
            const rsp = await fetch("http://localhost:4000/api/houses");
            const houses = await rsp.json();
            setAllHouses(houses);
        };
        fetchHouses();
    }, []);

    const featuredHouse = useMemo(() => {
        if (allHouses.length) {
            const randomIndex = Math.floor(Math.random() * allHouses.length);
            return allHouses[randomIndex];
        }
    }, [allHouses]);
    
    // addBid-funktionen är samma som förut
    const addBid = async (houseId, bid) => {
        // ... (ingen ändring här) ...
    };

    // ---- UPPDATERAD FUNKTION ----
    const handleAddHouse = async (newHouse) => {
        const response = await fetch("http://localhost:4000/api/houses", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newHouse),
        });
        const savedHouse = await response.json(); // Ta emot det sparade huset med sitt nya ID

        // Uppdatera state med det nya huset från servern
        setAllHouses([...allHouses, savedHouse]);
    };

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
                    <Route path="/searchresults/:country" element={<SearchResults allHouses={allHouses} />} />
                    <Route path="/" element={<FeaturedHouse house={featuredHouse} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;