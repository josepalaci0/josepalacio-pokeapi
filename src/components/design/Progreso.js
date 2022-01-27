import React from "react";
import './Progreso.css';



const Progreso = ({ stat, statName }) => {
    const style = {
        width: `${stat}%`,

    };



    return (<>

        <div className="skills__center">
            <div className="skills__box">
                <h4>{`${statName}`}</h4>
                <div className="skills__ilt">
                    <div className="skills__bar" style={style}></div><span>{`${stat}%`}</span>
                </div>
            </div>
        </div>

    </>

    );
};

export default Progreso;
