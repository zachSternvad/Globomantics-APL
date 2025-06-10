// Importerar.
import "./house.css";
import { useState } from "react";
import emailIcon from "./Email.png";
import Inquiry from "./Inquiry";
import BidForm from "./BidForm";

// Tar emot deleteBid som en prop.
const House = ({ house, addBid, deleteBid }) => {
    const [inquiryShown, setInquiryShown] = useState(false);
    const [bidFormShown, setBidFormShown] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const inquiryClick = () => {
        setInquiryShown(!inquiryShown);
    };

    const handleBidSubmit = async (bid) => {
        await addBid(house.id, bid);
        setBidFormShown(false);
        setSuccessMessage("Thanks for your bid!");
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    };
    
    // En ny funktion som körs när man klickar på delete-knappen för ett bud.
    const onDeleteBidClick = (index) => {
        // En säkerhetsfråga.
        if (window.confirm("Are you sure you want to delete this bid?")) {
            // Anropar funktionen från App-komponenten.
            deleteBid(house.id, index);
        }
    };

    // Renderar komponenten.
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
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    
                    {house.bids && house.bids.length > 0 ? (
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Bidder</th>
                                    <th>Amount</th>
                                    {/* En ny kolumn för actions. */}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* När jag mappar över buden får jag både budet (b) och dess index. */}
                                {house.bids.map((b, index) => (
                                    <tr key={index}>
                                        <td>{b.bidder}</td>
                                        <td>${b.amount.toLocaleString()}</td>
                                        {/* En ny tabellcell med delete-knappen. */}
                                        <td>
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => onDeleteBidClick(index)}
                                            >
                                                Delete
                                            </button>
                                        </td>
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