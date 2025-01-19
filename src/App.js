import React, { useState,useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';

import SearchIcon from './search.svg';

// const movie1 = {Title: 'Guardians of the Galaxy Vol. 2', 
//     Year: '2017', 
//     Rated: 'PG-13', 
//     Released: '05 May 2017', 
//     Runtime: '136 min'
// };

const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

const App = () => {

    const [searchTerm,setSearchTerm] = useState('');
    const [movies,setMovies] = useState([]);

    useEffect(() => {
        searchMovies('MARVEL');
    },[]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };


    return (
        <div className="App">
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for Movies"
                 />

                 <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() =>searchMovies(searchTerm)}
                 />
            </div>

            {
                movies?.length > 0 ? (
                    <div className="container">
                            {movies.map((movie)=>(
                                <MovieCard  movie={movie}/>
                            )
                            )}
                    </div>
                ) :
                (
                    <div className='empty'>
                        <h2>No Movies Found</h2>
                    </div>
                )
            }
        </div>
    );
};

export default App;