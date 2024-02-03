import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import axios from '../api/axios';
import EpisodeCart from '../components/EpisodeCart';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

const Episodes = () => {
  const [loading, setLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [info, setInfo] = useState();
  const [page, setPage] = useState(1);

  const fetchData = (pageNumber) => {
    setLoading(true);
    axios
      .get(`/api/episode?page=${pageNumber}`)
      .then((response) => {
        setEpisodes(response.data.results);
        setFilteredEpisodes(response.data.results);
        setInfo(response.data.info);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const filterEpisodes = (term) => {
    if(term.trim() === "") {
      setFilteredEpisodes(episodes)
      return;
    }
    const filtered = episodes.filter((ep) => {
      const { episode, air_date, name } = ep;
      return (
        episode.toLowerCase().includes(term.toLowerCase()) ||
        air_date.toLowerCase().includes(term.toLowerCase()) ||
        name.toLowerCase().includes(term.toLowerCase())
      );
    });
    setFilteredEpisodes(filtered);
  };

  const handleSearch = (term) => {
    filterEpisodes(term);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div>
      <Navbar />

      <div className='container mt-[120px] py-12  px-5 lg:px-0 w-full m-auto'>
        <Searchbar onSearch={handleSearch} />
        {
          loading ? <div className='w-full h-[60vh] flex items-center justify-center'>
            <LoadingSpinner/>
            </div> :
              <>
                      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-12 gap-16'>
          {filteredEpisodes?.map((ep) => (
            <EpisodeCart episode={ep} key={ep.id} />
          ))}
        </div>
        <Pagination currentPage={page} totalPages={info ? info.pages : 1} setPage={setPage} />
              </>
        }

      </div>
    </div>
  );
};

export default Episodes;
