import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites, toggleFavorite } from '../redux/characterSlice';
import { FaTrash } from 'react-icons/fa';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import CharacterCart from '../components/CharacterCart';
import LoadingSpinner from '../components/LoadingSpinner';
import RmGif from '../assets/gifs/rm.gif';

const FavouriteCharacters = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);

  const handleToggleFavorite = (characterId) => {
    dispatch(toggleFavorite(characterId));
  };

  const fetchData = () => {
    setLoading(true);
    if (favorites.length < 1) {
      setCharacters([])
      setLoading(false);
      return ;
    }
    axios
      .get(`/api/character/${favorites.join(',')}`)
      .then((response) => {
        const charactersArray = Array.isArray(response.data) ? response.data : [response.data];
        setCharacters(charactersArray);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };


  useEffect(() => {
    fetchData();
  }, [favorites]);
  return (
    <div>
          <Navbar />
          <div className="container py-12 mt-[120px] px-5 lg:px-0 w-full m-auto">
            <h1 className='text-3xl uppercase text-green tracking-wider text-center font-bold'>Favorite Characters</h1>
            {
              loading ?
              <div className='w-full h-[60vh] flex items-center justify-center'>
                    <LoadingSpinner/> 
              </div>
           :
              characters.length === 0 ?
              <div className='flex flex-col items-center justify-center gap-6 font-lg mt-12'>
                <h2 className='text-xl text-red-600'>There is no favorite character ! Go to characters to add one</h2>
                <img src={RmGif}/>
              </div>

              :
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-12 gap-16">
              {characters?.map((c) => (
                <CharacterCart
                  character={c}
                  key={c.id}
                  isFavorite={favorites.includes(c.id)}
                  onToggleFavorite={handleToggleFavorite}
                  favCount={favorites.length}
                />
              ))}
            </div>
            }

          </div>
    </div>
  );
};

export default FavouriteCharacters
