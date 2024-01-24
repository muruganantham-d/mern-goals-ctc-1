import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import { getGoal, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state.auth "state la irunthu entha reducer venumo atha  condu varanum"
  const { user } = useSelector((state) => state.auth);
  const { goals, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getGoal());
    // Component unmount akumpothu exicute aakum
    return () => dispatch(reset());
  }, [user, isError, dispatch, message, getGoal, reset]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dasboard</p>
      </section>
      <GoalForm />

      <section className="content">
        {goals.length === 0 ? (
          <h3>There is no goals created</h3>
        ) : (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal}/>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
