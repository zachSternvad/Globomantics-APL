import { useParams } from "react-router-dom";
import House from "./";

// Ta emot addBid-funktionen som en prop
const HouseFromQuery = ({ allHouses, addBid }) => {
    const { id } = useParams();
    const house = allHouses.find((h) => h.id === parseInt(id));

    if (!house) return <div>House not found.</div>;

    // Skicka med både house-objektet och addBid-funktionen vidare
    return <House house={house} addBid={addBid}></House>;
};

export default HouseFromQuery;