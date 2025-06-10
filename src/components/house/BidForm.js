// Importerar useState-hooken.
import { useState } from "react";

// Detta är formuläret för att lägga ett bud.
const BidForm = ({ onBidSubmit }) => {
    // Ett state-objekt för budets information.
    const [bidInfo, setBidInfo] = useState({
        bidder: "",
        amount: 0,
    });

    // Uppdaterar state när användaren skriver.
    const onChange = (e) => {
        setBidInfo({ ...bidInfo, [e.target.id]: e.target.value });
    };

    // Körs när formuläret skickas.
    const onSubmit = (e) => {
        // Detta är den viktigaste raden. Den förhindrar att webbläsaren laddar om sidan.
        e.preventDefault();
        
        // Jag skapar ett nytt bud-objekt med datan från formuläret.
        const bid = {
            bidder: bidInfo.bidder,
            amount: parseInt(bidInfo.amount, 10)
        };
        // Jag anropar funktionen från föräldrakomponenten (House) för att hantera budet.
        onBidSubmit(bid);
    };

    // Renderar själva formuläret.
    // Jag ser till att mitt form-element har en onSubmit-prop som pekar på min funktion.
    return (
        <form className="mt-3 p-3 border rounded" onSubmit={onSubmit}>
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