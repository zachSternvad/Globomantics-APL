import { useState } from "react";

// Ta emot addBid som en prop, och funktionen setBidFormShown för att kunna dölja formuläret
const BidForm = ({ house, addBid, setBidFormShown }) => {
    const [bidInfo, setBidInfo] = useState({
        bidder: "",
        amount: 0, // Använd 0 som startvärde för ett nummer
    });

    const onChange = (e) => {
        setBidInfo({ ...bidInfo, [e.target.id]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const bid = {
            bidder: bidInfo.bidder,
            amount: parseInt(bidInfo.amount, 10) // Gör om till ett tal
        };
        addBid(house.id, bid); // Anropa funktionen från App-komponenten
        setBidFormShown(false); // Dölj formuläret efter att budet är lagt
    };

    return (
        <form className="mt-3 p-3 border rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="bidder" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="bidder"
                    placeholder="Your Name"
                    value={bidInfo.bidder}
                    onChange={onChange}
                    required
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
                    required
                />
            </div>
            <button
                type="submit"
                className="btn btn-success"
                disabled={!bidInfo.bidder || !bidInfo.amount}
            >
                Submit Bid
            </button>
        </form>
    );
};

export default BidForm;