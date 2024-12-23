import Dropdown from "./hero/dropdown/Dropdown";
import Countries from "./hero/Countries"
import DropdownItem from "./hero/dropdown/DropdownItem";
import { useState } from "react"
import { FaSearch } from "react-icons/fa";
const Hero = () => {
  const [search, setSearch] = useState("")
  const [filterByContinent, setFilterByContinent] = useState(null)
  const continents = ["All", "Africa","America","Asia","Europe","Oceania"];
  
  return (
    <div className="hero" >
      <div className="container search-container">
        <form action="" className="search-form">
          <FaSearch/>
          <input value={search} onChange={e => setSearch(e.target.value.toLowerCase())} className="search-input" type="text" placeholder="Search for a country..."/>
        </form>
      </div>
        <Dropdown buttonText="Filter by Region" content={<>
            {continents.map(continent => (
              <DropdownItem key={continent} onClick={() => setFilterByContinent(continent)}>{continent}</DropdownItem>
            ))}
          </>}/>
        <Countries searchValue= {search} filterByContinent={filterByContinent}/>
    </div>
  )
}

export default Hero
