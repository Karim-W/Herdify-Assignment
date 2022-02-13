import React from "react";

export default function CheckBox({ selected, id }) {
  const checkboxRef = React.useRef("");
  const [checkbox, setCheckbox] = React.useState(selected);
  const handleChange = (e) => {
    setCheckbox(checkbox);
    handler(id);
  };
  const handler = (id) => {
    window.dispatchEvent(
      new CustomEvent("dispatchSelectHandler", { detail: { id } })
    );
  };

  return <input type="checkbox" ref={checkboxRef} onChange={handleChange} />;
}
