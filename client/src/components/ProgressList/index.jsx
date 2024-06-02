import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
//useQuery is used to fetch data from the server
import { QUERY_GOAL, QUERY_ME } from "../../utils/queries";
import {
  UPDATE_GOAL,
  REMOVE_GOAL,
  ADD_GOAL,
  COMPLETE_GOAL,
} from "../../utils/mutations";

import { format } from "date-fns";
import { Link, useLocation } from "react-router-dom";

import Auth from "../../utils/auth";

const ProgressList = () => {
  const today = new Date();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const year = today.getFullYear();
  const date = ("0" + today.getDate()).slice(-2);
  const currentDate = year + "-" + month + "-" + date;
  //   console.log(currentDate);
  //   console.log("dates left", Math.abs(currentDate));
  //this is fetching the goal data from the QUERY_DIET
  const { loading, data, refetch } = useQuery(QUERY_GOAL);
  const logGoalDates = (goalDate) => {
    // data?.goals.forEach((goal) => {
    const date1 = new Date(currentDate);
    const date2 = new Date(goalDate);
    const diff = Math.abs(date1 - date2);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
    // console.log(diffDays);
    // }
    // );
  };
  //   logGoalDates(data);
  //state that holds the current values for the diet being added, in this case they are empty initiial values
  const [inputGoal, setInputGoal] = useState({
    date: "",
    goal: "",
  });
  //completed Goal mutation
  const [completeGoal] = useMutation(COMPLETE_GOAL, {
    refetchQueries: [QUERY_GOAL, "getGoals", QUERY_ME, "me"],
  });
  //with the use of state you can either show the form or not
  const [showAddForm, setAddShowForm] = useState(false);
  //This line uses the useMutation hook
  const [addGoal, { error }] = useMutation(ADD_GOAL, {
    refetchQueries: [QUERY_GOAL, "getGoals", QUERY_ME, "me"],
  });

  //handleCompleted Goal
  const handleCompletedGoal = async (_id) => {
    try {
      const { data } = await completeGoal({ variables: { _id } });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmitAdd = async (event) => {
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
      setAddShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeAdd = (event) => {
    const { name, value } = event.target;

    setInputGoal({
      ...inputGoal,
      [name]: value,
    });
  };
  //delete goal
  const [deleteGoal] = useMutation(REMOVE_GOAL, {
    //get the latest data after updated
    refetchQueries: [QUERY_GOAL, "getGoals", QUERY_ME, "me"],
  });

  const [updatedGoalMutation] = useMutation(UPDATE_GOAL);
  //will allow us to edit the diet item
  const [editingGoalId, setEditingGoalId] = useState(null);
  //tells us what page we are on so that I can remove the "View All" link
  const location = useLocation();
  //state holds the current values for the goal being edited, including its ID, food name, calories, and carbs.We indicate initial state in lines 21-24
  const [editedGoal, setEditedGoal] = useState({
    id: null,
    goal: "",
    date: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await updatedGoalMutation({
        variables: {
          id: editedGoal.id,
          goal: editedGoal.goal,
          date: editedGoal.date,
        },
      });

      setEditedGoal({
        id: null,
        goal: "",
        date: "",
      });
      //set id to null
      setEditingGoalId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedGoal({
      ...editedGoal,
      [name]: value,
    });
  };

  const handleEditClick = (goal) => {
    setEditedGoal({
      id: goal._id,
      goal: goal.goal,
      date: goal.date,
    });
    //set id
    setEditingGoalId(goal._id);
  };

  //delete
  const handleDeleteClick = async (_id) => {
    try {
      //this will send a mutation request to delete this specific item from the server

      const { data } = await deleteGoal({ variables: { _id } });
    } catch (err) {
      console.log(err);
    }
  };

  const formattedDate = format(today, "MMMM do yyyy");
  if (!data?.goals.length) {
    return <h3>No Goals Yet</h3>;
  }

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <div className="">
            <h4 className="card-header">
              <div className="row">
                <h2 className="col mb-4">My Goals</h2>
                {data?.goals.filter((goal) => !goal.completed).length === 0 ? (
                  <p>No Goals Yet</p>
                ) : null}
                <div className="col">
                  {location.pathname !== "/progress" && (
                    <Link to="/progress">View All</Link>
                  )}
                </div>
              </div>
            </h4>
          </div>

          {data?.goals
            .filter((goal) => !goal.completed)
            .map((goal) => (
              <div key={goal._id} className="card">
                <h4 className="card-header bg-light text-dark">
                  <div className="row">
                    {editingGoalId === goal._id ? (
                      <form onSubmit={handleFormSubmit}>
                        <div className="col">
                          <label>Goal</label>
                          <input
                            type="text"
                            name="goal"
                            value={editedGoal.goal}
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="col">
                          <label>Due Date</label>
                          <input
                            type="date"
                            name="date"
                            value={editedGoal.date}
                            onChange={handleChange}
                          ></input>
                        </div>

                        <div className="col">
                          <button type="submit">Save</button>
                          <button
                            onClick={() => setShowForm(false)}
                            type="submit"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="col">{goal.goal}</div>
                        {location.pathname !== "/" && (
                          <div className="col">{goal.date}</div>
                        )}
                        <div className="col">
                          {logGoalDates(goal.date)} Days Left
                        </div>

                        <div className="col">
                          {location.pathname !== "/" && (
                            <>
                              <button onClick={() => handleEditClick(goal)}>
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteClick(goal._id)}
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => handleCompletedGoal(goal._id)}
                              >
                                Complete
                              </button>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </h4>
              </div>
            ))}

          <div className="row">
            {location.pathname !== "/" && (
              <div className="col">
                <button
                  className="btn btn-secondary mb-4"
                  onClick={() => setAddShowForm(true)}
                >
                  Add a Goal
                </button>

                {showAddForm && (
                  <div className="card mb-3">
                    <h4 className="card-header bg-light text-dark p-2 m-0">
                      <form onSubmit={handleFormSubmitAdd}>
                        <div className="row">
                          <div className="col">
                            <label>Goal</label>
                            <input
                              type="text"
                              name="goal"
                              value={inputGoal.goal}
                              onChange={handleChangeAdd}
                            ></input>
                          </div>
                          <div className="col">
                            <label>Due Date</label>
                            <input
                              type="date"
                              name="date"
                              value={inputGoal.date}
                              onChange={handleChangeAdd}
                            ></input>
                          </div>

                          <div className="col">
                            <button type="submit">Save</button>
                            <button
                              type="cancel"
                              onClick={() => setAddShowForm(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    </h4>
                  </div>
                )}

                <h3>Completed Goals</h3>
                <div className="card border rounded ">
                  {data?.goals
                    .filter((goal) => goal.completed)
                    .map((goal) => (
                      <div key={goal._id} className="card mb-3">
                        <h4 className="card-header p-2 m-0">
                          <div className="row">
                            <div className="col">{goal.goal}</div>
                            <div className="col">
                              Completed On {formattedDate}
                            </div>
                          </div>
                        </h4>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="">
            <h4 className="card-header">
              <div className="row">
                <div className="col">My Goals</div>
                <div className="col">
                  {location.pathname !== "/progress" && (
                    <Link to="/progress">View All</Link>
                  )}
                </div>
              </div>
            </h4>
          </div>
          {data?.goals &&
            data?.goals.map((goal) => (
              <div key={goal._id} className="card mb-3">
                <h4 className="card-header bg-light text-dark p-2 m-0">
                  <div className="row">
                    <div className="col">{goal.goal}</div>

                    <div className="col">Login to View</div>
                    {/* made changes here  */}
                  </div>
                </h4>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default ProgressList;
