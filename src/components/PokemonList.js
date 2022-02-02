import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _, { divide, set } from "lodash";
import { GetPokemonList, GetPokemonType } from "../actions/pokemonActions";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import PokemonInfo from "./PokemonInfo";
import axios from "axios";




const PokemonList = (props) => {
    const [pokemon, setPokemon] = useState([]);
    const [search, setSearch] = useState("");
    const [types, setTypes] = useState("");
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.PokemonList);
    const pokeData = pokemonList.data
    React.useEffect(() => {
       
        FetchData(1)
        axios.get(`https://pokeapi.co/api/v2/type/`)
            .then(res => setTypes(res.data.results.map(el =>
                (<option value={el.name} key={el.url}>{el.name}</option>))))
    }, []);


    const FetchData = (page = 1) => {
        dispatch(GetPokemonList(page))
    }
   
    console.log(pokeData)
  
   

    const ShowData = () => {
        if (pokemonList.loading) {
            return <p>Loading...</p>
        }



        if (!_.isEmpty(pokeData)) {
            return (
                <div className={"list-wrapper"}>
                    {pokeData.map(el => (
                        <div key={el.url} className={"pokemon-item"}>


                            <PokemonInfo url={el.url} />


                            <Link to={`/pokemon/${el.name}`}><i className="fas fa-eye"></i></Link>
                        </div>
                    )
                    )}
                </div>
            )
        }





        if (pokemonList.errorMsg !== "") {
            return <p>{pokemonList.errorMsg}</p>
        }



        return <p>unable to get data</p>
    };

    const filterTypes = (name) => {
        console.log('hola', name)

        axios.get(`https://pokeapi.co/api/v2/type/${name}`)
            .then(res => setPokemon(res.data.pokemon))
    };
    console.log(pokemon)







    return (
        <div>

            <div className={"search-wrapper form"}>
                <p>Search: </p>
                <input type="text" onChange={e => setSearch(e.target.value)} />
                <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
            </div>
            <div className="select">
                <h1>Types</h1>
                <select onChange={e => filterTypes(e.target.value)}>
                    {types}
                </select>

            </div>
            {ShowData()}

            {!_.isEmpty(pokemonList.data) && (
                <ReactPaginate
                    pageCount={Math.ceil(pokemonList.count / 15)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    onPageChange={(data) => FetchData(data.selected + 1)}
                    containerClassName={"pagination"}
                />
            )}
        </div>
    )
};

export default PokemonList