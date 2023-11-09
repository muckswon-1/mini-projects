export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("lastState");

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("lastState", serializedState);
  } catch (error) {
    console.log(error);
  }
};
