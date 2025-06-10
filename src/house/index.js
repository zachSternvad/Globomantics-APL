import "./house.css";
import { useState } from "react";
import emailIcon from "./Email.png";
import Inquiry from "./Inquiry";
import BidForm from "./BidForm";

// Ta emot addBid-funktionen från föräldern
const House = ({ house, addBid }) => {
    const [inquiryShown, setInquiryShown] = useState(false);
    const [bidFormShown, setBidFormShown] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); // <-- Ny state för meddelandet

    const inquiryClick = () => {
        setInquiryShown(!inquiryShown);
    };

    // Ny funktion som hanterar hela bud-processen
    const handleBidSubmit = async (bid) => {
        await addBid(house.id, bid); // Anropa funktionen som pratar med backend
        setBidFormShown(false); // Dölj formuläret
        setSuccessMessage("Thanks for your bid!"); // Visa framgångsmeddelande
        
        // Dölj meddelandet igen efter 3 sekunder
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    };

    return (
        <div>
            <div className="row mt-2">
                <h5 className="col-md-12">{house.country}</h5>
            </div>
            <div className="row">
                <h3 className="col-md-12">{house.address}</h3>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <img src={`/images/${house.photo}.jpeg`} alt="House" />
                </div>
                <div className="col-md-5">
                    <p className="price">${house.price.toLocaleString()}</p>
                    <p>{house.description}</p>
                    <img src={emailIcon} height="50" alt="inquiry" onClick={inquiryClick} />
                    {inquiryShown && <Inquiry house={house} />}
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-12">
                    <h4>Bids</h4>
                    {/* Visa framgångsmeddelandet om det finns */}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    
                    {house.bids && house.bids.length > 0 ? (
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Bidder</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {house.bids.map((b, index) => (
                                    <tr key={index}>
                                        <td>{b.bidder}</td>
                                        <td>${b.amount.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No bids yet.</p>
                    )}

                    {!bidFormShown && (
                        <button className="btn btn-primary" onClick={() => setBidFormShown(true)}>
                            Add Bid
                        </button>
                    )}
                    {bidFormShown && <BidForm onBidSubmit={handleBidSubmit} />}
                </div>
            </div>
        </div>
    );
};

export default House;