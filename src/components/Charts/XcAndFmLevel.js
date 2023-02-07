import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function XcAndFmLevel(props) {
  return (
    <React.Fragment>
      <Paper style={{ height: "100%", width: "100%" }}>
        <Box sx={{ height: "8%", display: "flex", flexDirection: "row" }}>
          <Typography variant="body 2" sx={{ flexGrow: 1 }}>
            XC-FM
          </Typography>

          <IconButton
            color="secondary"
            onClick={props.booleanCheckXcAndFmLevel}
            size="small"
          >
            <ClearIcon fontSize="small" sx={{ color: red[700] }} />
          </IconButton>
        </Box>

        <ResponsiveContainer height="92%">
          <LineChart data={props.patientExams}>
            <CartesianGrid strokeDasharray="6 3" />
            <XAxis dataKey="birthString" />
            <YAxis domain={[0, 80]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="xc"
              stroke="#8884d8"
              fill="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="fm"
              stroke="#82ca9d"
              fill="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </React.Fragment>
  );
}

export default XcAndFmLevel;
