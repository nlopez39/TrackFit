import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
//useQuery is used to fetch data from the server
import { QUERY_GOAL, QUERY_ME } from "../../utils/queries";
import { UPDATE_GOAL, REMOVE_GOAL } from "../../utils/mutations";
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

  //delete goal
  const [deleteGoal] = useMutation(REMOVE_GOAL, {
    //get the latest data after updated
    refetchQueries: [QUERY_GOAL, "getGoals", QUERY_ME, "me"],
  });

  const [updatedGoalMutation] = useMutation(UPDATE_GOAL);
  //will allow us to either show or not show the edit form
  const [showForm, setShowForm] = useState(false);
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
      // do not show form

      setShowForm(false);
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
    //show the form
    setShowForm(true);
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
  if (!data?.goals.length) {
    return <h3>No Goals Yet</h3>;
  }

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
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
                    </div>
                  </div>
                </form>
              </h4>
            </div>
          )}
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

          {data?.goals.map((goal) => (
            <div key={goal._id} className="card">
              <h4 className="card-header bg-light text-dark">
                <div className="row">
                  <div className="col">{goal.goal}</div>
                  {location.pathname !== "/" && (
                    <div className="col">{goal.date}</div>
                  )}
                  <div className="col">{logGoalDates(goal.date)} Days Left</div>

                  <div className="col">
                    {location.pathname !== "/" && (
                      <>
                        <button onClick={() => handleEditClick(goal)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteClick(goal._id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </h4>
            </div>
          ))}
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
