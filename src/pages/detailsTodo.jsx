import React from "react";
import { useParams } from "react-router-dom";
const DetailsTodo = () => {
  const { id } = useParams();
  const [singleTodo, setSingleTodo] = React.useState({
    title: "",
    description: "",
    status: false,
  });
  let { title, description, status } = singleTodo;
  console.log(singleTodo);
  React.useEffect(() => {
    getAndStoreSingle();
  }, []);
  const getAndStoreSingle = () => {
    fetch(`http://localhost:8080/todo/${id}`)
      .then((res) => res.json())
      .then((res) => setSingleTodo(res))
      .catch((err) => console.log(err));
  };
  const handleChangeStatus = () => {
    fetch(`http://localhost:8080/todo/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: !status,
      }),
      headers: { "content-type": "application/json" },
    }).then(() => getAndStoreSingle());
  };
  return (
    <div className="containerOfSingleTask">
      <h1>{title}</h1>
      <h3 style={{ margin: "0px", fontFamily: "cursive" }}>{description}</h3>
      <h3 style={status ? { color: "green" } : { color: "red" }}>
        {status ? "Completed" : "Pending"}
      </h3>
      {status ? (
        <button onClick={handleChangeStatus} className="pendingBtn">
          Mark As Pending
        </button>
      ) : (
        <button onClick={handleChangeStatus} className="doneBtn">
          Mark As Completed
        </button>
      )}
    </div>
  );
};

export default DetailsTodo;
