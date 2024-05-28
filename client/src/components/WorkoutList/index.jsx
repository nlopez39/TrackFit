import { Link, useLocation } from "react-router-dom";

//I don't think we need to update a workout
const WorkoutList = ({ workouts }) => {
  const location = useLocation();
  return (
    <>
      <>
        <div className="row">
          <label className="col" style={{ marginLeft: "1rem" }}>
            My Schedule
          </label>
          {location.pathname !== "/workout" && (
            <label className="col mb-2" style={{ marginLeft: "14rem" }}>
              <Link to="/workout">View All</Link>
            </label>
          )}
        </div>
        <ul className="list-group list-group-horizontal-xxl">
          {workouts &&
            workouts.slice(0, 5).map((workout) => (
              <li key={workout._id} className="list-group-item bg-light mb-3">
                <div className="row" style={{ border: "2px" }}>
                  <div className="col" style={{ fontSize: "12px" }}>
                    {workout.exercise}
                  </div>
                  <div className="col" style={{ fontSize: "12px" }}>
                    {workout.workoutType}
                  </div>
                  <div className="col" style={{ fontSize: "12px" }}>
                    {workout.sets} sets
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </>
    </>
  );
};

export default WorkoutList;
