import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites, toggleFavorite } from '../redux/characterSlice';
import { FaTrash } from 'react-icons/fa';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import CharacterCart from '../components/CharacterCart';
import LoadingSpinner from '../components/LoadingSpinner';

const FavouriteCharacters = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);

  const handleToggleFavorite = (characterId) => {
    dispatch(toggleFavorite(characterId));
  };

  const fetchData = (pageNumber) => {
    setLoading(true);
    axios
      .get(`/api/character/${favorites.join(',')}`)
      .then((response) => {
        setCharacters(response.data);
        console.log(response.data)
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-12 gap-16">
              {characters.map((c) => (
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
