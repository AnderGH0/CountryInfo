import { useState } from "react"

const SearchBar = ({searchvalue}) => {
  const [search, setSearch] = useState("")

  const handleChange = (e) => {
    setSearch(e.target.value)
    return searchvalue(search)
  }

  return (
    <div className="container search-container">
      <form action="" className="search-form">
        <button>Icon</button>
        <input value={search} onChange={(e) => handleChange(e)} className="search-input" type="text" placeholder="Search for a country..."/>
      </form>
    </div>
  )
}

export default SearchBar