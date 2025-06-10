// Importerar.
import { useParams } from "react-router-dom";
import House from "./";

// Tar emot deleteBid som en prop.
const HouseFromQuery = ({ allHouses, addBid, deleteBid }) => {
    const { id } = useParams();
    const house = allHouses.find((h) => h.id === parseInt(id));

    if (!house) return <div>House not found.</div>;

    // Skickar med deleteBid som en prop till House-komponenten.
    return <House house={house} addBid={addBid} deleteBid={deleteBid}></House>;
};

export default HouseFromQuery;