import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_DIET } from "../../utils/mutations";

import Auth from "../../utils/auth";

const DietList = ({ diets }) => {
  //create an updatedDietMutation function to use UPDATE_DIET to update an existing diet entry
  const [updatedDietMutation] = useMutation(UPDATE_DIET);
  const [showForm, setShowForm] = useState(false);

  //state holds the current values for the diet being edited, including its ID, food name, calories, and carbs.We indicate initial state in lines 21-24
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
      // if (editMode) {
      await updatedDietMutation({
        variables: {
          id: editedDiet.id,
          food: editedDiet.food,
          calories: parseInt(editedDiet.calories),
          carbs: parseInt(editedDiet.carbs),
        },
      });
      // }
      //reset editedDiet and editmode state once the form has been submitted
      //initial state is blank
      setEditedDiet({
        id: null,
        food: "",
        calories: "",
        carbs: "",
      });
      // do not show form

      setShowForm(false);
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
    //show the form
    setShowForm(true);
  };

  if (!diets.length) {
    return <h3>No Diets Yet</h3>;
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
                      <label>Food</label>
                      <input
                        type="text"
                        name="food"
                        value={editedDiet.food}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="col">
                      <label>Calories</label>
                      <input
                        type="number"
                        name="calories"
                        value={editedDiet.calories}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="col">
                      <label>Carbs</label>
                      <input
                        type="number"
                        name="carbs"
                        value={editedDiet.carbs}
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

export default DietList;
