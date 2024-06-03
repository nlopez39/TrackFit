import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
//import the list of diet items
import DietList from "../components/DietList";
import WorkoutList from "../components/WorkoutList";
import ProgressList from "../components/ProgressList";

//TODO: Import the diet query; need to make one too
import { QUERY_WORKOUT } from "../utils/queries";
import Auth from "../utils/auth";
const Home = () => {
  //get username from utils function getProfile()
  const username = Auth.loggedIn() ? Auth.getProfile().data.username : null;
  const { loading, data, refetch } = useQuery(QUERY_WORKOUT);

  let totalCalories = 0;

  data?.workouts.forEach((workout) => {
    totalCalories += workout.caloriesBurned;
  });

  // const { loading: loadingUsers, data: dataUser } = useQuery(QUERY_USER, {
  //   //pass username as a variable to this query because its required in the query schema fro graphql
  //   variables: { username },
  // });

  return (
    <main className="container" style={{ backgroundColor: "#ffffff" }}>
      <h1
        className="text-left mb-4"
        style={{ fontSize: "50px", fontWeight: "Bold", color: "#343A40" }}
      >
        {Auth.loggedIn() ? `Welcome, ${username}!` : "Welcome to TrackFit!"}
      </h1>
      {Auth.loggedIn() ? (
        <div className="calories-burned row card gx-5 justify-content-center">
          <div className="col text-center">
            <h1 style={{ fontSize: "25px", fontWeight: "", color: "#ffffff" }}>
              🔥 Calories Burned: {totalCalories}
            </h1>
          </div>
        </div>
      ) : null}
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
                      <Link
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "white",
                          textShadow: "3px 3px 10px black",
                        }}
                        to="/workout"
                      >
                        SUMMER CHALLENGE 2024
                      </Link>
                    ) : (
                      <Link
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "white",
                          textShadow: "3px 3px 10px black",
                        }}
                        to="/signup"
                      >
                        SUMMER CHALLENGE 2024
                      </Link>
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
                  <h5
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "white",
                      textShadow: "2px 2px 6px black",
                    }}
                  >
                    Share workouts with Friends
                  </h5>
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
                      <Link
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "white",
                          textShadow: "2px 2px 6px black",
                        }}
                        to="/diet"
                      >
                        Log Your Meals
                      </Link>
                    ) : (
                      <Link
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "white",
                          textShadow: "2px 2px 6px black",
                        }}
                        to="/signup"
                      >
                        Log Your Meals
                      </Link>
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
            <WorkoutList />
          </div>
        </div>
      </div>
      <div className="row gx-5">
        <div className="col-lg-8 mb-4">
          <div className="">
            <DietList />
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="p-4 border rounded ">
            <ProgressList />
          </div>
        </div>
      </div>
      <div className="row gx-5">
        <div className="col mb-4 ">
          <button
            className="btn btn-primary homepage-button"
            style={{ background: "#0891b2" }}
          >
            <Link to="/workout" style={{ color: "white" }}>
              💪 Create a New Workout
            </Link>
          </button>
        </div>
        <div className="col mb-4">
          <button
            className="btn btn-primary homepage-button"
            style={{ background: "#0891b2" }}
          >
            <Link to="/diet" style={{ color: "white" }}>
              🍔 Add Meal
            </Link>
          </button>
        </div>
        <div className="col mb-4">
          <button
            className="btn btn-primary homepage-button"
            style={{ background: "#0891b2" }}
          >
            <Link to="/progress" style={{ color: "white" }}>
              🏆 Add Goal
            </Link>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
