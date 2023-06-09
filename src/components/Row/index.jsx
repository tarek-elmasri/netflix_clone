import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Row = ({ title, fetchMethod, isLarge }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let isFetching = true;

    const fetchData = async () => {
      try {
        const { data } = await fetchMethod();
        if (isFetching) setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => {
      isFetching = false;
    };
  }, [fetchMethod]);

  const posterBase = `https://image.tmdb.org/t/p/original`;

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((isLarge && movie.poster_path) ||
              (!isLarge && movie.backdrop_path)) && (
              <img
                className={`row__poster ${isLarge && "row__posterLarge"}`}
                key={movie.id}
                src={`${
                  posterBase +
                  (isLarge ? movie.poster_path : movie.backdrop_path)
                }`}
                alt={movie.title || movie.name}
              />
            )
        )}
      </div>
    </div>
  );
};

Row.propTypes = {
  title: PropTypes.string.isRequired,
  fetchMethod: PropTypes.func.isRequired,
  isLarge: PropTypes.bool,
};

export default Row;
