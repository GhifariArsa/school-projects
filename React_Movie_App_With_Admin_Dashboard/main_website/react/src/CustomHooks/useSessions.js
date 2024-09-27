import { useState, useEffect } from "react";
import axios from "axios";

const API_HOST = "http://localhost:4000"; // Replace with your API host

function useSessions(id) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

async function fetchSessionsById(id) {
    try {
        const response = await axios.get(API_HOST + "/v1/sessions/" + id);
        transformSessions(response.data);
    } catch (err) {
        setError(err);
    } finally {
        setLoading(false);
    }
}


function transformSessions(data){
    const transformedSessions = {};
    data.forEach((session) => {
        const date = new Date(session.DATE);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
        const time = session.TIME.slice(0, 5); // Extract the HH:mm part
        const sessionId = session.ID;

        if (!transformedSessions[formattedDate]) {
            transformedSessions[formattedDate] = [{ time, id: sessionId,taken: session.SEATS_TAKEN, available: session.SEATS_AVAILABLE,date:session.DATE,movieId:session.MOVIE_ID}];
        } else {
            transformedSessions[formattedDate].push({ time, id: sessionId,taken: session.SEATS_TAKEN, available: session.SEATS_AVAILABLE,date:session.DATE,movieId:session.MOVIE_ID });
    }
    setSessions(transformedSessions);
});
}

  return { sessions, loading, error,fetchSessionsById};
}

export default useSessions;