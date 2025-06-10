// Importerar rad-komponenten och useParams-hooken.
import SearchResultsRow from "./search-results-row";
import { useParams } from "react-router-dom";

// Komponent för att visa sökresultat.
const SearchResults = ({ allHouses, deleteHouse }) => {
    // Hämtar landet från URL:en.
    const { country } = useParams();
    // Filtrerar alla hus för att bara visa de som matchar landet.
    const filteredHouses = allHouses.filter((h) => h.country === country)

    // Renderar en tabell med de filtrerade husen.
    return (
        <div className="mt-2">
            <h4>Results for {country}:</h4>
            <table className="table table-hover">
                <tbody>
                    {filteredHouses.map((h) => (
                        <SearchResultsRow key={h.id} house={h} deleteHouse={deleteHouse} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default SearchResults;