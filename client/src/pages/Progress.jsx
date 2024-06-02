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
  return (
    <>
      <div>
        {Auth.loggedIn() ? (
          <>
            <div className="row card gx-5 justify-content-center">
              <div className="col text-center">
                <h1>
                  🔥Calories Burned🔥
                  <h2>{totalCalories}</h2>
                </h1>
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
