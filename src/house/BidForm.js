import { useState } from "react";

// Ta bara emot onBidSubmit-funktionen
const BidForm = ({ onBidSubmit }) => {
    const [bidInfo, setBidInfo] = useState({
        bidder: "",
        amount: 0,
    });

    const onChange = (e) => {
        setBidInfo({ ...bidInfo, [e.target.id]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const bid = {
            bidder: bidInfo.bidder,
            amount: parseInt(bidInfo.amount, 10)
        };
        onBidSubmit(bid); // Anropa funktionen från föräldern (House)
    };

    return (
        <form className="mt-3 p-3 border rounded" onSubmit={onSubmit}>
            {/* ... (samma formulär-JSX som förut) ... */}
            <div className="mb-3">
                <label htmlFor="bidder" className="form-label">Name</label>
                <input id="bidder" type="text" className="form-control" value={bidInfo.bidder} onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount ($)</label>
                <input id="amount" type="number" className="form-control" value={bidInfo.amount} onChange={onChange} required />
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