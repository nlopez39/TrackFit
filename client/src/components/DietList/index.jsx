import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_DIET, UPDATE_DIET } from "../../utils/mutations";
import { QUERY_DIET, QUERY_ME } from "../../utils/queries";

//create a function to handle the submit ans update the
//TODO: create a funciton to handle adding a diet
const DietList = ({ diets }) => {
  const [updatedDietMutation] = useMutation(UPDATE_DIET);
  const [editMode, setEditMode] = useState(false);
  const [editedDiet, setEditedDiet] = useState({
    id: null,
    food: "",
    calories: "",
    carbs: "",
  });
  const [addDiet, { error }] = useMutation(ADD_DIET, {
    refetchQueries: [QUERY_DIET, "getDiets", QUERY_ME, "me"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
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
        const { data } = await addDiet({
          variables: {
            food: editedDiet.food,
            calories: editedDiet.calories,
            carbs: editedDiet.carbs,
          },
        });
      }
      //reset editedDiet and editmode state
      setEditedDiet({
        id: null,
        food: "",
        calories: "",
        carbs: "",
      });
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
      {/* {showTitle && <h3>{title}</h3>} */}
      <div className="row">
        <div className="col">Food Item</div>
        <div className="col">Calories</div>
        <div className="col">Carbs</div>
      </div>
      {editMode && (
        <div className="card mb-3">
          <h4 className="card-header bg-dark text-light p-2 m-0">
            <div>
              You are Editing {editedDiet.food}. Save to see the changes below
            </div>
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
            <h4 className="card-header bg-dark text-light p-2 m-0">
              <div className="row">
                <div className="col">{diet.food}</div>
                <div className="col">{diet.calories} cal</div>
                <div className="col">{diet.carbs} g</div>
                <div className="col">
                  <button onClick={() => handleEditClick(diet)}>Edit</button>
                </div>
              </div>
            </h4>
          </div>
        ))}
    </div>
  );
};

export default DietList;
