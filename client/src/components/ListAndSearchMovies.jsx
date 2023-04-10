import React, { useEffect, useState } from "react";
import EditMovie from "./EditMovie";

const ListAndSearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    getMovies();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/movies/search?term=${term}`
      );

      const parseResponse = await response.json();

      setMovies(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:5000/dashboard/movies/${id}`, {
        method: "DELETE",
      }); // index.js, line: 44

      setMovies(movies.filter((movie) => movie.id !== id)); // 1) movies array is updated 2) Updated movies array is rendered on screen on line: 41
    } catch (err) {
      console.error(err.message);
    }
  };

  const getMovies = async () => {
    const res = await fetch("http://localhost:5000/dashboard/movies"); // sends HTTP GET request to index.js, line: 10
    const movieArray = await res.json();
    setMovies(movieArray); // 1) movies array is updated 2) Updated movies array is rendered on screen on line: 41
  };

  const setTermAndFetchMovies = (e) => {
    setTerm(e.target.value);
    if (e.target.value === "") {
      getMovies();
    }
  };

  return (
    <>
      <div className="container text-center">
        <form className="d-flex" onSubmit={onSubmitForm}>
          <input
            type="text"
            name="name"
            placeholder="Enter movie ..."
            className="form-control"
            value={term}
            onChange={(e) => setTermAndFetchMovies(e)}
          ></input>
          <button className="btn btn-success">Search</button>
        </form>
        <table className="table mt-5">
          <thead>
            <tr>
              <th>Title</th>
              <th>Summary</th>
              <th>Rating</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.summary}</td>
                <td>{movie.rating}</td>
                <td>
                  <EditMovie movie={movie} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteMovie(movie.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListAndSearchMovies;
