//the user's progress will be found here
//the user's current diet goes here:
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import ProgressList from "../components/ProgressList";
import { QUERY_WORKOUT } from "../utils/queries";


import Auth from "../utils/auth";

export default function Progress() {
  const { loading, data, refetch } = useQuery(QUERY_WORKOUT);
  let totalCalories = 0;

  data?.workouts.forEach((workout) => {
    totalCalories += workout.caloriesBurned;
  });
  // Calculate progress percentage
  const progressPercentage = (totalCalories / 2000) * 100;
  return (
    <>
      <div>
        {Auth.loggedIn() ? (
          <>
            <div className="calories-burned row card gx-5 justify-content-center">
              <div className="col text-center">
                <h1
                  style={{ fontSize: "25px", fontWeight: "", color: "#ffffff" }}
                >
                  🔥 Calories Burned: {totalCalories}
                </h1>
                <h1
                  style={{ fontSize: "25px", fontWeight: "", color: "#ffffff" }}
                >
                  Progress
                </h1>
                <div
                  className="progress-container"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="progress" style={{ width: "200px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progressPercentage}%` }}
                      aria-valuenow={progressPercentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <ProgressList />
            
          </>
        ) : (
          <>
            <h2>Progress</h2>
            <Link to="/login">You need to login or signup first </Link>
          </>
        )}
      </div>
    </>
  );
}
