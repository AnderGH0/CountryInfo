import { FaChevronDown, FaChevronUp } from "react-icons/fa"
const DropdownButton = ({children, open, toggle}) => {


  return (
    <div className="dropdown-btn" onClick={toggle}>
        {children}
        {open ?<FaChevronUp/> : <FaChevronDown/>}
    </div>
  )
}

export default DropdownButton