//the user's current diet goes here:
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import DietList from "../components/DietList";
import { ADD_DIET } from "../utils/mutations";
import { QUERY_DIET, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

export default function Diet() {
  //state that holds the current values for the diet being added, in this case they are empty initiial values
  const [inputDiet, setInputDiet] = useState({
    food: "",
    calories: "",
    carbs: " ",
  });
  //with the use of state you can either show the form or not
  const [showForm, setShowForm] = useState(false);
  //This line uses the useMutation hook to create a function (addDiet) for performing the ADD_DIET mutation. It also sets up refetching of queries QUERY_DIET and QUERY_ME after the mutation completes to ensure the UI is updated with the latest data.
  const [addDiet, { error }] = useMutation(ADD_DIET, {
    refetchQueries: [QUERY_DIET, "getDiets", QUERY_ME, "me"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addDiet({
        variables: {
          food: inputDiet.food,
          calories: parseInt(inputDiet.calories),
          carbs: parseInt(inputDiet.carbs),
          // thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      setInputDiet({
        food: "",
        calories: "",
        carbs: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputDiet({
      ...inputDiet,
      [name]: value,
    });
  };

  return (
    <>
      <div>
        {Auth.loggedIn() ? (
          <>
            <DietList />
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowForm(true)}
                >
                  Add Item
                </button>
                {showForm && (
                  <div className="card mb-3">
                    <h4 className="card-header bg-light text-dark p-2 m-0">
                      <form onSubmit={handleFormSubmit}>
                        <div className="row">
                          <div className="col">
                            <label>Food</label>
                            <input
                              type="text"
                              name="food"
                              value={inputDiet.food}
                              onChange={handleChange}
                            ></input>
                          </div>
                          <div className="col">
                            <label>Calories</label>
                            <input
                              type="number"
                              name="calories"
                              value={inputDiet.calories}
                              onChange={handleChange}
                            ></input>
                          </div>
                          <div className="col">
                            <label>Carbs</label>
                            <input
                              type="number"
                              name="carbs"
                              value={inputDiet.carbs}
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
            <h2>Diets</h2>
            <Link to="/login">You need to login or signup first </Link>
          </>
        )}
      </div>
    </>
  );
}
