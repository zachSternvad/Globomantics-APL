import "./search-results.css";
import { useNavigate } from 'react-router-dom';

// Jag tar emot deleteHouse-funktionen som en prop från min förälder, SearchResults.
const SearchResultsRow = ({house, deleteHouse}) => {
    // Jag förbereder navigate-funktionen.
    const navigate = useNavigate();
    // Denna funktion navigerar till detaljsidan när man klickar på en rad.
    const setActive = () => {navigate(`/house/${house.id}`);};

    // Jag skapar en funktion som körs när man klickar på delete-knappen.
    const handleDeleteClick = (e) => {
        // e.stopPropagation() är viktigt här, den förhindrar att hela radens onClick-händelse (som navigerar till detaljsidan) också körs.
        e.stopPropagation(); 
        // Jag lägger till en bekräftelsedialog för att förhindra att användaren tar bort ett hus av misstag.
        if (window.confirm("Are you sure you want to delete this house?")) {
            // Om användaren klickar OK, anropar jag deleteHouse-funktionen (som jag fått via props) och skickar med detta husets ID.
            deleteHouse(house.id);
        }
    };

    // Jag renderar en tabellrad.
    return (
        // Hela raden är klickbar och navigerar till detaljsidan.
        <tr onClick={setActive}>
            <td>{house.address}</td>
            <td>${house.price.toLocaleString()}</td>
            {/* Här lägger jag till en ny tabellcell för min delete-knapp. */}
            <td>
                {/* Knappen får en onClick-händelse som anropar min handleDeleteClick-funktion. */}
                <button 
                    className="btn btn-danger btn-sm"
                    onClick={handleDeleteClick}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};
export default SearchResultsRow;