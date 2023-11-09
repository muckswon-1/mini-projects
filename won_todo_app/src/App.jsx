import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import { useSelector } from "react-redux";

function App() {
  let todos = useSelector((state) => state.todos);

  const [year] = useState(new Date().getFullYear());
  const [isOpenTaskForm, setIsOpenTaskForm] = useState(false);
  const [onlyCompleted, setOnlyCompleted] = useState(false);

  const showCompleted = () => {
    const onlyCompletedTasks = todos.filter((task) => {
      return task.completed === true;
    });

    if (!onlyCompletedTasks || onlyCompletedTasks.length === 0) {
      return [];
    }

    return onlyCompletedTasks;
  };

  const handleAddTaskClick = () => {
    setIsOpenTaskForm(true);
  };

  const handleOnlyCompletedClick = () => {

    setOnlyCompleted((prevCompleted) => !prevCompleted);
  };

  const allTasksComponent = () => {
    return (
      <div className={`task_list ${isOpenTaskForm ? "close" : ""}`}>
        {todos.length !== 0 && todos instanceof Array ? (
          todos.map((todo) => {
            return <Task key={todo.id} task={todo} />;
          })
        ) : (
          <p>You do not have any tasks to do.</p>
        )}
      </div>
    );
  };

  const completedTasksComponent = () => {
    const completedTasks = showCompleted();

    return (
      <div className={`task_list ${isOpenTaskForm ? "close" : ""}`}>
        {completedTasks.length !== 0 ? (
          completedTasks.map((todo) => {
            return <Task key={todo.id} task={todo} />;
          })
        ) : (
          <p>You are yet to complete any Tasks.</p>
        )}
      </div>
    );

  };

  return (
    <>
      <header>
        <h1>Todo App</h1>
        <p>Click on the button below to add a new task.</p>
        <div className="all_completed_btn_div">
          <button onClick={handleAddTaskClick} className="btn">
            Add Task
          </button>

          {onlyCompleted ? (
            <button
              onClick={() => {
                setOnlyCompleted((prevCompletedTask) => !prevCompletedTask);
              }}
            >
              Show All
            </button>
          ) : (
            <button onClick={handleOnlyCompletedClick}>Show completed</button>
          )}
        </div>
      </header>

      <main
        className={`${isOpenTaskForm ? "hide_task_list" : "show_task_list"}`}
      >

        {!onlyCompleted ? allTasksComponent() : completedTasksComponent()}


        <TaskForm
          setIsOpenTaskForm={setIsOpenTaskForm}
          isOpenTaskForm={isOpenTaskForm}
        ></TaskForm>
      </main>

      <footer>
        <p>&copy;{year} Cyril Mukabwa</p>
      </footer>
    </>
  );
}

export default App;
