import React from "react";
import { Route, Link} from "react-router-dom";
import './components/Setting.css'
import './App.css';
import PokemonList from './components/PokemonList'

;





const Home = () => {

  

  return (
    <>
    
      <div className="home">       

        <div className="App">

          <div className="home-presentation">
            <div className="form">
              <h1>Search</h1>

              <form>
                <input type="text" />
                <button><Link to="/pokemonlist"><i className="fas fa-search"></i></Link></button>
              </form>


            </div>
            <div className="home-form">
              <div className="home-info">
                <h1>Api Pokemones Trabajo de programacion y diseño</h1>
                <p>Jose Gregorio y compañera</p>
              </div>

              <div className="home-img">
                <img src="https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-0.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

        
      <Route path="/pokemonlist" component={<PokemonList/>}/>
    
    </>
  );
}

export default Home;