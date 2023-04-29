import React from "react";
import AppContext from "../context";

const Info = ({title, image, description }) => {
    const {setCartOpened} = React.useContext(AppContext);

    return(
        <div>
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                <img className="mb-20" width={120} height={120} src={image} alt="empty cart" />
                <h2>{title}</h2>
                <p className="opacity-6">{description}</p>
                <button  onClick={() => setCartOpened(false)} className="greenButton">
                    <img src="/img/arrow.svg" alt="Arrow" /> Back to store
                </button>
            </div>
        </div>
    );
}

export default Info;