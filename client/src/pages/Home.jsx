import { useQuery } from "@apollo/client";
//import the list of diet items
import DietList from "../components/DietList";

//TODO: Import the diet query; need to make one too
import { QUERY_DIET } from "../utils/queries";
const Home = () => {
  const { loading, data } = useQuery(QUERY_DIET);
  const diets = data?.diets || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <DietList diets={diets} />
        </div>
      </div>
    </main>
  );
};

export default Home;
