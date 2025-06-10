// Importerar useState-hooken.
import { useState } from "react";

// Detta är formuläret för att lägga till ett nytt hus.
const AddHouseForm = ({ onAddHouse, onDone }) => {
    // Ett state-objekt för att hålla all information från formuläret.
    const [houseInfo, setHouseInfo] = useState({
        address: "",
        country: "",
        description: "",
        price: 0,
        photo: "",
    });

    // En funktion som uppdaterar state när användaren skriver i ett fält.
    const onChange = (e) => {
        setHouseInfo({ ...houseInfo, [e.target.id]: e.target.value });
    };

    // Funktion som körs när formuläret skickas.
    const onSubmit = (e) => {
        // Förhindrar att sidan laddas om.
        e.preventDefault();
        // Skapar ett nytt hus-objekt och lägger till ett slumpmässigt foto-ID.
        const newHouse = {
            ...houseInfo,
            price: parseInt(houseInfo.price, 10),
            photo: Math.floor(100000 + Math.random() * 900000).toString()
        };
        // Anropar funktionen från App-komponenten för att spara huset.
        onAddHouse(newHouse);
        // Anropar funktionen från App för att stänga formuläret.
        onDone();
    };

    // Renderar själva formuläret.
    return (
        <div className="p-4 border rounded shadow-sm mt-4">
            <h4>Add New House</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input id="address" type="text" className="form-control" value={houseInfo.address} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input id="country" type="text" className="form-control" value={houseInfo.country} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price ($)</label>
                    <input id="price" type="number" className="form-control" value={houseInfo.price} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" className="form-control" value={houseInfo.description} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn-primary me-2">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={onDone}>Cancel</button>
            </form>
        </div>
    );
};

export default AddHouseForm;