import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import Pagination from '../components/Pagination';
import LocationCard from '../components/LocationCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Locations = () => {
  const [loading, setLoading] = useState();
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [info, setInfo] = useState();
  const [page, setPage] = useState(1);

  const fetchData = (pageNumber) => {
    setLoading(true);
    axios.get(`/api/location?page=${pageNumber}`)
    .then((res)=>{
      setLocations(res.data.results);
      setFilteredLocations(res.data.results);
      console.log(res.data.results)
      setInfo(res.data.info);
      setLoading(false);
    })
    .catch((err)=> {
      setLoading(false);
      console.log(err);
    })
  }

  const filterLocations = (term) => {
    if (term.trim() === "") {
      setFilteredLocations(locations);
      return
    }
    const filtered = locations.filter((loc) => {
      const {name , type , dimension} = loc;
      return(
        name.toLowerCase().includes(term.toLowerCase()) ||
        type.toLowerCase().includes(term.toLowerCase()) ||
        dimension.toLowerCase().includes(term.toLowerCase())
      )
    })
    setFilteredLocations(filtered);
  }

  const handleSearch = (term) => {
    filterLocations(term);
  }

  useEffect(()=> {
    fetchData(page)
  }, [page]);
  return (

    <div>
      <Navbar/>

      <div className='container mt-[120px] py-12 lg:px-0 w-full m-auto'>
        <Searchbar onSearch={handleSearch}/>
        {
          loading ? <div className='w-full h-[60vh] flex items-center justify-center'>
            <LoadingSpinner />
            </div> :
            <>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-12 gap-16'>
        {
          filteredLocations.map((loc)=>(
            <LocationCard key={loc.id} location={loc} />
          ))
        }
        </div>
        <Pagination currentPage={page} totalPages={info ? info.pages : 1} setPage={setPage}/>
        </>
        }
      </div>  

    </div>
  )
}

export default Locations
