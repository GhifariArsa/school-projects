import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getMovieAnalytics } from "../../data/repository";
import "./analytics.css"

export default function Analytics() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAnalytics();
  }, []);

  const getAnalytics = async () => {
    try {
      const response = await getMovieAnalytics();
      setMovies(response);
    } catch (error) {
      console.error("Error fetching movie analytics: ", error);
      // Handle error state
    }
  };

  if (!movies) {
    return <div>Loading...</div>; // Handle the loading state
  }

  return (
    <>
      <h1>Movie Analytics</h1>
      <div className="analytics-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Average Rating</th>
              <th>View Count</th>
              <th>Review Count</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.ID}>
                <td>{movie.ID}</td>
                <td>{movie.TITLE}</td>
                <td>{movie.AVG_RATING}</td>
                <td>{movie.VIEW_COUNT}</td>
                <td>{movie.NUM_REVIEW}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
