import MainLayout from "./components/MainLayout"
import Hero from "./components/Hero"
import CountryPage from "./components/countryPage/CountryPage";
import GuessCountry from "./components/countryGuess/GuessCountry";
import {
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider
} from "react-router-dom";
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Hero />}/>
        <Route path="/country/:id" element={<CountryPage/>}/>
        <Route path="/guess" element={<GuessCountry/>} />
      </Route>
    ))
  return <RouterProvider router={router}/>
}

export default App
