import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import CharacterCart from "../components/CharacterCart";
import { selectFavorites, toggleFavorite } from "../redux/characterSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";

const Characters = () => {
  const [loading, setLoading] = useState();
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState();
  const [page, setPage] = useState(1);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const fetchData = (pageNumber) => {
    setLoading(true);
    axios
      .get(`/api/character?page=${pageNumber || page}`)
      .then((response) => {
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
        setInfo(response.data.info);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const filterCharacters = (term) => {
    if (term.trim() === "") {
      setFilteredCharacters(characters);
      return;
    }
    const filtered = characters.filter((character) => {
      const { name, species, status, location } = character;
      return (
        name.toLowerCase().includes(term.toLowerCase()) ||
        species.toLowerCase().includes(term.toLowerCase()) ||
        status.toLowerCase().includes(term.toLowerCase()) ||
        location.name.toLowerCase().includes(term.toLowerCase()) 
      );
    });
    setFilteredCharacters(filtered);
  };

  const handleSearch = (term) => {
    filterCharacters(term);
  };

  const handleToggleFavorite = (characterId) => {
    dispatch(toggleFavorite(characterId));
  };

  useEffect(() => {
    fetchData(page);
  }, [page, favorites]);

  useEffect(() => {
    filterCharacters(""); 
  }, [favorites]);

  return (
    <div>
      <Navbar />

      <div className="container py-12 mt-[120px] px-5 lg:px-0 w-full m-auto">
        <Searchbar onSearch={handleSearch} />
        {
          loading ?
          <div className="w-full h-[60vh] flex items-center justify-center">
            <LoadingSpinner/>
          </div>
          :
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-12 gap-16">
          {filteredCharacters.map((c) => (
            <CharacterCart
              character={c}
              key={c.id}
              isFavorite={favorites.includes(c.id)}
              onToggleFavorite={handleToggleFavorite}
              favCount={favorites.length}
            />
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={info ? info.pages : 1}
          setPage={setPage}
        />
          </>
        }
      </div>

      
    </div>
  );
};

export default Characters;
