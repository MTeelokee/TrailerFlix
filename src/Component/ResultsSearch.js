import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import iconGauche from "../Asset/icons8-flèche-gauche-50.png";
import iconDroit from "../Asset/icons8-flèche-droite-50.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Logo from "../Asset/trailerflix.png";

const ResultsSearch = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const [resultSearch, setResultSearch] = useState([]);
  const [count, setCount] = useState(1);
  const [slice, setSlice] = useState({ start: "0", end: "6" });
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const fetchData = async () => {
    try {
      const callData = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=${count}&include_adult=false`
      );
      setResultSearch(callData.data.results);

      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const removePeople = () => {
    setResultSearch((current) =>
      current.filter(
        (el) => el.media_type.includes("movie") || el.media_type.includes("tv")
      )
    );
  };

  useEffect(() => {
    fetchData();
    removePeople();
  }, [query, count]);

  const clear = () => {
    const query = document.querySelector(".form__field");
    query.value = "";
    navigate(`/home/movie`);
  };

  const changeSlicePlus = () => {
    parseInt(slice.end) === 18 && setCount(count + 1);
    parseInt(slice.end) + 6 < resultSearch.length
      ? setSlice((prevState) => ({
          ...prevState,
          start: parseInt(slice.start) + 6,
          end: parseInt(slice.end) + 6,
        }))
      : setSlice((prevState) => ({
          ...prevState,
          start: "0",
          end: "6",
        }));
  };

  const changeSliceMoins = () => {
    parseInt(slice.start) === 0 && count > 1 && setCount(count - 1);
    if (parseInt(slice.start) - 6 >= 0) {
      setSlice((prevState) => ({
        ...prevState,
        start: parseInt(slice.start) - 6,
        end: parseInt(slice.end) - 6,
      }));
    } else if (parseInt(slice.start) === 0 && count === 1) {
      return;
    } else {
      setSlice((prevState) => ({
        ...prevState,
        start: "12",
        end: "18",
      }));
    }
  };

  const typeFilter = (e) => {
    if (e.media_type === "movie") {
      navigate(`/home/${e.id}`);
    } else {
      navigate(`/home/series/${e.id}`);
    }
  };

  return (
    <>
      <div className="moviSearch">
        <img
          className="iconButtonFilm"
          src={iconGauche}
          width={"40px"}
          height={"40px"}
          alt="clickGauche"
          onClick={() => changeSliceMoins()}
        />
        {resultSearch.length > 0 ? (
          resultSearch.slice(slice.start, slice.end).map(
            (el, i) =>
              el.poster_path && (
                <div className="card" key={i}>
                  <LazyLoadImage
                    src={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
                    width={"200px"}
                    alt="film"
                    effect="blur"
                    onClick={() => typeFilter(el)}
                  />
                </div>
              )
          )
        ) : (
          <div className="card">
            <h3>No Results</h3>
            <img
              src={Logo}
              width={"200px"}
              alt="film"
              effect="blur"
              onClick={() => clear()}
            />
          </div>
        )}
        <img
          className="iconButtonFilm"
          src={iconDroit}
          width={"40px"}
          height={"40px"}
          alt="clickDroit"
          onClick={() => changeSlicePlus()}
        />
      </div>
    </>
  );
};

export default ResultsSearch;
