import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Episodes from './pages/Episodes';
import Locations from './pages/Locations';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import FavouriteCharacters from './pages/FavouriteCharacters';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Episode from './pages/Episode';
import Character from './pages/Character';



export default function App() {
  useEffect(() => {
    Aos.init({
      offset: 100,
    });
  }, [])

  return (
    <div className='font-nunito'>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/characters' element={<Characters/>} />
          <Route path='/episodes' element={<Episodes/>} />
          <Route path='/locations' element={<Locations/>} />
          <Route path='/favs' element={<FavouriteCharacters/>} />
          <Route path='/episode/:episodeId' element={<Episode/>} />
          <Route path='/character/:characterId' element={<Character/>} />
      </Routes>

      <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} />

    </div>
  )
}
