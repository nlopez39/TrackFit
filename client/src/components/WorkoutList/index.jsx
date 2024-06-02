import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_WORKOUT, QUERY_ME } from "../../utils/queries";
import {
  REMOVE_WORKOUT,
  ADD_WORKOUT,
  COMPLETE_WORKOUT,
} from "../../utils/mutations";
import { format } from "date-fns";
import Auth from "../../utils/auth";
//I don't think we need to update a workout
const WorkoutList = ({ selectedDate }) => {
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
  const location = useLocation();
  const { loading, data, refetch } = useQuery(QUERY_WORKOUT);
  const [deleteWorkout] = useMutation(REMOVE_WORKOUT, {
    refetchQueries: [QUERY_WORKOUT, "getWorkouts", QUERY_ME, "me"],
  });
  //manage completed workouts
  const [completeWorkout] = useMutation(COMPLETE_WORKOUT, {
    refetchQueries: [QUERY_WORKOUT, "getWorkouts", QUERY_ME, "me"],
  });

  // Get today's date in the desired format from the selectedDate prop passed from workout page
  const today = selectedDate ? format(selectedDate, "EEEE") : new Date(); // 'EEEE' gives the full name of the day, e.g., "Monday"

  // Filter by the selected date's workouts
  const todayWorkouts = data?.workouts.filter(
    //example "mpnday == monday"
    (workout) => workout.dayofWeek === today
  );
  console.log("Todays workouts", todayWorkouts);

  //handleDelete click
  const handleDeleteClick = async (_id) => {
    try {
      const { data } = await deleteWorkout({ variables: { _id } });
    } catch (err) {
      console.log(err);
    }
  };
  //handleCompleted Workout
  const handleCompletedWorkout = async (_id) => {
    try {
      const { data } = await completeWorkout({ variables: { _id } });
    } catch (err) {
      console.log(err);
    }
  };

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

  if (!data?.workouts.length) {
    return <h3>No Workouts Yet</h3>;
  }
  return (
    <>
      {Auth.loggedIn() ? (
        <>
          {location.pathname !== "/workout" ? (
            <>
              <div className="row">
                <label className="col" style={{ marginLeft: "1rem" }}>
                  My Schedule
                </label>
                <label className="col mb-2" style={{ marginLeft: "14rem" }}>
                  <Link to="/workout">View All</Link>
                </label>
              </div>

              {data?.workouts &&
                data?.workouts
                  .slice(0, 5)
                  .filter((workout) => !workout.completed)
                  .map((workout) => (
                    <div key={workout._id} className="card mb-3">
                      <h4 className="card-header bg-light text-dark p-2 m-0">
                        <div className="row">
                          <div className="col" style={{ fontSize: "12px" }}>
                            {workout.dayofWeek}
                          </div>
                          <div className="col" style={{ fontSize: "12px" }}>
                            {workout.exercise}
                          </div>
                          <div className="col" style={{ fontSize: "12px" }}>
                            {workout.caloriesBurned} calories
                          </div>
                        </div>
                      </h4>
                    </div>
                  ))}
            </>
          ) : (
            <>
              {todayWorkouts.length === 0 ? (
                <p>No workouts scheduled for today.</p>
              ) : (
                todayWorkouts
                  .filter((workout) => !workout.completed)
                  .map((workout) => (
                    <div key={workout._id} className="card mt-4 mb-3">
                      <h4 className="card-header bg-light text-dark p-2 m-0">
                        <div className="row">
                          <div className="col" style={{ fontSize: "12px" }}>
                            {workout.dayofWeek}
                          </div>
                          <div className="col" style={{ fontSize: "12px" }}>
                            {workout.exercise}
                          </div>
                          <div className="col" style={{ fontSize: "12px" }}>
                            {workout.caloriesBurned} calories
                          </div>
                          <div className="col">
                            <button
                              onClick={() => handleDeleteClick(workout._id)}
                            >
                              Delete
                            </button>
                            <button
                              onClick={() =>
                                handleCompletedWorkout(workout._id)
                              }
                            >
                              Complete
                            </button>
                          </div>
                        </div>
                      </h4>
                    </div>
                  ))
              )}
              <div>
                <button
                  className="btn btn-secondary mb-4"
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

                <h3>Completed Workouts</h3>
                <div className="card border rounded ">
                  {data?.workouts
                    .filter((workout) => workout.completed)
                    .map((workout) => (
                      <div key={workout._id} className="card mb-3">
                        <h4 className="card-header p-2 m-0">
                          <div className="row">
                            <div className="col" style={{ fontSize: "12px" }}>
                              {workout.dayofWeek}
                            </div>
                            <div className="col" style={{ fontSize: "12px" }}>
                              {workout.exercise}
                            </div>
                            <div className="col" style={{ fontSize: "12px" }}>
                              {workout.caloriesBurned} calories
                            </div>
                          </div>
                        </h4>
                      </div>
                    ))}
                </div>
                <div>
                  <h4 className="mt-4">Summer Challenge 2024</h4>
                  <p>
                    Complete the Summer Challenge and gain 100 Progress Points
                  </p>
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
          )}
        </>
      ) : (
        <>
          <div className="row">
            <label className="col" style={{ marginLeft: "1rem" }}>
              My Schedule
            </label>
            <label className="col mb-2" style={{ marginLeft: "14rem" }}>
              <Link to="/workout">View All</Link>
            </label>
          </div>

          {data?.workouts &&
            data?.workouts.slice(0, 5).map((workout) => (
              <div key={workout._id} className="card mb-3">
                <h4 className="card-header bg-light text-dark p-2 m-0">
                  <div className="row">
                    <div className="col" style={{ fontSize: "12px" }}>
                      {workout.dayofWeek}
                    </div>
                    <div className="col" style={{ fontSize: "12px" }}>
                      {workout.exercise}
                    </div>

                    <div className="col" style={{ fontSize: "12px" }}>
                      {workout.caloriesBurned}
                    </div>
                  </div>
                </h4>
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default WorkoutList;
