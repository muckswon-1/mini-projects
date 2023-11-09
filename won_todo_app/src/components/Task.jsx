import React, { useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { completed, edited, removed } from "../provider/store";

function Task({ task }) {
  const deleteIcon = <XLg />;
  const [readonly, setReadonly] = useState("readonly");

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
  });

  const [isEditing, setIsEditing] = useState(false);

  const [isCompleted, setIsCompleted] = useState(task.completed);

  const [editIsDisabled, setEditIsDisabled] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeleteButtonClick = () => {
    dispatch(removed(task.id));
  };

  const handleEditButtonClick = () => {
    setReadonly("");
    setIsEditing(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleSaveButtonClick = () => {
    dispatch(
      edited({
        id: task.id,
        title: formData.title,
        description: formData.description,
      }),
    );
    setReadonly("readonly");
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    setIsCompleted((prevIsCompleted) => !prevIsCompleted);
    dispatch(
      completed({
        id: task.id,
        completed: !isCompleted,
      }),
    );

    setEditIsDisabled((prevIsDisabled) => !prevIsDisabled);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`${
        readonly === "readonly"
          ? "existing_task_form"
          : "existing_task_form_edit"
      } ${
        isCompleted
          ? "existing_task_form_completed"
          : "existing_task_form_pending"
      }`}
    >
      <div className="task_header">
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          type="text"
          readOnly={readonly}
          required
        ></input>
        <button onClick={handleDeleteButtonClick} className="delete">
          {deleteIcon}
        </button>
      </div>
      <textarea
        name="description"
        onChange={handleInputChange}
        value={formData.description}
        placeholder="Task Details ..."
        readOnly={readonly}
        required
      ></textarea>

      {isEditing ? (
        <div>
          <button onClick={handleSaveButtonClick} className="edit">
            Save
          </button>
        </div>
      ) : (
        <div className="check_btn_div">
          <input
            name="completed"
            checked={isCompleted}
            onChange={handleCheckboxChange}
            type="checkbox"
            className="completed"
          ></input>
          <button
            disabled={editIsDisabled}
            onClick={handleEditButtonClick}
            className="edit"
          >
            Edit
          </button>
        </div>
      )}
    </form>
  );
}

export default Task;
