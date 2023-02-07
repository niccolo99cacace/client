import React from "react";
import XcAndFmLevel from "../Charts/XcAndFmLevel";
import LateralBar from "../LateralBar";
import TbwFfm from "../Charts/TbwFfm";
import Aaa from "../../GridLayout";


const widgetNames = {
  a: "A",
  b: "B",
  c: "C",
  d: "D"
};
export default function Widget({ id, onRemoveItem }) {
  return (
    <div style={{ background: "white" }}>
      <div>
        
        1237
        {widgetNames[id]}
      </div>
      <button aria-label="delete" onClick={() => onRemoveItem(id)}>
        close
      </button>
      <Aaa></Aaa>
 
    </div>
  );
}
