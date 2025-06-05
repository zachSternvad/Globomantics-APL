// Fil: src/components/house/index.js

import "./house.css";
import { useState } from "react";
import emailIcon from "./Email.png";
import Inquiry from "./Inquiry";
import BidForm from "./BidForm"; // <-- 1. Importera den nya komponenten

const House = ({ house }) => {
    const [inquiryShown, setInquiryShown] = useState(false);
    const [bidFormShown, setBidFormShown] = useState(false); // <-- 2. Ny state för bud-formuläret

    const inquiryClick = () => {
        setInquiryShown(!inquiryShown);
    };

    // 3. Ny funktion för att visa/dölja bud-formuläret
    const bidClick = () => {
        setBidFormShown(!bidFormShown);
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
                    <p className="price">${house.price}</p>
                    <p>{house.description}</p>
                    <img src={emailIcon} height="50" alt="inquiry" onClick={inquiryClick} />
                    {inquiryShown && <Inquiry house={house} />}
                </div>
            </div>

            {/* 4. Ny sektion för budgivning */}
            <div className="row mt-3">
                <div className="col-md-12">
                    <h4>Bids</h4>
                    <p><em>(Här kan vi senare lista alla bud)</em></p>
                    <button className="btn btn-primary" onClick={bidClick}>
                        Add Bid
                    </button>
                    {bidFormShown && <BidForm house={house} />} {/* <-- Visa formuläret villkorligt */}
                </div>
            </div>
        </div>
    );
};

export default House;