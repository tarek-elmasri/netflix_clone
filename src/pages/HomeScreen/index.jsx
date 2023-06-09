import { Navbar, Banner, Row } from "../../components";
import tmdbApi from "../../api/tmdbApi";

import "./styles.css";

const HomeScreen = () => {
  return (
    <div className="homescreen">
      <Navbar />

      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        fetchMethod={tmdbApi.fetchNetflixOriginals}
        isLarge
      />
      <Row title="Trending Now" fetchMethod={tmdbApi.fetchTrending} />
      <Row title="Top Rated" fetchMethod={tmdbApi.fetchTopRated} />
      <Row title="Action Movies" fetchMethod={tmdbApi.fetchActionMovies} />
      <Row title="Comedy Movies" fetchMethod={tmdbApi.fetchComedyMovies} />
      <Row title="Horro Movies" fetchMethod={tmdbApi.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchMethod={tmdbApi.fetchRomanceMovies} />
      <Row title="Documentaries" fetchMethod={tmdbApi.fetchDocumentaries} />
    </div>
  );
};

export default HomeScreen;
