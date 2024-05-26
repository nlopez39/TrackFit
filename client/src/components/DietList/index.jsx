import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_DIET, UPDATE_DIET } from "../../utils/mutations";
import { QUERY_DIET, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

//create a function to handle the submit ans update the
//TODO: create a funciton to handle adding a diet
const DietList = ({ diets }) => {
  //create an updatedDietMutation function to use UPDATE_DIET to update an existing diet entry
  const [updatedDietMutation] = useMutation(UPDATE_DIET);
  //This line uses the useMutation hook to create a function (addDiet) for performing the ADD_DIET mutation. It also sets up refetching of queries QUERY_DIET and QUERY_ME after the mutation completes to ensure the UI is updated with the latest data.
  const [addDiet, { error }] = useMutation(ADD_DIET, {
    refetchQueries: [QUERY_DIET, "getDiets", QUERY_ME, "me"],
  });
  //useState hook that uses editMode as a piece of state and the setEditMode as a function that will update the state
  //a boolean indicating whether the form is in "edit mode" or "add mode."
  const [editMode, setEditMode] = useState(false);
  //state holds the current values for the diet being edited or added, including its ID, food name, calories, and carbs.We indicate initial state in lines 21-24
  const [editedDiet, setEditedDiet] = useState({
    id: null,
    food: "",
    calories: "",
    carbs: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      //if we are edit mode then it calls updatedDietMutation with the current values of editedDiet to update an existing diet.
      if (editMode) {
        await updatedDietMutation({
          variables: {
            id: editedDiet.id,
            food: editedDiet.food,
            calories: parseInt(editedDiet.calories),
            carbs: parseInt(editedDiet.carbs),
          },
        });
      } else {
        //this will handle the adding of a diet
        const { data } = await addDiet({
          variables: {
            food: editedDiet.food,
            calories: editedDiet.calories,
            carbs: editedDiet.carbs,
          },
        });
      }
      //reset editedDiet and editmode state once the form has been submitted
      //initial state is blank
      setEditedDiet({
        id: null,
        food: "",
        calories: "",
        carbs: "",
      });
      //edit mode is false
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedDiet({
      ...editedDiet,
      [name]: value,
    });
  };

  const handleEditClick = (diet) => {
    setEditedDiet({
      id: diet._id,
      food: diet.food,
      calories: diet.calories,
      carbs: diet.carbs,
    });
    setEditMode(true);
  };

  if (!diets.length) {
    return <h3>No Diets Yet</h3>;
  }

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          {editMode && (
            <div className="card mb-3">
              <h4 className="card-header bg-dark text-light p-2 m-0">
                <div>You are Editing {editedDiet.food}.</div>
                <form onSubmit={handleFormSubmit}>
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        name="food"
                        value={editedDiet.food}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        name="calories"
                        value={editedDiet.calories}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        name="carbs"
                        value={editedDiet.carbs}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="col">
                      <button type="submit">{editMode ? "Save" : "Add"}</button>
                    </div>
                  </div>
                </form>
              </h4>
            </div>
          )}
          {diets &&
            diets.map((diet) => (
              <div key={diet._id} className="card mb-3">
                <h4 className="card-header bg-light text-dark p-2 m-0">
                  <div className="row">
                    <div className="col">{diet.food}</div>
                    <div className="col">{diet.calories} cal</div>
                    <div className="col">{diet.carbs} g</div>
                    <div className="col">
                      <button onClick={() => handleEditClick(diet)}>
                        Edit
                      </button>
                    </div>
                  </div>
                </h4>
              </div>
            ))}
        </>
      ) : (
        <>
          {diets &&
            diets.map((diet) => (
              <div key={diet._id} className="card mb-3">
                <h4 className="card-header bg-light text-dark p-2 m-0">
                  <div className="row">
                    <div className="col">{diet.food}</div>
                    <div className="col">{diet.calories} cal</div>
                    <div className="col">{diet.carbs} g</div>
                    <div className="col">Login to Edit</div>
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

export default DietList;
