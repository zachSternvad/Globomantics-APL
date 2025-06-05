// Fil: src/components/house/BidForm.js

import { useState } from "react";

const BidForm = ({ house }) => {
    const [bidInfo, setBidInfo] = useState({
        bidder: "",
        amount: "",
    });

    const onChange = (e) => {
        setBidInfo({ ...bidInfo, [e.target.id]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(`Bid submitted for house ${house.id}:`, bidInfo);
        // Här kan du senare lägga till logik för att spara budet
        alert("Thanks for your bid!"); // Enkel feedback till användaren
    };

    return (
        <form className="mt-3 p-3 border rounded">
            <div className="mb-3">
                <label htmlFor="bidder" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="bidder"
                    placeholder="Your Name"
                    value={bidInfo.bidder}
                    onChange={onChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount ($)</label>
                <input
                    type="number"
                    className="form-control"
                    id="amount"
                    placeholder="Your Bid Amount"
                    value={bidInfo.amount}
                    onChange={onChange}
                />
            </div>
            <button
                type="submit"
                className="btn btn-success"
                disabled={!bidInfo.bidder || !bidInfo.amount}
                onClick={onSubmit}
            >
                Submit Bid
            </button>
        </form>
    );
};

export default BidForm;