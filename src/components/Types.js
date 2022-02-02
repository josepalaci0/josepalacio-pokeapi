import axios from "axios";
import React, { useEffect, useState } from "react";

const Types = ({ url }) => {
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        axios.get(url).then((res) => setPokemon(res.data));
    }, [url]);



    return (
        <select>
            {pokemon.types?.map(el => (<option key={el.type.url}>{el.type.name}</option>))}
        </select>



    );
};

export default Types;
