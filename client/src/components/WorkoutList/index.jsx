import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_WORKOUT, QUERY_ME } from "../../utils/queries";
import { REMOVE_WORKOUT } from "../../utils/mutations";
import { format } from "date-fns";
import Auth from "../../utils/auth";
//I don't think we need to update a workout
const WorkoutList = ({ selectedDate }) => {
  const location = useLocation();
  const { loading, data, refetch } = useQuery(QUERY_WORKOUT);
  const [deleteWorkout] = useMutation(REMOVE_WORKOUT, {
    refetchQueries: [QUERY_WORKOUT, "getWorkouts", QUERY_ME, "me"],
  });

  // Get today's date in the desired format from the selectedDate prop passed from workout page
  const today = selectedDate ? format(selectedDate, "EEEE") : new Date(); // 'EEEE' gives the full name of the day, e.g., "Monday"

  // Filter by the selected date's workouts
  const todayWorkouts = data?.workouts.filter(
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
                todayWorkouts.map((workout) => (
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
                        <div className="col">
                          <button
                            onClick={() => handleDeleteClick(workout._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </h4>
                  </div>
                ))
              )}
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
