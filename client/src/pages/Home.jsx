import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
//import the list of diet items
import DietList from "../components/DietList";
import WorkoutList from "../components/WorkoutList";

//TODO: Import the diet query; need to make one too
import { QUERY_DIET, QUERY_WORKOUT, QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
const Home = () => {
  //get username from utils function getProfile()
  const username = Auth.loggedIn() ? Auth.getProfile().data.username : null;
  const { loading: loadingDiets, data: dataDiet } = useQuery(QUERY_DIET);
  const { loading: loadingWorkouts, data: dataWorkout } =
    useQuery(QUERY_WORKOUT);
  const { loading: loadingUsers, data: dataUser } = useQuery(QUERY_USER, {
    //pass username as a variable to this query because its required in the query schema fro graphql
    variables: { username },
  });

  const diets = dataDiet?.diets || [];
  const workouts = dataWorkout?.workouts || [];
  const welcomeUsername = dataUser?.user?.username || "";

  return (
    <main className="container mt-4">
      <h1 className="text-center mb-4">
        {Auth.loggedIn() ? `Welcome, ${username}!` : "Welcome to TrackFit!"}
      </h1>
      <div className="row gx-5">
        <div className="col-lg-6 mb-4">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="./summerWorkoutchallenge.jpeg"
                  className="d-block w-100"
                  alt="Summer Workout Challenge"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>
                    {Auth.loggedIn() ? (
                      <Link to="/diet">SUMMER CHALLENGE 2024</Link>
                    ) : (
                      <Link to="/signup">SUMMER CHALLENGE 2024</Link>
                    )}
                  </h5>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="./friendWorkout.webp"
                  className="d-block w-100"
                  alt="Friend Workout"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Share workouts with Friends</h5>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="./meals.jpeg"
                  className="d-block w-100"
                  alt="Summer Workout Challenge"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>
                    {Auth.loggedIn() ? (
                      <Link to="/diet">Log Your Meals</Link>
                    ) : (
                      <Link to="/signup">Log Your Meals</Link>
                    )}
                  </h5>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div>
            <WorkoutList workouts={workouts} />
          </div>
        </div>
      </div>
      <div className="row gx-5">
        <div className="col-lg-8 mb-4">
          <div className="">
            <DietList diets={diets} />
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="p-4 border rounded bg-light">
            LIST OF GOALS WILL GO HERE
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
