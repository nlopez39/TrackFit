//This will hold the different workouts a user can do
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ADD_WORKOUT } from "../utils/mutations";
import { QUERY_WORKOUT, QUERY_ME } from "../utils/queries";
import WorkoutList from "../components/WorkoutList";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
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
  const workoutTypes = [
    "Choose One",
    "At Home",
    "Free Weights",
    "Cables",
    "Cardio",
  ];
  const bodyParts = ["Choose One", "Chest", "Back", "Legs", "Arms"];
  const { loading, data } = useQuery(QUERY_WORKOUT);

  const workouts = data?.workouts || [];

  const [inputWorkout, setInputWorkout] = useState({
    dayofWeek: "",
    bodyPart: "",
    exercise: "",
    workoutType: "",
    sets: "",
    reps: "",
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
          workoutType: inputWorkout.workoutType,
          sets: parseInt(inputWorkout.sets),
          reps: parseInt(inputWorkout.reps),
        },
      });
      //reset inputData
      setInputWorkout({
        dayofWeek: "",
        bodyPart: "",
        exercise: "",
        workoutType: "",
        sets: "",
        reps: "",
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
          <h1>WORKOUT POST HERE</h1>
          <WorkoutList />
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
                          <label>Body Part</label>
                          <select
                            name="bodyPart"
                            value={inputWorkout.bodyPart}
                            onChange={handleChange}
                          >
                            {bodyParts.map((bodyPart) => (
                              <option key={bodyPart}>{bodyPart}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col">
                          <label>Workout Type</label>
                          <select
                            name="workoutType"
                            value={inputWorkout.workoutType}
                            onChange={handleChange}
                          >
                            {workoutTypes.map((workoutType) => (
                              <option key={workoutType}>{workoutType}</option>
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
                          <label>Sets</label>
                          <input
                            type="number"
                            name="sets"
                            value={inputWorkout.sets}
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="col">
                          <label>Reps</label>
                          <input
                            type="number"
                            name="reps"
                            value={inputWorkout.reps}
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
          </div>
        </>
      ) : (
        <Link to="/login">You need to login or signup first </Link>
      )}
    </>
  );
}
