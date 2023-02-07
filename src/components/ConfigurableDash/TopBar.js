import React from "react";
import AddList from "./AddList";

export default function TopBar({
  onLayoutSave,
  items,
  onRemoveItem,
  onAddItem,
  originalItems
}) {
  return (
    <div>
      <AddList
        items={items}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        originalItems={originalItems}
      />
      <button aria-label="save" onClick={onLayoutSave}>
        save{" "}
      </button>
    </div>
  );
}
