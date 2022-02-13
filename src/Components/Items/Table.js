import React from "react";
import { Table } from "react-bootstrap";
import store from "../../State/store";
import Options from "./Options";

export default function ItemTable({ id, headers }) {
  // const [headers, setHeaders] = React.useState(headers);
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    store.subscribe(() => {
      setItems(store.getState());
    });
  }, [items]);
  //#region Functions
  const statusStyler = (status) => {
    switch (status.toLowerCase()) {
      case "to-do":
        return "bg-red-600";
      case "doing":
        return "bg-yellow-400";
      case "done":
        return "bg-green-400";
      default:
        return "bg-blue-400";
    }
  };
  //#endregion
  const handler = (id) => {
    window.dispatchEvent(
      new CustomEvent("dispatchSelectHandler", { detail: { id } })
    );
  };

  return (
    <>
      <Table striped bordered hover className="mt-8">
        <thead>
          <tr>
            {headers.map((header, idx) => {
              return (
                <th
                  key={idx}
                  className={`bg-black text-white ${
                    idx === 0
                      ? "rounded-tl-lg"
                      : idx === headers.length - 1
                      ? "rounded-tr-lg"
                      : "null"
                  }`}
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {items
            .sort((a, b) => (a.timeUpdated > b.timeUpdated ? 1 : -1))
            .map((item, index) => {
              return (
                <tr key={item.key}>
                  <td width={"30%"}>{item.name}</td>
                  <td width={"30%"}>{item.note}</td>
                  <td className="flex flex-row justify-center">
                    <button
                      onClick={() =>
                        window.dispatchEvent(
                          new CustomEvent("statusClicked", { detail: { item } })
                        )
                      }
                      className={
                        statusStyler(item.status) +
                        " text-white p-2 rounded-md shadow-md drop-shadow-sm hover:scale-105"
                      }
                    >
                      {item.status}
                    </button>
                  </td>
                  <td>
                    <div className="flex h-full flex-row justify-center items-center mt-2">
                      <input
                        key={item.key}
                        type={"checkbox"}
                        value={item.selected}
                        onClick={() => {
                          handler(item.id);
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <Options item={item} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {items.length === 0 ? (
        <div className="w-full flex flex-row justify-center">
          no items to show
        </div>
      ) : null}
    </>
  );
}
