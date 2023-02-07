import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import Paper from "@mui/material/Paper";

export default function ListClinicalAnalysis(props) {
  //si aggiorna e contiene la lista dei bottoni premuti ( quindi con checked=true)
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    //currentIndex contiene l'indice dell'oggetto di cui abbiamo appena premuto il bottone
    const currentIndex = checked.indexOf(value);
    //è una semplice copia dei checked
    const newChecked = [...checked];

    //aggiungo (se premuto) o scarto quell'elemento dall'array
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <React.Fragment>
      <Paper style={{ height: "100%", width: "100%" }}>
        <Box sx={{ height: "8%", display: "flex", flexDirection: "row" }}>
          <Typography variant="body 2" sx={{ flexGrow: 1 }}>
            CLINICAL ANALYSIS
          </Typography>

          <IconButton
            color="secondary"
            onClick={props.booleanCheckDataClinicalAnalysis}
            size="small"
          >
            <ClearIcon fontSize="small" sx={{ color: red[700] }} />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
          <List
            sx={{
              width: "50%",
              bgcolor: "background.paper",
              height: "82%",
              overflow: "auto",
            }}
          >
            {props.dataClinicalAnalysis.map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`${value.birthString}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <List
            sx={{
              width: "50%",
              bgcolor: "background.paper",
              overflow: "auto",
              height: "82%",
            }}
            subheader={<li />}
          >
            {checked.map((value) => {

              return (
                <li>
                  <ul>
                    <ListSubheader>{value.birthString}</ListSubheader>
                    <ListItemText primary={`BMI: ${value.BMI}`} />

                    <ListItemText primary={`BP dias: ${value["BP dias"]}`} />

                    <ListItemText primary={`BP sys: ${value["BP sys"]}`} />

                    <ListItemText primary={`Height: ${value["Body height"]}`} />

                    <ListItemText primary={`Weight : ${value["Weight "]}`} />

                    <ListItemText
                      primary={`BUN Bld-mCnc: ${value["BUN Bld-mCnc"]}`}
                    />

                    <ListItemText
                      primary={`Calcium Bld-mCnc: ${value["Calcium Bld-mCnc"]}`}
                    />

                    <ListItemText
                      primary={`Creat Bld-mCnc: ${value["Creat Bld-mCnc"]}`}
                    />

                    <ListItemText
                      primary={`Glucose Bld-mCnc: ${value["Glucose Bld-mCnc"]}`}
                    />

                    <ListItemText
                      primary={`HbA1c MFr Bld: ${value["HbA1c MFr Bld"]}`}
                    />

                    <ListItemText
                      primary={`Potassium Bld-sCnc: ${value["Potassium Bld-sCnc"]}`}
                    />

                    <ListItemText
                      primary={`Sodium Bld-sCnc: ${value["Sodium Bld-sCnc"]}`}
                    />

                    <ListItemText
                      primary={`Heart rate: ${value["Heart rate"]}`}
                    />

                    <ListItemText
                      primary={`Resp rate: ${value["Resp rate"]}`}
                    />

                    <ListItemText
                      primary={`Tobac smoke stat: ${value["Tobac smoke stat"]}`}
                    />
                  </ul>
                </li>
              );
            })}
          </List>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
