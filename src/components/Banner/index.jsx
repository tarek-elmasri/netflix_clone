import { useEffect, useState } from "react";
import tmdpApi from "../../api/tmdbApi";
import truncate from "../../helpers/truncate";
import "./styles.css";

const Banner = () => {
  const [movie, setMovie] = useState();

  useEffect(() => {
    let isFetching = true;
    const fetchData = async () => {
      try {
        const { data } = await tmdpApi.fetchNetflixOriginals();
        if (isFetching)
          setMovie(
            data.results[Math.floor(Math.random() * data.results.length - 1)]
          );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      isFetching = false;
    };
  }, []);

  const backgroundImage = `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`;

  const description = truncate(movie?.overview, 150);

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.name || movie?.original_name || movie?.title}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner_description">{description}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
