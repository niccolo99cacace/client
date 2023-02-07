import React, { useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

//  total body water    and   fat free mass (massa magra)
function TbwFfm(props) {


  return (
    <React.Fragment>


      {props.tbwFfm && (
        <React.Fragment>
          <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
          <p>Tbw and ffm values</p>
          <p>Tbw and ffm values</p>
          </Box>
          <ResponsiveContainer width="100%" height={150}>
          <AreaChart
            data={props.patientTbwFfm}
            syncId="anyId"
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="birthString" />
            <YAxis type="number" domain={[20, 70]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="tbw"
              stroke="#8884d8"
              fill="#8884d8"
            />
            
          </AreaChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={150}>
          <AreaChart
            width="100%"
            height="50%"
            data={props.patientTbwFfm1}
            syncId="anyId"
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="birthString" />
            <YAxis type="number" domain={[40, 90]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="ffm"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
          </ResponsiveContainer>
          </Box>

        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default TbwFfm;
