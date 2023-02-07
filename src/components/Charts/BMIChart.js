import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
} from "recharts";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

// BMI CHART
//BP sys(SYSTOLIC BLOOD PRESSURE)  -  BMI(BIOELETRICAL IMPENDANCE ANALYSIS)  -  BP dias(DIASTOLIC BLOOD PRESSURE)

export default function BMIChart(props) {
  return (
    <Paper style={{ height: "100%", width: "100%" }}>
      <Box sx={{ height: "8%", display: "flex", flexDirection: "row" }}>
        <Typography variant="body 2" sx={{ flexGrow: 1 }}>
        BIOELETRICAL IMPENDANCE ANALYSIS
        </Typography>

        <IconButton
          color="secondary"
          onClick={props.booleanBMIChart}
          size="small"
        >
          <ClearIcon fontSize="small" sx={{ color: red[700] }} />
        </IconButton>
      </Box>

      <ResponsiveContainer height="92%">
        <ComposedChart
          layout="vertical"
          data={props.dataClinicalAnalysis}
          margin={{
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="birthString" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Area dataKey="BP sys" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="BMI" barSize={20} fill="#413ea0" />
          <Line dataKey="BP dias" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </Paper>
  );
}
