import axios from "axios";
import React, { useEffect, useState } from "react";

const PokemonInfo = ({ url }) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios.get(url).then((res) => setPokemon(res.data));
  }, [url]);

  

  return (
    <div className="column">
      <div className="card">
        <strong>{pokemon.name}</strong>
        <img src={pokemon.sprites?.other.dream_world.front_default} alt="" />
        <div className="attribute">
          <b>weight:</b> {pokemon.weight}
        </div>
        <div className="attribute">
          <b>height:</b> {pokemon.height}
        </div>
      </div>
    </div>
  );
};

export default PokemonInfo;
