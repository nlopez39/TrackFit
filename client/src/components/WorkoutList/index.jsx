import Auth from "../../utils/auth";

//I don't think we need to update a workout
const WorkoutList = ({ workouts }) => {
  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <div className="row">
            <label className="col">My Schedule</label>
            <label className="col">View All</label>
          </div>

          <ul className="list-group list-group-horizontal-xxl">
            {workouts &&
              workouts.slice(0, 5).map((workout) => (
                <li key={workout._id} className="list-group-item bg-light">
                  <div className="row">
                    <div className="col">{workout.exercise}</div>
                    <div className="col">{workout.workoutType}</div>
                    <div className="col">{workout.sets}</div>
                  </div>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <>
          <div className="row">
            <label className="col">My Schedule</label>
            <label className="col">View All</label>
          </div>
          <ul className="list-group list-group-horizontal-xxl">
            {workouts &&
              workouts.slice(0, 5).map((workout) => (
                <li key={workout._id} className="list-group-item bg-light">
                  <div className="row">
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
      )}
    </>
  );
};

export default WorkoutList;
