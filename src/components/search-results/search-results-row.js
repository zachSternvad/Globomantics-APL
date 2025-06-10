// Importerar CSS och useNavigate-hooken.
import "./search-results.css";
import { useNavigate } from 'react-router-dom';

// Komponent för att visa en enskild rad i en hus-tabell.
const SearchResultsRow = ({ house, deleteHouse }) => {
    // Funktion för att navigera till detaljsidan.
    const navigate = useNavigate();
    const setActive = () => { navigate(`/house/${house.id}`); };

    // Funktion som körs när man klickar på delete-knappen.
    const handleDeleteClick = (e) => {
        // Hindrar att klicket även navigerar till detaljsidan.
        e.stopPropagation();
        // En extra säkerhetsfråga innan borttagning.
        if (window.confirm("Are you sure you want to delete this house?")) {
            // Anropar funktionen som skickades från App-komponenten.
            deleteHouse(house.id);
        }
    };

    // Renderar en tabellrad som är klickbar.
    return (
        <tr onClick={setActive}>
            <td>{house.address}</td>
            <td>${house.price.toLocaleString()}</td>
            <td>
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