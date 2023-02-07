import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

//  total body water    and   fat free mass (massa magra)
function Ffm(props) {
  return (
    <React.Fragment>
      <Paper style={{ height: "100%", width: "100%" }}>
        <Box sx={{ height: "8%", display: "flex", flexDirection: "row" }}>
          <Typography variant="body 2" sx={{ flexGrow: 1 }}>
          FAT-FREE MASS
          </Typography>

          <IconButton
            color="secondary"
            onClick={props.booleanCheckFfm}
            size="small"
          >
            <ClearIcon fontSize="small" sx={{ color: red[700] }} />
          </IconButton>
        </Box>

        <ResponsiveContainer height="92%">
          <AreaChart data={props.patientExams1} syncId="anyId">
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
      </Paper>
    </React.Fragment>
  );
}

export default Ffm;
