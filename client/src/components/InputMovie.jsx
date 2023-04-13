import React, { useState } from "react";

const InputMovie = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [rating, setRating] = useState(0.0);

  const handleButtonClicked = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const reqBody = { title, summary, rating };
      const response = await fetch("http://localhost:5000/dashboard/movies", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(reqBody),
      });

      window.location = "/dashboard";
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="container text-center">
        <h1>Input Movie</h1>
        <div className="d-flex flex-column">
          <input
            className="from-control"
            type="text"
            placeholder="Movie title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="from-control"
            type="text"
            placeholder="Movie summary"
            onChange={(e) => setSummary(e.target.value)}
          />
          <input
            className="from-control"
            type="text"
            placeholder="Movie rating"
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <br></br>
        <button
          className="btn btn-success"
          onClick={(e) => handleButtonClicked(e)}
        >
          Add Movie
        </button>
        <br></br>
        <br></br>
      </div>
    </>
  );
};

export default InputMovie;
