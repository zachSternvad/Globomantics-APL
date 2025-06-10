// Importerar useParams från react-router-dom och House-komponenten.
import { useParams } from "react-router-dom";
import House from "./";

// Denna komponent hämtar id från URL:en och hittar rätt hus i listan.
const HouseFromQuery = ({ allHouses, addBid }) => {
    const { id } = useParams();
    const house = allHouses.find((h) => h.id === parseInt(id));

    if (!house) return <div>House not found.</div>;

    // Skickar sedan vidare huset till House-komponenten för att den ska visas.
    return <House house={house} addBid={addBid}></House>;
};

export default HouseFromQuery;