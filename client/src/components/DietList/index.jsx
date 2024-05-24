import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_DIET } from "../../utils/mutations";
import { QUERY_DIET, QUERY_ME } from "../../utils/queries";
//import add Diet
//TODO:create a fumction to handle changes
//create a function to hanle the submit ans update the

const DietList = ({ diets }) => {
  const [addDiet, { error }] = useMutation(ADD_DIET, {
    refetchQueries: [QUERY_DIET, "getDiets", QUERY_ME, "me"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addDiet({
        variables: {
          food,
          calories,
          carbs,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "food" || name === "calories" || name === "carbs") {
    }
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
      {diets &&
        diets.map((diet) => (
          <div key={diet._id} className="card mb-3">
            <h4 className="card-header bg-dark text-light p-2 m-0">
              <div className="row">
                <div className="col">{diet.food}</div>
                <div className="col">{diet.calories} cal</div>
                <div className="col">{diet.carbs} g</div>
              </div>
            </h4>
          </div>
        ))}
    </div>
  );
};

export default DietList;
