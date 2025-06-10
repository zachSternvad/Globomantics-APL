// Jag importerar SearchResultsRow eftersom den redan är perfekt för att visa en rad i en tabell.
import SearchResultsRow from "../search-results/search-results-row";

// Min nya komponent, HouseList, tar emot listan med alla hus och delete-funktionen som props.
const HouseList = ({ allHouses, deleteHouse }) => {
    return (
        <div className="mt-4">
            {/* Jag lägger till en rubrik för tabellen. */}
            <h4>Houses currently on the market:</h4>
            <table className="table table-hover">
                <tbody>
                    {/* Jag mappar igenom listan med alla hus. */}
                    {allHouses.map((h) => (
                        // För varje hus renderar jag en SearchResultsRow och skickar med husets data och delete-funktionen.
                        <SearchResultsRow key={h.id} house={h} deleteHouse={deleteHouse} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HouseList;