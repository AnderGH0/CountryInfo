import { BiAdjust } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [lightMode, setLightMode] = useState(false)
  
  const changeMode = () => {
    lightMode ? setLightMode(false): setLightMode(true);
    document.body.classList.toggle("light");
    document.querySelector(".mode-name").textContent = 
    document.body.classList.contains("light")? "Dark Mode": "Light Mode";
    
  }

  return (
    <div className="header" >
      <div className="container header-container">
        <Link to="/"><div className="header-title">Where in the world?</div></Link>
        <Link to="/guess"><div className="header-title">Guess country!</div></Link>
        <div onClick={changeMode} className="header-mode">
        <BiAdjust />
          <span className="mode-name">Light Mode</span>
        </div>
      </div>
    </div>
  )
}




export default Header