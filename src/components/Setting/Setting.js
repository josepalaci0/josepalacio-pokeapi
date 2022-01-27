import React, { useState,useEffect } from "react";

function Setting() {
  const [setting, setSetting] = useState(false);
  const [style, setStyle] = useState({});

  let close = () => {
    let element = <div></div>;
    setSetting(element);
  };

  useEffect(() => {

    const style = {
      position: "absolute",
      color: "#ffffff",
      width: "150px",
      height: "35px",
      background: `#ffffff`,
      left: "33%",
      border: "5px",
    };

    setStyle(style);    
  }, []);

  const CambioColor=(Color) =>{  
    const style = {
      position: "absolute",
      color: "#ffffff",
      width: "150px",
      height: "35px",
      background: `#000000`,
      left: "33%",
      border: "5px",
    }; 
    setStyle(style) 
    return Color=style;  }
 
  
  

  
 

  

  let sitting = () => {
    let element = (
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
                <div className="cambioBu" onClick={CambioColor}></div>               
              </div>
            </div>

            <div className="setting-color">
              <h3>items per page</h3>
              <select>
                <option> default </option>
                <option> selected 2 </option>
                <option>selected 4</option>
                <option>selected 6</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
    setSetting(element);
  };

  return (
    <div>
      <button className="setting-setting">
        <i className="fas fa-cog" onClick={sitting}></i>
      </button>
      {setting}
    </div>
  );
}

export default Setting;
