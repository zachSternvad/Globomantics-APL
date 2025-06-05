import "./house.css";
import { useState } from "react";
import emailIcon from "./Email.png";
import Inquiry from "./Inquiry";
import BidForm from "./BidForm";

// Ta emot addBid-funktionen
const House = ({ house, addBid }) => {
    const [inquiryShown, setInquiryShown] = useState(false);
    const [bidFormShown, setBidFormShown] = useState(false);

    const inquiryClick = () => {
        setInquiryShown(!inquiryShown);
    };

    const bidClick = () => {
        setBidFormShown(!bidFormShown);
    };

    return (
        <div>
            {/* ... (samma kod som förut för land, adress, bild, pris etc.) ... */}
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

            {/* Uppdaterad sektion för budgivning */}
            <div className="row mt-3">
                <div className="col-md-12">
                    <h4>Bids</h4>
                    {/* NY KOD: Visa listan med bud */}
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

                    <button className="btn btn-primary" onClick={bidClick}>
                        {bidFormShown ? "Cancel" : "Add Bid"}
                    </button>
                    {/* Skicka med funktionerna till BidForm */}
                    {bidFormShown && <BidForm house={house} addBid={addBid} setBidFormShown={setBidFormShown} />}
                </div>
            </div>
        </div>
    );
};

export default House;