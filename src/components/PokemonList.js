import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import PokemonInfo from "./PokemonInfo";
import axios from "axios";


const PokemonList = (props) => {
    /*Declaracion de estados */
    const [pokemon, setPokemon] = useState([]);
    const [pokemontype, setPokemontype] = useState([]);
    const [search, setSearch] = useState("");
    const [types, setTypes] = useState("");
    const [condition, setCondition] = useState(true);    
    let [pageoffset, setPageoffset] = useState(0)
    const [pagelimit, setPagelimit] = useState(6)

    /*Declaracion de Estados Effcts */
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/type/`)
            .then(res => setTypes(res.data.results.map(el =>
                (<option key={el.url} value={el.name} >{el.name}</option>))))

        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118`).
            then(res => setPokemon(res.data.results))
    }, []);

    useEffect(() => {
        const defaulttypes = (id = 1) => {
            axios.get(`https://pokeapi.co/api/v2/type/${id}`)
                .then(res => setPokemontype(res.data.pokemon));

        }
        defaulttypes()
    }, []);
    /*Declaracion de Funcion filter Types */
    const filterTypes = (name) => {
        axios.get(`https://pokeapi.co/api/v2/type/${name}`)
            .then(res => setPokemontype(res.data.pokemon));
    };
    /*Declaracion de Funcion paginate */
    const pagelimi = () => {
        setPagelimit(pagelimit + 6)
        setPageoffset(pageoffset = pagelimit - 6 + 6)
    }




    /*Declaracion de filtrados de array o nuevos arrays */
    let subarry1 = pokemon.slice(pageoffset, pagelimit)
    let subarry2 = pokemontype.slice(pageoffset, pagelimit)
    /*Declaracion de Funcion de todos los Pokemones */
    const ShowData1 = () => {
        if (!_.isEmpty(subarry1)) {
            return (
                <div className={"list-wrapper"}>
                    {subarry1.map(el => (
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
    /*Declaracion de pokemones por types */
    const ShowData2 = () => {

        if (!_.isEmpty(subarry2)) {
            return (
                <div className={"list-wrapper"}>
                    {subarry2.map(el => (
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
    /*Retorno de La aplicacion */
    return (
        <div>         

            <button className="reders" onClick={() => setCondition(!condition)}>
                <i className="fas fa-sync-alt"></i>
            </button>
            {
                condition
                    ? <div className={"search-wrapper form"}>
                        <p>Search: </p>
                        <input type="text" onChange={e => setSearch(e.target.value)} />
                        <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
                    </div>
                    : <div className="select">
                        <h1>Types</h1>
                        <select onChange={e => filterTypes(e.target.value)}>
                            {types}
                        </select>
                    </div>
            }

            {
                condition
                    ? ShowData1()
                    : ShowData2()

            }

            <div className="paginate">
                <button><i className="fas fa-angle-double-left"></i></button><button>{pageoffset}</button><button>{pagelimit}</button><button onClick={pagelimi}><i className="fas fa-angle-double-right"></i></button>
            </div>

        </div>
    )
};

export default PokemonList








