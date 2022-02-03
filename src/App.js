
import React from 'react';
import { useState, useEffect } from "react";
import { Switch, Redirect, NavLink, Route } from 'react-router-dom';
import HomeDefault from './HomeDefault';
import './App.css';
import './components/Setting.css'
import Language from "./components/Setting/Languege";
import PokemonList from "./components/PokemonList";
import Pokemon from './components/Pokemon';

export default function App() {
  const [setting, setSetting] = useState(false);
  const [style, setStyle] = useState({});
    /*Setting*/
  let close = () => {
    setSetting(false);
  };
  /*Declaracion e colores de temas */
  useEffect(() => {

    const style = {
      background: `#ffffff`,
      color: '#000000',
    };
    setStyle(style);
  }, []);

  const CambioColor1 = (Color) => {
    const style = {
      background: `#000000`,
      color: '#ffffff',
    };
    setStyle(style)
    return Color = style;
  }

  const CambioColor2 = (Color) => {
    const style = {
      background: `#383F09`,
      color: '#ffffff',
    };
    setStyle(style)
    return Color = style;
  }

  const CambioColor3 = (Color) => {
    const style = {
      background: `#645143`,
      color: '#ffffff',
    };
    setStyle(style)
    return Color = style;
  }

  const CambioColor4 = (Color) => {
    const style = {
      background: `#ffffff`,
      color: '#000000',
    };
    setStyle(style)
    return Color = style;
  }
  /*Return de la aplicacion */
  return (<>
    <div className="home">
      <div className="home-setting">
        <div className="setting">
          <div>
            <button className="setting-setting">
              <i className="fas fa-cog" onClick={() => setSetting(true)}></i>
            </button>
            {setting && (
              <div className="settingOK">
                <div className="settingOK-close">
                  <i className="fas fa-times-circle" onClick={close}></i>
                </div>
                <div className="settingOK-info">
                  <div className="setting-temple">
                    <h1>Setting</h1>

                    <div className="setting-color">
                      <h3>Theme</h3>
                      <div className="button-cambio" style={style}>
                        <div className='themple1' onClick={CambioColor1}></div>
                        <div className='themple2' onClick={CambioColor2}></div>
                        <div className='themple3' onClick={CambioColor3}></div>
                        <div className='themple4' onClick={CambioColor4}></div>
                      </div>
                    </div>                    
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <br />
        <br />
        <div className="language">
          <Language />
        </div>
        <br />
        <br />
      </div>

      <div className="App" style={style}>

        <nav>
          <NavLink to={"/"}><i className="fas fa-sign-in-alt"></i></NavLink>
        </nav>

        <Switch>
          <Route path={`/`} exact component={HomeDefault} />
          <Route path={`/pokemonlist`} exact component={PokemonList} />
          <Route path={"/pokemon/:pokemon"} exact component={Pokemon} />
          <Redirect to={"/"} />
        </Switch>
      </div>
    </div>
  </>);
}

