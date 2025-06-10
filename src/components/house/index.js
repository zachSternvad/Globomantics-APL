// Importerar CSS, hooks och andra komponenter.
import "./house.css";
import { useState } from "react";
import emailIcon from "./Email.png";
import Inquiry from "./Inquiry";
import BidForm from "./BidForm";

// Detta är komponenten som visar detaljer för ett enskilt hus.
const House = ({ house, addBid }) => {
    // State för att visa/dölja formulären.
    const [inquiryShown, setInquiryShown] = useState(false);
    const [bidFormShown, setBidFormShown] = useState(false);
    // State för att visa ett framgångsmeddelande.
    const [successMessage, setSuccessMessage] = useState("");

    // Funktion för att visa/dölja kontaktformuläret.
    const inquiryClick = () => {
        setInquiryShown(!inquiryShown);
    };

    // Funktion som körs när ett bud skickas in.
    const handleBidSubmit = async (bid) => {
        // Anropar funktionen från App för att spara budet.
        await addBid(house.id, bid);
        // Döljer formuläret.
        setBidFormShown(false);
        // Visar ett meddelande.
        setSuccessMessage("Thanks for your bid!");
        // Tar bort meddelandet efter 3 sekunder.
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    };

    // Renderar all information om huset.
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
            {/* Sektion för budgivning. */}
            <div className="row mt-3">
                <div className="col-md-12">
                    <h4>Bids</h4>
                    {/* Visar framgångsmeddelandet om det finns. */}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    
                    {/* Visar en tabell med alla bud som lagts. */}
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
                    
                    {/* Visar bara "Add Bid"-knappen om formuläret är dolt. */}
                    {!bidFormShown && (
                        <button className="btn btn-primary" onClick={() => setBidFormShown(true)}>
                            Add Bid
                        </button>
                    )}
                    {/* Visar bud-formuläret om bidFormShown är true. */}
                    {bidFormShown && <BidForm onBidSubmit={handleBidSubmit} />}
                </div>
            </div>
        </div>
    );
};

export default House;