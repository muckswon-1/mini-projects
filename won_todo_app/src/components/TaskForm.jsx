import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { added } from "../provider/store";

export default function TaskForm({ isOpenTaskForm, setIsOpenTaskForm }) {
  const inialFormSate = {
    title: "",
    description: "",
  };

  const [formData, setFormData] = useState(inialFormSate);

  const formRef = useRef(null);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const clearForm = () => {
    setFormData(inialFormSate);
    const form = formRef.current;
    console.log(form);
  form.reset();
  Array.from(form.elements).forEach((element) => {
    if (element.nodeName === "INPUT") {
      element.value = "";
    }
  });
  };

  const handleAddTaskButtonClick = () => {
    const newTaskId = uuidv4();
    const newTask = { ...formData };
    newTask.id = newTaskId;
    newTask.addedTime = new Date().getTime();
    newTask.completed = false;
    dispatch(added(newTask));

    setIsOpenTaskForm(false);

        clearForm();
  };

  return (
    <form ref={formRef}
      onSubmit={handleFormSubmit}
      className={`newTaskForm ${isOpenTaskForm ? "open" : "close"}`}
      action=""
    >
      <input
        name="title"
        onChange={handleInputChange}
        type="text"
        placeholder="Task Name"
        required
      ></input>
      <textarea
        name="description"
        onChange={handleInputChange}
        rows={7}
        placeholder="Task Details ..."
        required
      ></textarea>
      <div className="submit_close_btns_div">
        <button
          onClick={() => {
            setIsOpenTaskForm(false);
          }}
          className="btn"
        >
          Close
        </button>
        <button onClick={handleAddTaskButtonClick} className="btn">
          Submit
        </button>
      </div>
    </form>
  );
}
