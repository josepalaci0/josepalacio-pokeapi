import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../actions/pokemonActions";
import Progreso from './design/Progreso';



import _ from "lodash";

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon;
    const dispatch = useDispatch();
    const pokemonState = useSelector(state => state.Pokemon);
    React.useEffect(() => {
        dispatch(GetPokemon(pokemonName))
    }, []);

    const ShowData = () => {
        if (!_.isEmpty(pokemonState.data[pokemonName])) {
            const pokeData = pokemonState.data[pokemonName];  
        
                     
            return (<>
                <div className="container-pokemon">
                    <div className="detail-pokemon">
                         <div className="img-primary">
                             <img src={pokeData.sprites.front_default} alt="" />
                         </div>

                        <div className={"pokemon-wrapper grid"}>
                            <div className="item">
                                <h1>Sprites</h1>
                                <img src={pokeData.sprites.front_default} alt="" />
                                <img src={pokeData.sprites.back_default} alt="" />
                                <img src={pokeData.sprites.front_shiny} alt="" />
                                <img src={pokeData.sprites.back_shiny} alt="" />
                            </div>
                        </div>
                        <br />

                        <div className="grid">

                        <div className="flexbox-container">
                                <div className="item ">
                                    <h1>Order</h1>
                                    <h1>{pokeData.order}</h1>
                                </div>

                                <div className="item ">
                                    <h1>weight</h1>
                                    <h1>{pokeData.weight}</h1>
                                </div>
                            </div>
                            <br/>



                            <div className="flexbox-container">
                                <div className="item ">
                                    <h1>types</h1>
                                    {pokeData.types.map(el => {
                                        return <p key={el.type.url}>{el.type.name}</p>
                                    })}
                                </div>

                                <div className="item ">
                                    <h1>Abilities</h1>
                                    {pokeData.abilities.map(el => {
                                        return <p key={el.ability.url}>{el.ability.name}</p>
                                    })}
                                </div>
                            </div>

                            <div className="itemstats ">

                                <h1>Stats</h1>
                                {pokeData.stats.map(el => {
                                    return <div key={el.stat.url}> <Progreso  stat={el.base_stat} statName={el.stat.name} /></div>
                                })}
                            </div>
                            <br />



                            <div className="pokemon-wrapper grid ">
                            <h1>game_indices</h1> 
                            <div className="game-box">
                                                           
                                {pokeData.game_indices.map(el => {
                                        return <div key={el.version.url}> 
                                        <div className="game">                                        
                                        <h4>{el.version.name} : {el.game_index}</h4>                                        
                                        </div>
                                        </div>
                                    })}                               
                            </div>
                        </div>
                        <br />


                        </div>
                    </div>
                    <div className="moves">
                        <h1>Moves</h1>
                        {pokeData.moves.map(el => {
                            return <div key={el.move.url}>
                            <p>{el.move.name}</p>
                            <hr/>
                            </div> 

                        })}
                    </div>
                    <hr/>
                </div>
            </>

            )
        }

        if (pokemonState.loading) {
            return <p>Loading...</p>
        }

        if (pokemonState.errorMsg !== "") {
            return <p>{pokemonState.errorMsg}</p>
        }

        return <p>error getting pokemon</p>
    }

    return (
        <div className={"poke"}>
            <h1>{pokemonName}</h1>
            {ShowData()}
        </div>
    )
};

export default Pokemon