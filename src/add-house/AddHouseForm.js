import { useState } from "react";

// Ta emot funktioner för att hantera submit och för att stänga formuläret
const AddHouseForm = ({ onAddHouse, onDone }) => {
    const [houseInfo, setHouseInfo] = useState({
        address: "",
        country: "",
        description: "",
        price: 0,
        photo: "",
    });

    const onChange = (e) => {
        setHouseInfo({ ...houseInfo, [e.target.id]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // Generera ett slumpmässigt foto-ID, då vi inte laddar upp bilder
        const newHouse = {
            ...houseInfo,
            price: parseInt(houseInfo.price, 10),
            photo: Math.floor(100000 + Math.random() * 900000).toString()
        };
        onAddHouse(newHouse); // Anropa funktionen från App-komponenten
        onDone(); // Anropa funktionen för att stänga formuläret
    };

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