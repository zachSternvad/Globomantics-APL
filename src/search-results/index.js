import SearchResultsRow from "./search-results-row";
import {useParams} from "react-router-dom";

// Jag tar emot den nya deleteHouse-funktionen som en prop här.
const SearchResults = ({ allHouses, deleteHouse}) => {
    // Jag hämtar :country från URL:en för att veta hur jag ska filtrera.
    const {country} = useParams();
    // Jag filtrerar alla hus för att bara visa de som matchar landet i URL:en.
    const filteredHouses = allHouses.filter((h) => h.country === country)

    // Jag renderar en tabell med resultaten.
    return (
        <div className="mt-2">
            <h4>Results for {country}:</h4>
            <table className="table table-hover">
                <tbody>
                    {/* Jag mappar igenom mina filtrerade hus för att skapa en rad för varje. */}
                    {filteredHouses.map((h) => (
                        // För varje hus i listan skickar jag nu med deleteHouse-funktionen som en prop till SearchResultsRow-komponenten.
                        <SearchResultsRow key={h.id} house={h} deleteHouse={deleteHouse} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default SearchResults;