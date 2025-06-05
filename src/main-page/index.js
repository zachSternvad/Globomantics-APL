import {useEffect, useState, useMemo} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './main-page.css';
import Header from "./header.js";
import FeaturedHouse from "./featured-house.js";
import SearchResults from "../search-results/index.js";
import Housefilter from "./house-filter.js";
import HouseFromQuery from "../house/HouseFromQuery.js";
function App() {
  //load data
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
  }, [allHouses])
  
  return (
    <Router>
       <div className="container">
        <Header  />
        <Housefilter allHouses={allHouses} />
      <Routes>
        <Route path="/house/:id" element={<HouseFromQuery allHouses={allHouses} />} />
        <Route path="/searchresults/:country" element={<SearchResults allHouses={allHouses} />} />
        <Route path="/" element={<FeaturedHouse house={featuredHouse} />} />
          {/* <FeaturedHouse house={featuredHouse}></FeaturedHouse> */}
      </Routes>
    </div>
    </Router>
  );
}

export default App;
