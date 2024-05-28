//This will hold the different workouts a user can do
import { useQuery } from "@apollo/client";
import { QUERY_WORKOUT } from "../utils/queries";
import WorkoutList from "../components/WorkoutList";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
export default function Workout() {
  const { loading, data } = useQuery(QUERY_WORKOUT);
  const workouts = data?.workouts || [];
  return (
    <>
      {Auth.loggedIn() ? (
        <WorkoutList workouts={workouts} />
      ) : (
        <Link to="/login">You need to login or signup first </Link>
      )}
    </>
  );
}
