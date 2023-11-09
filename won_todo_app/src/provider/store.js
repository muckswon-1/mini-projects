import { createSlice, configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./actions";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    added: (state, action) => {
      state.todos.push(action.payload);
      state.todos.sort((a, b) => {
        return b.addedTime - a.addedTime;
      });
    },
    removed: (state, action) => {
      state.todos = state.todos.filter((task) => {
        return action.payload !== task.id;
      });
      state.todos.sort((a, b) => {
        return b.addedTime - a.addedTime;
      });
    },
    edited: (state, action) => {
      // console.log(taskToEdit);

      console.log(action.payload.id);
      const taskToEdit = state.todos.find((task) => {
        return task.id === action.payload.id;
      });

      const remainingTasks = state.todos.filter((task) => {
        return task.id !== taskToEdit.id;
      });

      taskToEdit.title = action.payload.title;
      taskToEdit.description = action.payload.description;

      remainingTasks.push(taskToEdit);

      state.todos = remainingTasks.sort((a, b) => {
        return b.addedTime - a.addedTime;
      });
    },
    completed: (state, action) => {
      const taskToSetCompleted = state.todos.find((task) => {
        return task.id === action.payload.id;
      });

      const remainingTasks = state.todos.filter((task) => {
        return task.id !== taskToSetCompleted.id;
      });
      console.log(action.payload.completed);

      taskToSetCompleted.completed = action.payload.completed;
      remainingTasks.push(taskToSetCompleted);

      state.todos = remainingTasks.sort((a, b) => {
        return b.addedTime - a.addedTime;
      });
    },
  },
});

export const { added, removed, edited, completed, onlyCompletedTasks } =
  todoSlice.actions;

const persistedState = loadState();

const store = configureStore({
  reducer: todoSlice.reducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  console.log(store.getState());
  saveState(store.getState());

});



export default store;
