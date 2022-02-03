import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import PokemonInfo from "./PokemonInfo";
import axios from "axios";

const PokemonList = (props) => {
    const [pokemon, setPokemon] = useState([]);
    const [pokemontype, setPokemontype] = useState([]);
    const [search, setSearch] = useState("");
    const [types, setTypes] = useState("");
    const [condition, setCondition] = useState(true);


    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/type/`)
            .then(res => setTypes(res.data.results.map(el =>
                (<option key={el.url} value={el.name} >{el.name}</option>))))

        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=6`).
        then(res => setPokemon(res.data.results))


    }, []);    

    const filterTypes = (name) => {
        axios.get(`https://pokeapi.co/api/v2/type/${name}`)
            .then(res => setPokemontype(res.data.pokemon));
    };

    const PokeTypesDefault = () =>{
        axios.get(`https://pokeapi.co/api/v2/type/8`)
            .then(res => setPokemontype(res.data.pokemon));
        
    }

     

    const ShowData1 = () => {
        if (!_.isEmpty(pokemon)) {
            return (
                <div className={"list-wrapper"}>
                    {pokemon.map(el => (
                        <div key={el.url} className={"pokemon-item"}>


                            <PokemonInfo url={el.url} />


                            <Link to={`/pokemon/${el.name}`}><i className="fas fa-eye"></i></Link>
                        </div>
                    )
                    )}
                </div>
            )
        }

    };

    const ShowData2 = () => {
        if (!_.isEmpty(pokemontype)) {
            return (
                <div className={"list-wrapper"}>
                    {pokemontype.map(el => (
                        <div key={el.pokemon.url} className={"pokemon-item"}>             


                            <PokemonInfo url={el.pokemon.url} />


                            <Link to={`/pokemon/${el.pokemon.name}`}><i className="fas fa-eye"></i></Link>
                        </div>
                    )
                    )}
                </div>
            )
        }

    };

    const[page,setPage] = useState(1)
    const pokemonPerPage=6;
    const lastIndex = page *pokemonPerPage;
    const paginatePokemon = 



    return (
        <div>
            <button onClick={() => setCondition(!condition)}>
                Cambiar busqueda
            </button>
            {
                condition
                ?<div className={"search-wrapper form"}>
                <p>Search: </p>
                <input type="text" onChange={e => setSearch(e.target.value)} />
                <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
            </div>
                :<div className="select">
                <h1>Types</h1>
                <select onChange={e => filterTypes(e.target.value)}>
                    {types}
                </select>
            </div>
            }
            {PokeTypesDefault()}
            {
                condition
                ?ShowData1()
                :ShowData2()
            
            }

        </div>
    )
};

export default PokemonList