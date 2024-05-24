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
      <div>
        <DietList diets={diets} />
      </div>
    </main>
  );
};

export default Home;
