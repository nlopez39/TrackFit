//the user's progress will be found here
//the user's current diet goes here:
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import ProgressList from "../components/ProgressList";
import { ADD_GOAL } from "../utils/mutations";
import { QUERY_GOAL, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

export default function Progress() {
  //state that holds the current values for the diet being added, in this case they are empty initiial values
  const [inputGoal, setInputGoal] = useState({
    date: "",
    goal: "",
  });
  //with the use of state you can either show the form or not
  const [showForm, setShowForm] = useState(false);
  //This line uses the useMutation hook
  const [addGoal, { error }] = useMutation(ADD_GOAL, {
    refetchQueries: [QUERY_GOAL, "getGoals", QUERY_ME, "me"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addGoal({
        variables: {
          goal: inputGoal.goal,
          date: inputGoal.date,
        },
      });

      setInputGoal({
        goal: "",
        date: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputGoal({
      ...inputGoal,
      [name]: value,
    });
  };

  return (
    <>
      <div>
        {Auth.loggedIn() ? (
          <>
            <ProgressList />
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowForm(true)}
                >
                  Add a Goal
                </button>
                {showForm && (
                  <div className="card mb-3">
                    <h4 className="card-header bg-light text-dark p-2 m-0">
                      <form onSubmit={handleFormSubmit}>
                        <div className="row">
                          <div className="col">
                            <label>Goal</label>
                            <input
                              type="text"
                              name="goal"
                              value={inputGoal.goal}
                              onChange={handleChange}
                            ></input>
                          </div>
                          <div className="col">
                            <label>Due Date</label>
                            <input
                              type="date"
                              name="date"
                              value={inputGoal.date}
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
                )}
              </div>
            </div>
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
