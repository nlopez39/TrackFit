import { useQuery } from "@apollo/client";
//import the list of diet items
import DietList from "../components/DietList";
import { QUERY_USER } from "../utils/queries";

//TODO: Import the diet query; need to make one too
import { QUERY_DIET } from "../utils/queries";
import Auth from "../utils/auth";
const Home = () => {
  //get username from utils function getProfile()
  const username = Auth.loggedIn() ? Auth.getProfile().data.username : null;
  const { loading: loadingDiets, data: dataDiet } = useQuery(QUERY_DIET);
  const { loading: loadingUsers, data: dataUser } = useQuery(QUERY_USER, {
    //pass username as a variable to this query because its required in the query schema fro graphql
    variables: { username },
  });

  const diets = dataDiet?.diets || [];
  const welcomeUsername = dataUser?.user?.username || "";
  console.log(dataUser);

  return (
    <main className="container mt-4">
      <h1 className="text-center mb-4">
        {Auth.loggedIn() ? `Welcome, ${welcomeUsername}!` : "Welcome!"}
      </h1>
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
