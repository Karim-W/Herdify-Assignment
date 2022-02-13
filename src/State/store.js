import { createStore } from "redux";
import { v4 as uuidv4 } from "uuid";
function reducer(state = [], action) {
  switch (action.type) {
    case "add":
      let itemAdded = {
        id: state.length,
        name: action.name,
        note: action.note,
        status: action.status,
        timeAdded: new Date(),
        timeUpdated: new Date(),
        selected: false,
        key: uuidv4(),
      };
      return [...state, itemAdded];
    case "select":
      if (state[action.id]) {
        state[action.id].selected = !state[action.id].selected;
      } else {
        state[action.id].selected = false;
      }
      return [...state];
    case "removeSelected":
      return action.itemsToKeep;
    case "edit":
      const item = action.item;
      state[action.id] = {
        ...state[action.id],
        name: item.name,
        note: item.note,
        status: item.status,
        timeUpdated: new Date(),
      };
      return [...state];
    case "removeById":
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
}
const store = createStore(reducer);

export const addHandler = (name, note, status) => {
  store.dispatch({ type: "add", name, note, status });
};
export const removeHandler = () => {
  let itemsToKeep = store.getState().filter((item) => !item.selected);
  store.dispatch({ type: "removeSelected", itemsToKeep });
};
export const selectHandler = (id) => {
  store.dispatch({ type: "select", id });
};
export const editHandler = (id, item) => {
  store.dispatch({ type: "edit", id, item });
};
export const deleteItemHandler = (id) => {
  store.dispatch({ type: "removeById", id });
};
export const addDuplicateItemHandler = (item) => {
  const name = item.name;
  const note = item.note;
  const status = item.status;
  store.dispatch({ type: "add", name, note, status });
};
export const statusClickHandler = (item) => {
  if (item.status.toLowerCase() === "done") {
    deleteItemHandler(item.id);
  } else if (item.status.toLowerCase() === "todo") {
    let updatedItem = { ...item, status: "Done" };
    editHandler(item.id, updatedItem);
  }
};
export default store;
