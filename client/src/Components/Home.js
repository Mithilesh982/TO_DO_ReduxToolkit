// components/Home.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksAsync,
  createTaskAsync,
  completeTaskReducer,
  deleteTaskAsync,
  deleteAllTasksAsync,
  updateTaskAsync,
} from "../store/slices/TaskSlice";

function Home() {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editStart, setEditStart] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  const AddTask = () => {
    if (taskName && taskDescription) {
      dispatch(
        createTaskAsync({
          name: taskName,
          description: taskDescription,
          complete: false,
        })
      );
      setTaskDescription("");
      setTaskName("");
    } else {
      alert("Please enter both task name and its description");
    }
  };

  const TaskCompletebtn = (id) => {
    dispatch(completeTaskReducer(id));
  };

  const DeleteTaskBtn = (id) => {
    dispatch(deleteTaskAsync(id));
  };

  const UpdateTask = (id, currentTaskName, currentTaskDescription) => {
    const newName = editTaskName || currentTaskName;
    const newDescription = editDescription || currentTaskDescription;
    dispatch(updateTaskAsync({ id, name: newName, description: newDescription }));
    setEditStart(false);
    setEditTaskId(null);
    setEditTaskName("");
    setEditDescription("");
  };

  const tasks = useSelector((state) => state.task.tasks);
  const loading = useSelector((state) => state.task.loading);
  const error = useSelector((state) => state.task.error);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div
        className="container-fluid m-0 p-5 d-flex flex-column justify-content-start align-items-center"
        style={{ backgroundColor: "black", minHeight: "100vh" }}
      >
        <h1 className="text-light">My Todos</h1>
        <div className="container p-5">
          <div className="p-3 my-1 mb-4 border border-0 rounded bg-dark text-light d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex gap-5">
              <div>
                <label htmlFor="TaskName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="TaskName"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="Description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>
            </div>
            <div
              className="btn btn-outline-warning text-light"
              onClick={AddTask}
            >
              Add Task
            </div>
          </div>
          <div className="bg-dark mt-1 border border-0 rounded px-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="">
                  <h1 className="text-warning">
                    {task.complete ? (
                      <del>{task.name}</del>
                    ) : editStart && editTaskId === task.id ? (
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setEditTaskName(e.target.value)}
                        defaultValue={task.name}
                      />
                    ) : (
                      task.name
                    )}
                  </h1>
                  <p className="text-light">
                    {task.complete ? (
                      <del>{task.description}</del>
                    ) : editStart && editTaskId === task.id ? (
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setEditDescription(e.target.value)}
                        defaultValue={task.description}
                      />
                    ) : (
                      task.description
                    )}
                  </p>
                </div>
                <div className="d-flex gap-4">
                  {!task.complete && (
                    <>
                      {editStart && editTaskId === task.id ? (
                        <div
                          className="btn btn-outline-warning"
                          onClick={() =>
                            UpdateTask(task.id, task.name, task.description)
                          }
                        >
                          Update
                        </div>
                      ) : (
                        <div
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            setEditStart(true);
                            setEditTaskId(task.id);
                          }}
                        >
                          Edit
                        </div>
                      )}
                      <div
                        className="btn btn-outline-success"
                        onClick={() => TaskCompletebtn(task.id)}
                      >
                        Complete
                      </div>
                    </>
                  )}
                  <div
                    className="btn btn-outline-danger"
                    onClick={() => DeleteTaskBtn(task.id)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-end align-items-center">
            {tasks.length !== 0 ? (
              <div
                className="btn btn-outline-danger text-light mt-4"
                onClick={() => dispatch(deleteAllTasksAsync())}
              >
                Delete All
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
