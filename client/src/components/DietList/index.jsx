import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
//useQuery is used to fetch data from the server
import { QUERY_DIET, QUERY_ME } from "../../utils/queries";
import { UPDATE_DIET, REMOVE_DIET, ADD_DIET } from "../../utils/mutations";
import { Link, useLocation } from "react-router-dom";

import Auth from "../../utils/auth";

const DietList = () => {
  //this is fetching the diet data from the QUERY_DIET
  const { loading, data, refetch } = useQuery(QUERY_DIET);

  //delete diet
  const [deleteDiet] = useMutation(REMOVE_DIET, {
    //get the latest data after updated
    refetchQueries: [QUERY_DIET, "getDiets", QUERY_ME, "me"],
  });

  //create an updatedDietMutation function to use UPDATE_DIET to update an existing diet entry
  const [updatedDietMutation] = useMutation(UPDATE_DIET);
  //will allow us to edit by list item
  const [editingDietId, setEditingDietId] = useState(null);
  //tells us what page we are on so that I can remove the "View All" link
  const location = useLocation();
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
      setEditingDietId(null);
      // do not show form
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
    //set the id of the current item
    setEditingDietId(diet._id);
  };

  //delete diet handler
  const handleDeleteClick = async (_id) => {
    try {
      //this will send a mutation request to delete this specific item from the server
      // await deleteDiet({ variables: { _id } });
      const { data } = await deleteDiet({ variables: { _id } });
      // console.log(data);

      //after its successfully deleted we want to update local state with this
      // //filter method creates a new array that excludes the deleted diet entry which is filtered by the matchng _id
      // setDiets(diets.filter((diet) => diet._id !== data.removeDiet._id));
    } catch (err) {
      console.log(err);
    }
  };
  //adding a diet function :
  //state that holds the current values for the diet being added, in this case they are empty initiial values
  const [inputDiet, setInputDiet] = useState({
    food: "",
    calories: "",
    carbs: " ",
  });
  //with the use of state you can either show the form or not
  const [showAddForm, setShowAddForm] = useState(false);
  //This line uses the useMutation hook to create a function (addDiet) for performing the ADD_DIET mutation. It also sets up refetching of queries QUERY_DIET and QUERY_ME after the mutation completes to ensure the UI is updated with the latest data.
  const [addDiet, { error }] = useMutation(ADD_DIET, {
    refetchQueries: [QUERY_DIET, "getDiets", QUERY_ME, "me"],
  });

  const handleFormSubmitAdd = async (event) => {
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
      console.log(data);

      setInputDiet({
        food: "",
        calories: "",
        carbs: "",
      });
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeAdd = (event) => {
    const { name, value } = event.target;

    setInputDiet({
      ...inputDiet,
      [name]: value,
    });
  };
  // if (!data?.diets.length) {
  //   return <h3>No Diets Yet</h3>;
  // }

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <div className="">
            <h4 className="card-header">
              <div className="row">
                <div className="col">My Diet</div>

                <div className="col">
                  {location.pathname !== "/diet" && (
                    <Link to="view-all /diet">View All</Link>
                  )}
                </div>
                {data?.diets.filter((diet) => !diet.completed).length === 0 ? (
                  <p>No Meals Yet</p>
                ) : null}
              </div>
            </h4>
          </div>

          {data?.diets.map((diet) => (
            <div key={diet._id} className="list-style card mb-3">
              <h4 className="card-header text-dark">
                <div className="row">
                  {editingDietId === diet._id ? (
                    <form onSubmit={handleFormSubmit}>
                      <div className="col">
                        <input
                          type="text"
                          name="food"
                          value={editedDiet.food}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          name="calories"
                          value={editedDiet.calories}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          name="carbs"
                          value={editedDiet.carbs}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col">
                        <button type="submit">Save</button>
                        <button
                          type="button"
                          onClick={() => setEditingDietId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="col">{diet.food}</div>
                      <div className="col">{diet.calories} cal</div>
                      <div className="col">{diet.carbs}g Carbs</div>
                      <div className="col">
                        {location.pathname !== "/" && (
                          <>
                            <button onClick={() => handleEditClick(diet)}>
                              Edit
                            </button>
                            <button onClick={() => handleDeleteClick(diet._id)}>
                              Delete
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
            <div className="col">
              {showAddForm && (
                <div className="card mb-3">
                  <h4 className="card-header bg-light text-dark p-2 m-0">
                    <form onSubmit={handleFormSubmitAdd}>
                      <div className="row">
                        <div className="col">
                          <label>Food</label>
                          <input
                            type="text"
                            name="food"
                            value={inputDiet.food}
                            onChange={handleChangeAdd}
                          ></input>
                        </div>
                        <div className="col">
                          <label>Calories</label>
                          <input
                            type="number"
                            name="calories"
                            value={inputDiet.calories}
                            onChange={handleChangeAdd}
                          ></input>
                        </div>
                        <div className="col">
                          <label>Carbs</label>
                          <input
                            type="number"
                            name="carbs"
                            value={inputDiet.carbs}
                            onChange={handleChangeAdd}
                          ></input>
                        </div>
                        <div className="col">
                          <button type="submit">Save</button>
                          <button
                            type="cancel"
                            onClick={() => setShowAddForm(false)}
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
          {location.pathname !== "/" && (
            <button
              className="btn btn-secondary"
              onClick={() => setShowAddForm(true)}
            >
              Add Item
            </button>
          )}
        </>
      ) : (
        <>
          <div className="">
            <h4 className="card-header">
              <div className="row">
                <div className="col">Diet</div>
                <div className="col">
                  {location.pathname !== "/diet" && (
                    <Link style={{textAlign:"right"}} to="/diet">View All</Link>
                  )}
                </div>
              </div>
            </h4>
          </div>
          {data?.diets &&
            data?.diets.map((diet) => (
              <div key={diet._id} className="card mb-3">
                <h4 className="card-header bg-light text-dark p-2 m-0">
                  <div className="row">
                    <div className="col">{diet.food}</div>
                    <div className="col">{diet.calories} cal</div>
                    <div className="col">{diet.carbs}g Carbs</div>
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
