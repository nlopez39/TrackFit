import { Link } from "react-router-dom";

const DietList = ({ diets }) => {
  if (!diets.length) {
    return <h3>No Diets Yet</h3>;
  }

  return (
    <div>
      {/* {showTitle && <h3>{title}</h3>} */}
      {diets &&
        diets.map((diet) => (
          <div key={diet._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              <ul>
                <li>{diet.food}</li>
                <li>{diet.calories}</li>
                <li>{diet.carbs}</li>
              </ul>
            </h4>
          </div>
        ))}
    </div>
  );
};

export default DietList;
