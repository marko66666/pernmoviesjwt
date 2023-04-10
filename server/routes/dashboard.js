const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT u.user_name, m.id, m.title, m.summary, m.rating" +
        "FROM users AS u LEFT JOIN movie AS m ON u.user_id = m.user_id" +
        "WHERE u.user_id = $1",
      [req.user]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/movies", async (req, res) => {
  try {
    const allMovies = await pool.query("SELECT * FROM movie");
    res.status(200).json(allMovies.rows); // ListMovies.jsx, line: 24
  } catch (err) {
    res.status(503); // ListMovies.jsx, line: 24
  }
});

router.get("/movies/search", async (req, res) => {
  try {
    const { term } = req.query;

    const movies = await pool.query(
      "SELECT * FROM movie WHERE title || summary || rating LIKE $1",
      [`%${term}%`]
    );

    res.json(movies.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/movies", authorization, async (req, res) => {
  try {
    const { title, summary, rating } = req.body;
    const newMovie = await pool.query(
      "INSERT INTO movie (user_id, title, summary, rating) VALUES ($1,$2,$3,$4) RETURNING *",
      [req.user, title, summary, rating]
    );
    res.status(201).json(newMovie.rows[0]); // InputMovie.jsx, line: 12
  } catch (err) {
    res.status(503); // InputMovie.jsx, line: 12
  }
});

router.put("/movies/:id", authorization, async (req, res) => {
  try {
    const updatedMovie = await pool.query(
      "UPDATE movie SET title = $1, summary = $2, rating = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [
        req.body.title,
        req.body.summary,
        req.body.rating,
        req.params.id,
        req.user,
      ]
    );
    res.status(200).json(updatedMovie.rows[0]); // EditMovie.jsx, line: 11
  } catch (err) {
    res.status(503); // EditMovie.jsx, line: 11
  }
});

router.delete("/movies/:id", authorization, async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM movie WHERE id = $1 AND user_id = $2 RETURNING *",
      [req.params.id, req.user]
    );
    res.status(200).json("deleted"); // ListMovies.jsx, line: 13
  } catch (err) {
    res.status(503); // ListMovies.jsx, line: 13
  }
});

module.exports = router;
