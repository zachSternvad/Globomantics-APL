// Jag importerar nu min nya HouseList-komponent.
// Jag har tagit bort importen för useMemo och FeaturedHouse eftersom de inte längre behövs.
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './main-page.css';
import Header from "./header.js";
import SearchResults from "../search-results/index.js";
import Housefilter from "./house-filter.js";
import HouseFromQuery from "../house/HouseFromQuery.js";
import AddHouseForm from "../add-house/AddHouseForm";
import HouseList from "../components/house-list/HouseList";

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
    
    // Jag har tagit bort useMemo-hooken och featuredHouse-variabeln härifrån eftersom de inte längre används.

    const addBid = async (houseId, bid) => {
        const response = await fetch(`http://localhost:4000/api/houses/${houseId}/bids`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
                    {/* Jag ändrar här så att startsidan (path="/") nu renderar min nya HouseList-komponent. */}
                    {/* Jag skickar med allHouses och handleDeleteHouse så att listan och delete-knapparna fungerar. */}
                    <Route path="/" element={<HouseList allHouses={allHouses} deleteHouse={handleDeleteHouse} />} />

                    <Route path="/house/:id" element={<HouseFromQuery allHouses={allHouses} addBid={addBid} />} />
                    <Route path="/searchresults/:country" element={<SearchResults allHouses={allHouses} deleteHouse={handleDeleteHouse} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
