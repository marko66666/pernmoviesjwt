import React, { Fragment, useState, useEffect } from "react";
import InputMovie from "./InputMovie";
import ListAndSearchMovies from "./ListAndSearchMovies";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http//localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      console.log(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <InputMovie />
      <ListAndSearchMovies />
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
    </>
  );
};

export default Dashboard;
