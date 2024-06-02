//This will hold the different workouts a user can do
import { useQuery } from "@apollo/client";
import React, { useState } from "react";

import { QUERY_WORKOUT, QUERY_ME } from "../utils/queries";
import WorkoutList from "../components/WorkoutList";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
export default function Workout() {
  const { loading, data } = useQuery(QUERY_WORKOUT);

  const workouts = data?.workouts || [];
  // Get today's date in the desired format
  //state change on calendar
  const [selectedDate, setDate] = useState(new Date());
  const today = format(selectedDate, "EEEE"); // 'EEEE' gives the full name of the day, e.g., "Monday"
  // console.log("Today is:", today); // Debugging line
  // console.log("Workouts:", workouts); // Debugging line

  //handle selected Date
  const handleDateChange = (date) => {
    setDate(date);
  };
  // console.log("Today's Workouts:", todayWorkouts); // Debugging line

  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <Calendar onChange={handleDateChange} value={selectedDate} />
          {loading ? (
            <p>Loading workouts...</p>
          ) : (
            // pass selectedDate as a prop so that workoutList can use it
            <WorkoutList selectedDate={selectedDate} />
          )}
        </>
      ) : (
        <>
          <h2>Workouts</h2>
          <Link to="/login">You need to login or signup first </Link>
        </>
      )}
    </>
  );
}
