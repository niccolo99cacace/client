import React from "react";

const widgetNames = {
   a: "A",
   b: "B",
   c: "C",
   d: "D"
 };

export default function AddList({
  items,
  onRemoveItem,
  onAddItem,
  originalItems
}) {
  const handleChange = (e) => {
    if (e.target.checked) {
      onAddItem(e.target.name);
    } else {
      onRemoveItem(e.target.name);
    }
  };

  return (
    <React.Fragment>
      {originalItems.map((i) => (
        <div>
          {i}
          <input
            type="checkbox"
            checked={items.includes(i)}
            onChange={handleChange}
            name={i}
          />
        </div>
      ))}
      </React.Fragment>
  );
}
