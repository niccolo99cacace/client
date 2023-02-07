import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

// BUN CHART
//Sodium Bld-sCnc  -  Glucose Bld-mCnc  -  BUN Bld-mCnc  -  Calcium Bld-mCnc

export default function BunCharts(props) {
  return (
    <Paper style={{ height: "100%", width: "100%" }}>
      <Box sx={{ height: "8%", display: "flex", flexDirection: "row" }}>
        <Typography variant="body 2" sx={{ flexGrow: 1 }}>
          BLOOD ANALYSIS
        </Typography>

        <IconButton
          color="secondary"
          onClick={props.booleanBunChart}
          size="small"
        >
          <ClearIcon fontSize="small" sx={{ color: red[700] }} />
        </IconButton>
      </Box>

      <ResponsiveContainer height="92%">
        <ComposedChart data={props.dataClinicalAnalysis}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="birthString" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="Sodium Bld-sCnc"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey="Glucose Bld-mCnc" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="BUN Bld-mCnc" stroke="#ff7300" />
          <Scatter dataKey="Calcium Bld-mCnc" fill="red" />
        </ComposedChart>
      </ResponsiveContainer>
    </Paper>
  );
}
