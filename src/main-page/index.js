import { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './main-page.css';
import Header from "./header.js";
import FeaturedHouse from "./featured-house.js";
import SearchResults from "../search-results/index.js";
import Housefilter from "./house-filter.js";
import HouseFromQuery from "../house/HouseFromQuery.js";
import AddHouseForm from "../add-house/AddHouseForm"; // <-- 1. Importera det nya formuläret

function App() {
    const [allHouses, setAllHouses] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false); // <-- 2. Ny state för att visa/dölja formuläret

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

    // 3. NY FUNKTION för att hantera tillägg av hus
    const handleAddHouse = (newHouse) => {
        // För nu, lägg bara till det i det lokala state:t.
        // Senare kopplar vi detta till backend.
        setAllHouses([...allHouses, { ...newHouse, id: allHouses.length + 1 + Math.random() }]);
        console.log("Nytt hus tillagt (lokalt):", newHouse);
    };


    return (
        <Router>
            <div className="container">
                <Header />
                <Housefilter allHouses={allHouses} />

                {/* 4. Knapp för att visa formuläret */}
                <div className="my-3 text-center">
                    <button className="btn btn-success" onClick={() => setShowAddForm(!showAddForm)}>
                        {showAddForm ? "Cancel" : "Add House"}
                    </button>
                </div>

                {/* 5. Visa formuläret villkorligt */}
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