import React from "react";
import { FaFolderOpen, FaTrashAlt } from "react-icons/fa";
import { BiCalendarCheck, BiCalendarX } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { getTodoAndAdd, handleDelete } from "../Redux/action";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [todoInput, setTotoInput] = React.useState({
    title: "",
    description: "",
  });
  const { title, description } = todoInput;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let { name, value } = e.target;
    setTotoInput((prev) => {
      return { ...prev, [name]: value };
    });
  };
  React.useEffect(() => {
    dispatch(getTodoAndAdd());
  }, []);

  const isLoginOrNot = useSelector((state) => state.islogin);
  const listArr = useSelector((state) => state.todo);

  const handleAddTodo = () => {
    if (title === "" || description === "") {
      alert("Please enter a title and description");
    } else {
      fetch("http://localhost:8080/todo", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
          status: false,
        }),
        headers: { "content-type": "application/json" },
      }).then(() => dispatch(getTodoAndAdd()));
    }
  };
  const userStatus = localStorage.getItem("loginKey");
  React.useEffect(() => {
    if (!isLoginOrNot && userStatus !== "true") {
      navigate("/login");
      return;
    }
  }, []);
  return (
    <div className="AddTodoForm">
      <h1>Add New Task</h1>
      <input
        type="text"
        name="title"
        value={title}
        placeholder="Enter your task name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={description}
        placeholder="Enter your task details"
        onChange={handleChange}
      />
      <button onClick={handleAddTodo}>Add</button>
      <table>
        <thead>
          <tr>
            <th>Task</th>

            <th>Status</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {listArr.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.title.slice(0, 25)}...</td>

                <td>
                  {item.status ? (
                    <BiCalendarCheck color="green" />
                  ) : (
                    <BiCalendarX color="red" />
                  )}
                </td>
                <td>
                  <Link to={`/${item.id}`}>
                    <FaFolderOpen color="blue" cursor="pointer" />
                  </Link>
                </td>
                <td>
                  <FaTrashAlt
                    color="red"
                    cursor="pointer"
                    onClick={() => dispatch(handleDelete(item.id))}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
