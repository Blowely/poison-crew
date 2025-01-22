// ItemDetails.jsx
import React from 'react';
import './ItemDetails.scss';

const ItemDetails = () => {
    return (
        <div className="item-details">
            <div className="details">
                <h2 className="title">ITEM DETAILS</h2>
                <div className="details-list">
                    <div className="detail">
                        <span className="label">Model</span>
                        <span className="value">CAMPUS 00s</span>
                    </div>
                    <div className="detail">
                        <span className="label">Upper Material</span>
                        <span className="value">Leather</span>
                    </div>
                    <div className="detail">
                        <span className="label">Closure Type</span>
                        <span className="value">Lace-Up</span>
                    </div>
                    <div className="detail">
                        <span className="label">Functionality</span>
                        <span className="value">Slip-Resistant</span>
                    </div>
                </div>
                <a href="#" className="view-more">View More</a>
            </div>
            <div className="brand">
                <img src="/path/to/adidas-logo.png" alt="Adidas Originals" className="brand-logo" />
                <div className="brand-info">
                    <span className="brand-name">Adidas Originals</span>
                    <span className="items">49K+ items</span>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;