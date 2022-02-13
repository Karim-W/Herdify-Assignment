import "./App.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddNewItem from "./Components/Items/AddNewItem";
import React from "react";
import ItemsTable from "./Components/Items/Table";
import {
  addDuplicateItemHandler,
  addHandler,
  deleteItemHandler,
  editHandler,
  removeHandler,
  selectHandler,
  statusClickHandler,
} from "./State/store";
function App() {
  const tableHeaders = ["Name", "Note", "Status", "Selected", "Options"];
  React.useEffect(() => {
    window.addEventListener("dispatchRemoveSelected", (e) => {
      removeHandler();
    });
    window.addEventListener("dispatchAddHandler", (e) => {
      addHandler(e.detail.name, e.detail.note, e.detail.status);
    });
    window.addEventListener("dispatchSelectHandler", (e) => {
      selectHandler(e.detail.id);
    });
    window.addEventListener("dispatchEditHandler", (e) => {
      let item = e.detail.item.formValues;
      editHandler(e.detail.id, item);
    });
    window.addEventListener("dispatchDeleteById", (e) => {
      deleteItemHandler(e.detail.id);
    });
    window.addEventListener("duplicateItem", (e) => {
      addDuplicateItemHandler(e.detail.item);
    });
    window.addEventListener("statusClicked", (e) => {
      statusClickHandler(e.detail.item);
    });
  }, []);

  return (
    <Container className="pt-8">
      <h1 onClick={() => addHandler("rer", "rere", "rere")}>
        Interview Question
      </h1>
      <div className="flex flex-row w-full justify-between">
        <AddNewItem />
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("dispatchRemoveSelected"))
          }
          className="px-4 py-2 text-sm font-medium text-white bg-red-700 rounded-md  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-45"
        >
          Remove Items
        </button>
      </div>
      <ItemsTable headers={tableHeaders} />
    </Container>
  );
}

export default App;
