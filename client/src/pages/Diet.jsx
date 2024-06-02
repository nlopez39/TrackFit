//the user's current diet goes here:
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_DIET } from "../utils/queries";
import React, { useState } from "react";
import DietList from "../components/DietList";

import Auth from "../utils/auth";

export default function Diet() {
  //get diet date
  const { loading, data, refetch } = useQuery(QUERY_DIET);
  //loop through all diets and calculate the total calories
  let totalCalories = 0;
  let totalCarbs = 0;
  data?.diets.forEach((data) => {
    totalCalories += data.calories;
    totalCarbs += data.carbs;
  });
  return (
    <>
      <div>
        {Auth.loggedIn() ? (
          <>
            <div className="row card gx-5 justify-content-center">
              <div className="col text-center">
                <h1>
                  Total Calories
                  <h2>{totalCalories}</h2>
                </h1>
                <h3>
                  Total Carbs
                  <h4>{totalCarbs} grams</h4>
                </h3>
              </div>
            </div>
            <DietList />
          </>
        ) : (
          <>
            <h2>Diets</h2>
            <Link to="/login">You need to login or signup first </Link>
          </>
        )}
      </div>
    </>
  );
}
