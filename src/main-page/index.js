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
            // ---- ÄNDRING HÄR ----
            // Hämta data från din nya server istället för den lokala filen
            const rsp = await fetch("http://localhost:4000/api/houses");
            // --------------------

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

    const addBid = (houseId, bid) => {
        const updatedHouses = allHouses.map((h) => {
            if (h.id !== houseId) return h;
            const newBids = h.bids ? [...h.bids, bid] : [bid];
            return { ...h, bids: newBids };
        });
        setAllHouses(updatedHouses);
    };

    return (
        <Router>
            <div className="container">
                <Header />
                <Housefilter allHouses={allHouses} />
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