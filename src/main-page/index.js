import { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './main-page.css';
import Header from "./header.js";
import FeaturedHouse from "./featured-house.js";
import SearchResults from "../search-results/index.js";
import Housefilter from "./house-filter.js";
import HouseFromQuery from "../house/HouseFromQuery.js";

function App() {
    const [allHouses, setAllHouses] = useState([]);

    useEffect(() => {
        const fetchHouses = async () => {
            const rsp = await fetch("/houses.json");
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

    // NY FUNKTION för att hantera bud
    const addBid = (houseId, bid) => {
        const updatedHouses = allHouses.map((h) => {
            if (h.id !== houseId) return h; // Om det inte är rätt hus, returnera det oförändrat

            // Om det är rätt hus, lägg till det nya budet
            const newBids = h.bids ? [...h.bids, bid] : [bid];
            return { ...h, bids: newBids };
        });
        setAllHouses(updatedHouses); // Uppdatera state med den nya listan
    };

    return (
        <Router>
            <div className="container">
                <Header />
                <Housefilter allHouses={allHouses} />
                <Routes>
                    {/* Skicka med addBid-funktionen som en prop här */}
                    <Route path="/house/:id" element={<HouseFromQuery allHouses={allHouses} addBid={addBid} />} />
                    <Route path="/searchresults/:country" element={<SearchResults allHouses={allHouses} />} />
                    <Route path="/" element={<FeaturedHouse house={featuredHouse} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;