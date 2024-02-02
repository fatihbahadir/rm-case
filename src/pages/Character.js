import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

const Character = () => {
  const { characterId } = useParams();
  const [loading, setLoading] = useState(false);
  const [character, setCharacter] = useState();
  const [episodes, setEpisodes] = useState([]);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`/api/character/${characterId}`)
      .then((response) => {
        setCharacter(response.data);
        setEpisodes(extractNumbers(response.data.episode));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const extractNumbers = (characters) => {
    const numbersArray = characters.map((url) => {
      const parts = url.split('/');
      const lastPart = parts[parts.length - 1];
      return parseInt(lastPart, 10);
    });
    return numbersArray;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-[120px] py-12 px-5 lg:px-0 w-full m-auto">
        {loading ? (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="sm:max-w-[600px] w-full gap-3 border border-gray-300 rounded flex flex-col sm:flex-row">
              <div className="sm:w-[300px] h-full flex-shrink-0">
                <img className="w-full h-full object-fit" src={character?.image} alt={character?.name} />
              </div>
              <div className="p-2 pb-3 sm:p-5 gap-2 sm:gap-3 flex flex-col justify-center">
                <div className="flex gap-2 w-full items-center justify-center sm:justify-start">
                  <span className={`${character?.gender === 'Male' ? 'bg-blue-300' : character?.gender === 'Female' ? 'bg-pink-300' : 'bg-orange-300'} px-2 py-1 rounded text-white text-xs`}>
                    {character?.gender}
                  </span>
                  <span className={`${character?.status === 'Dead' ? 'bg-red-600' : 'bg-green'} px-2 py-1 rounded text-white text-xs`}>
                    {character?.status}
                  </span>
                </div>
                <h2 className="text-center sm:text-left text-xl font-bold">{character?.name} ({character?.species})</h2>
                <p className="text-center sm:text-left">Location: <span className="font-bold">{character?.location.name}</span></p>
                <p className="text-center sm:text-left">Origin: <span className="font-bold"> {character?.origin.name}</span></p>
                <div className="w-full flex justify-center gap-1 sm:justify-start">
                  <div className="mb-3">Episodes:</div>
                  <div className="mb-3 flex gap-1 font-bold flex-wrap">
                    {episodes?.slice(0,5).map((ep, index) => (
                      <span key={ep}>
                        <Link to={`/episode/${ep}`}>{ep}</Link>
                        {index !== (episodes.length > 4 ? 4 : episodes.length - 1) && ','}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Character;
