import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import CharacterCart from "../components/CharacterCart";

const Episode = () => {
  const { episodeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [episode, setEpisode] = useState();
  const [chs, setChs] = useState([]);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`/api/episode/${episodeId}`)
      .then((response) => {
        var nums = extractNumbers(response.data.characters);
        fetchCharacters(nums)
        setEpisode(response.data);
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

  const fetchCharacters = (nums) => {
    setLoading(true);
    axios
    .get(`/api/character/${nums.join(',')}`)
    .then((response) => {
      setChs(response.data)
      setLoading(false)
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />

      <div className="container mt-[120px] py-12  px-5 lg:px-0 w-full m-auto">
        {loading ? (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            <div className="w-full h-full border border-gray-300 rounded">
              <div className="bg-green w-full flex items-center justify-center min-h-[150px] font-bold tracking-wide text-2xl text-white">  
               {episode?.name}
              </div>
              <div className="p-5 flex items-center justify-between">
                <h1 className="sm:text-lg">Episode: <span className="font-bold">{episode?.episode}</span></h1>
                <span className="sm:text-lg">Air Date: <span className="font-bold">{episode?.air_date}</span></span>
              </div>

              <div className="p-5">

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 mt-12">
                    {
                        chs.map((c)=>(
                            <CharacterCart
                            character={c}
                            key={c.id}
                            fromEpsiode={true}
                            />
                        ))
                    }
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {episodeId}
    </div>
  );
};

export default Episode;
