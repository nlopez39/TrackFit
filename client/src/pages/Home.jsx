import { useQuery } from "@apollo/client";
//import the list of diet items
import DietList from "../components/DietList";

//TODO: Import the diet query; need to make one too
import { QUERY_DIET } from "../utils/queries";
const Home = () => {
  const { loading, data } = useQuery(QUERY_DIET);
  const diets = data?.diets || [];

  return (
    <main className="container mt-4">
      <h1 className="text-center mb-4">Welcome!</h1>
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="p-4 border rounded bg-light">
            Calendar/Chart will go here
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="p-4 border rounded bg-light">
            list of workouts will go to the right side
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="">
            <DietList diets={diets} />
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="p-4 border rounded bg-light">
            List of goals will go here
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
