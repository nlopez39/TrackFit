//This will hold the different workouts a user can do
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ADD_WORKOUT } from "../utils/mutations";
import { QUERY_WORKOUT, QUERY_ME } from "../utils/queries";
import WorkoutList from "../components/WorkoutList";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
export default function Workout() {
  const dayOfWeek = [
    "Choose One",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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

  const [inputWorkout, setInputWorkout] = useState({
    dayofWeek: "",
    bodyPart: "",
    exercise: "",
    caloriesBurned: "",
  });
  const [addWorkout, { error }] = useMutation(ADD_WORKOUT, {
    refetchQueries: [QUERY_WORKOUT, "getWorkouts", QUERY_ME, "me"],
  });

  //use state to show the user input form
  const [showForm, setShowForm] = useState(false);

  //handle change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputWorkout({
      ...inputWorkout,
      [name]: value,
    });
  };
  //handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addWorkout({
        variables: {
          dayofWeek: inputWorkout.dayofWeek,
          bodyPart: inputWorkout.bodyPart,
          exercise: inputWorkout.exercise,
          caloriesBurned: parseInt(inputWorkout.caloriesBurned),
        },
      });
      //reset inputData
      setInputWorkout({
        dayofWeek: "",
        bodyPart: "",
        exercise: "",
        caloriesBurned: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

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
          <div>
            <button
              className="btn btn-secondary"
              onClick={() => setShowForm(true)}
            >
              Add a Workout
            </button>

            {showForm && (
              <>
                <div className="card mb-3">
                  <h4 className="card-header bg-light text-dark p-2 m-0">
                    <form onSubmit={handleFormSubmit}>
                      <div className="row">
                        <div className="col">
                          <label>Day of the Week</label>
                          <select
                            name="dayofWeek"
                            value={inputWorkout.dayofWeek}
                            onChange={handleChange}
                          >
                            {dayOfWeek.map((day) => (
                              <option key={day}>{day}</option>
                            ))}
                          </select>
                        </div>

                        <div className="col">
                          <label>Exercise</label>
                          <input
                            name="exercise"
                            value={inputWorkout.exercise}
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="col">
                          <label>Calories Burned</label>
                          <input
                            name="caloriesBurned"
                            value={inputWorkout.caloriesBurned}
                            onChange={handleChange}
                          ></input>
                        </div>

                        <div className="col">
                          <button type="submit">Save</button>
                          <button
                            type="cancel"
                            onClick={() => setShowForm(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </h4>
                </div>
              </>
            )}

            <div>
              <h4 className="mt-4">Summer Challenge 2024</h4>
              <p>Complete the Summer Challenge and gain 100 Progress Points</p>
              <div className="row">
                <div className="col">
                  <label>Arms</label>
                  <a href="https://youtu.be/X6gWQ1Lcvjg?si=W_SIfU5b0Ly3_U9Z">
                    <img src="./arms.jpg" className="d-block w-100"></img>
                  </a>
                </div>
                <div className="col">
                  <label>Core</label>

                  <a href="https://youtu.be/-b2lNLq3EaA?si=gm-aOUii6VAsti3u">
                    <img src="./core.jpg" className="d-block w-100"></img>
                  </a>
                </div>
                <div className="col">
                  <label>Glutes and Thighs</label>

                  <a href="https://youtu.be/Gwf8vxZ_o3s?si=dgv80HiO9d2Y6GPP">
                    <img src="./legs.jpg" className="d-block w-100"></img>
                  </a>
                </div>
                <div className="col">
                  <label>30 min Yoga</label>

                  <a href="https://youtu.be/AB3Y-4a3ZrU?si=3eTMYPODYjqn3qXV">
                    <img src="./yoga.jpg" className="d-block w-100"></img>
                  </a>
                </div>
                <div className="col">
                  <label>HIIT Workout</label>

                  <a href="https://youtu.be/M0uO8X3_tEA?si=mcsvSrA9CRXXY5ld">
                    <img src="./cardio.jpg" className="d-block w-100"></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Link to="/login">You need to login or signup first </Link>
      )}
    </>
  );
}
