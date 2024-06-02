//the user's current diet goes here:
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import DietList from "../components/DietList";
import { ADD_DIET } from "../utils/mutations";
import { QUERY_DIET, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

export default function Diet() {
  return (
    <>
      <div>
        {Auth.loggedIn() ? (
          <>
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
