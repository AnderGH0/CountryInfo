import {Link} from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6";

const BackButton = () => {
  return (
    <span className="button-back"><Link to="/"><button className="back"><FaArrowLeftLong /><span>Back</span></button></Link></span>
  )
}

export default BackButton