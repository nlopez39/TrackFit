//the user's progress will be found here
//the user's current diet goes here:
import { Link } from "react-router-dom";

import React, { useState } from "react";
import ProgressList from "../components/ProgressList";

import Auth from "../utils/auth";

export default function Progress() {
  return (
    <>
      <div>
        {Auth.loggedIn() ? (
          <>
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
