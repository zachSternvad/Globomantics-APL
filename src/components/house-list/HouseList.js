// Importerar komponenten för en tabellrad.
import SearchResultsRow from "../search-results/search-results-row.js";

// En komponent som visar en tabell med alla hus.
const HouseList = ({ allHouses, deleteHouse }) => {
    return (
        <div className="mt-4">
            <h4>Houses currently on the market:</h4>
            <table className="table table-hover">
                <tbody>
                    {/* Mappar igenom alla hus och skapar en rad för varje. */}
                    {allHouses.map((h) => (
                        // Återanvänder SearchResultsRow för att visa varje hus.
                        <SearchResultsRow key={h.id} house={h} deleteHouse={deleteHouse} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HouseList;