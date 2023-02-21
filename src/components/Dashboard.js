import React, { useState, useEffect} from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Tbw from "./charts/Tbw";
import Ffm from "./charts/Ffm";
import XcAndFmLevel from "./charts/XcAndFmLevel";
import HeartRespRate from "./charts/HeartRespRate";
import DataTable from "./dataContainers/DataTable";
import Box from "@mui/material/Box";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import BunCharts from "./charts/BunChart";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ConfigurableGrid from "./dataContainers/ConfigurableGrid";
import { createTheme } from "@mui/material/styles";
import LateralBar from "./dataContainers/LateralBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListClinicalAnalysis from "./dataContainers/ListClinicalAnalysis";
import { authControl, logout } from "../api/auth";
import { recoveryButtons,memoriseButtons} from "../api/layout";
import BMIChart from "./charts/BMIChart";

const cyanTheme = createTheme({
  palette: {
    mode: "cyan",
    primary: {
      main: "#e0f7fa",
    },
  },
});

function Dashboard(props) {

  //----------------------------------------------------------------------
  //PERSONAL DATA

  const [patientPersonalData, setPatientPersonalData] = useState({});

  const fetchPersonalData = () => {
    const fiscalCode = searchForm;
    const data = { key: fiscalCode };

    let x = {};

    fetch("http://localhost:8000/api/user/fetchPersonalData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        x = {
          name: data.givenName,
          gender: data.gender,
          birthDate: data.birthDate,
          surname: data.familyName,
          avatar: "data:" + data.avatarType + ";base64," + data.avatar,
        };

        setPatientPersonalData(() => {
          return { ...x };
        });
      });
  };

  //----------------------------------------------------------------

  //  FETCH BALANCE DATA     (DATA TABLE TAKES DIRECTLY FROM PatientExams)

  const [patientExams, setPatientExams] = useState([]);

  const fetchBalanceData = () => {
    const fiscalCode = searchForm;
    const data = { key: fiscalCode };

    let x = [];

    //urlBalanceData + fiscalCode

    fetch("http://localhost:8000/api/user/fetchBalanceData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const patient of data) {
          x.push({
            birthString: patient.examDate.slice(0, 9),
            birth: new Date(patient.examDate),
            height: patient.height,
            weight: patient.weight,
            //toFixed per rappresentare solo i 3 numeri subito dopo la virgola
            pha: patient.pha.toFixed(3),
            rz: patient.rz,
            z: patient.z.toFixed(3),
            tbw: patient.tbw.toFixed(3),
            ffm: patient.ffm.toFixed(3),
            xc: patient.xc,
            fm: patient.fm.toFixed(3),
          });
        }

        x.sort((a, b) => a.birth - b.birth);

        setPatientExams(() => {
          return [...x];
        });
      });
  };

  //----------------------------------------------------------------

  const [dataClinicalAnalysisButton, setDataClinicalAnalysisButton] =
    useState(true);

  function booleanCheckDataClinicalAnalysis() {
    setDataClinicalAnalysisButton(!dataClinicalAnalysisButton);
  }

  //FETCH DATA CLINICAL ANALYSIS

  const [dataClinicalAnalysis, setDataClinicalAnalysis] = useState([]);

  const fetchDataClinicalAnalysis = () => {
    const fiscalCode = searchForm;
    const data = { key: fiscalCode };

    let x = [];

    fetch("http://localhost:8000/api/user/fetchClinicalAnalysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const patient of data.observations) {
          x.push({
            birthString: patient.created.slice(0, 9),
            birth: new Date(patient.created),
            codeText: patient.codeText,
            valueNum: patient.valueNum,
          });
        }

        x.sort((a, b) => a.birth - b.birth);

        var y = [];
        var z = {};
        for (let i = 0; i < x.length; i++) {
          if (!Object.hasOwn(z, x[i].birthString))
            z[x[i].birthString] = { birthString: x[i].birthString };
          z[x[i].birthString][x[i].codeText] = x[i].valueNum;
        }
        for (let key in z) {
          y.push(z[key]);
        }
        setDataClinicalAnalysis(() => {
          return [...y];
        });
      });
  };

  function fetchAll() {
    fetchPersonalData();
    fetchDataClinicalAnalysis();
    fetchBalanceData();
  }

  //---------------------------------------------------------------------
  //SEARCH BAR

  const [searchForm, setSearchForm] = useState("");

  const onSearch = (event) => {
    setSearchForm(event.target.value);
  };

  const onLateralBar = () => {
    setLateralBar(true); }

  //----------------------------------------------------------------

  //barra laterale che sparisce e ricompare premendo il bottone apposito
  const [lateralBar, setLateralBar] = useState(false);

  const onSpaceFree = () => {
    setLateralBar(false);
  };

  const onSpaceFull = () => {
    setLateralBar(true);
  };

  //----------------------------------------------------------------------

  //Menù

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //-------------------------------------------------------------

  //  TBW AND FFM LEVEL

  const [tbw, setTbw] = useState(true);

  const [ffm, setFfm] = useState(true);

  function booleanCheckTbw() {
    setTbw(!tbw);
  }

  function booleanCheckFfm() {
    setFfm(!ffm);
  }

  //-------------------------------------------------------

  // XC AND FM LEVEL

  const [xcAndFmLevel, setXcAndFmLevel] = useState(true);

  function booleanCheckXcAndFmLevel() {
    setXcAndFmLevel(!xcAndFmLevel);
  }

  //----------------------------------------------------------------

  // DATA TABLE
  const [dataTable, setDataTable] = useState(true);

  function booleanCheckDataTable() {
    setDataTable(!dataTable);
  }

  //----------------------------------------------------------------

  // HEART RESP RATE
  const [heartRespRate, setHeartRespRate] = useState(true);

  function booleanCheckHeartRespRate() {
    setHeartRespRate(!heartRespRate);
  }

  //----------------------------------------------------------------------

  // BUN CHART
  //Sodium Bld-sCnc  -  Glucose Bld-mCnc  -  BUN Bld-mCnc  -  Calcium Bld-mCnc
  const [bunChart, setBunChart] = useState(true);

  function booleanBunChart() {
    setBunChart(!bunChart);
  }

  //----------------------------------------------------------------------

  // BMI CHART
  //BP sys  -  BMI  -  BP dias
  const [bMIChart, setBMIChart] = useState(true);

  function booleanBMIChart() {
    setBMIChart(!bMIChart);
  }

  //----------------------------------------------------------------------


  useEffect(() => {
    
    const auth = async () => {
      const res = await authControl();
      if (res.hasOwnProperty("error") === true)
        window.location.replace("http://localhost:3000");
    };

    auth();
    const buttonsRec = async () => {
      const l = await recoveryButtons();
       setSearchForm(l.user.searchForm);
       setTbw(l.user.tbw);  
       setFfm(l.user.ffm); 
       setXcAndFmLevel(l.user.xcAndFmLevel);
       setDataTable(l.user.dataTable);
       setHeartRespRate(l.user.heartRespRate);
       setBunChart(l.user.bunChart);
       setBMIChart(l.user.bMIChart);
       setDataClinicalAnalysisButton(l.user.dataClinicalAnalysisButton); 
    };
    buttonsRec();   
  }, []);

  const log_out = async () => {
    const res = await logout();
    if (res.hasOwnProperty("ok") === true)
      window.location.replace("http://localhost:3000");
  };

  const onSaveLayout = (event) => {
    const buttons = {
      tbw:tbw, ffm:ffm, xcAndFmLevel:xcAndFmLevel, dataTable:dataTable,
      heartRespRate:heartRespRate, bunChart:bunChart,
      bMIChart:bMIChart, dataClinicalAnalysisButton:dataClinicalAnalysisButton,searchForm:searchForm
      };
    memoriseButtons(buttons)
  };

  useEffect(() => {
    fetchAll() }, [searchForm]  );


  return (
    <React.Fragment>
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          height: "100vh",
          width: "100%",
          mt: 8,
        }}
      >
        <LateralBar
          lateralBar={lateralBar}
          onSpaceFree={onSpaceFree}
          avatar={patientPersonalData.avatar}
          name={patientPersonalData.name}
          surname={patientPersonalData.surname}
          gender={patientPersonalData.gender}
          birthDate={patientPersonalData.birthDate}
        ></LateralBar>

        <AppBar theme={cyanTheme}>
          <Toolbar>
            {!lateralBar && (
              <IconButton
                color="primary"
                sx={{ mr: 1, height: 50, width: 50 }}
                onClick={onSpaceFull}
                size="large"
              >
                <KeyboardArrowRightIcon fontSize="large" />
              </IconButton>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Button onClick={handleClick} color="primary">
                Dashboard
              </Button>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={booleanBMIChart}>
                 BIOELETRICAL IMPENDANCE ANALYSIS
                  <Checkbox checked={bMIChart} onChange={booleanBMIChart} />
                </MenuItem>

                <MenuItem onClick={booleanBunChart}>
                  BLOOD ANALYSIS
                  <Checkbox checked={bunChart} onChange={booleanBunChart} />
                </MenuItem>

                <MenuItem onClick={booleanCheckDataClinicalAnalysis}>
                  DATA CLINICAL ANALYSIS
                  <Checkbox
                    checked={dataClinicalAnalysisButton}
                    onChange={booleanCheckDataClinicalAnalysis}
                  />
                </MenuItem>

                <MenuItem onClick={booleanCheckTbw}>
                  TOTAL BODY WATER ANALYSIS
                  <Checkbox checked={tbw} onChange={booleanCheckTbw} />
                </MenuItem>

                <MenuItem onClick={booleanCheckFfm}>
                  FAT-FREE MASS ANALYSIS
                  <Checkbox checked={ffm} onChange={booleanCheckFfm} />
                </MenuItem>

                <MenuItem onClick={booleanCheckXcAndFmLevel}>
                  REATTANZA(XC) AND FAT-MASS(FM)                  
                  <Checkbox
                    checked={xcAndFmLevel}
                    onChange={booleanCheckXcAndFmLevel}
                  />
                </MenuItem>

                <MenuItem onClick={booleanCheckHeartRespRate}>
                  HEART AND RESP RATE
                  <Checkbox
                    checked={heartRespRate}
                    onChange={booleanCheckHeartRespRate}
                  />
                </MenuItem>

                <MenuItem onClick={booleanCheckDataTable}>
                  BALANCE DATA TABLE
                  <Checkbox
                    checked={dataTable}
                    onChange={booleanCheckDataTable}
                  />
                </MenuItem>

                <MenuItem >
                  GENETIC ANALYSES
                  <Checkbox
                  />
                </MenuItem>

                <MenuItem >
                BLOOD COUNT
                  <Checkbox
                  />
                </MenuItem>

                <MenuItem >
                  URINE ANALYSIS
                  <Checkbox
                  />
                </MenuItem>

                <MenuItem >
                  ALLERGY TEST
                  <Checkbox
                  />
                </MenuItem>
              </Menu>

              <Button
                variant="outlined"
                sx={{ ml: 20, height: 30 }}
                onClick={ fetchAll && onLateralBar}
              >
                Search
              </Button>

              <Input
                placeholder="fiscal code"
                sx={{ ml: 5 }}
                onChange={onSearch}
                value={searchForm}
              />
            </Box>
            <Button onClick={onSaveLayout} sx={{ ml: 22 }}>
              SAVE PAGE
            </Button>

            <Button onClick={log_out} sx={{ ml: 22 }}>
              LOGOUT
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ width: "150%" }}>
          <ConfigurableGrid>
            {dataClinicalAnalysisButton && (
              <Box
                key="1"
                data-grid={{ w: 5, h: 5, x: 0, y: 0, minW: 3, minH: 4 }}
              >
                <ListClinicalAnalysis
                  booleanCheckDataClinicalAnalysis={
                    booleanCheckDataClinicalAnalysis
                  }
                  dataClinicalAnalysis={dataClinicalAnalysis}
                ></ListClinicalAnalysis>
              </Box>
            )}

            {tbw && (
              <Box
                key="2"
                data-grid={{ w: 2, h: 4, x: 2, y: 5, minW: 3, minH: 4 }}
              >
                <Tbw
                  booleanCheckTbw={booleanCheckTbw}
                  patientExams={patientExams}
                ></Tbw>
              </Box>
            )}

            {ffm && (
              <Box
                key="3"
                data-grid={{ w: 3, h: 4, x: 4, y: 5, minW: 2, minH: 4 }}
              >
                <Ffm
                  booleanCheckFfm={booleanCheckFfm}
                  patientExams1={patientExams}
                ></Ffm>
              </Box>
            )}

            {xcAndFmLevel && (
              <Box
                key="4"
                data-grid={{ w: 3, h: 4, x: 7, y: 8, minW: 2, minH: 4 }}
              >
                <XcAndFmLevel
                  booleanCheckXcAndFmLevel={booleanCheckXcAndFmLevel}
                  patientExams={patientExams}
                ></XcAndFmLevel>
              </Box>
            )}

            {heartRespRate && (
              <Box
                key="5"
                data-grid={{ w: 3, h: 4, x: 7, y: 5, minW: 3, minH: 4 }}
              >
                <HeartRespRate
                  booleanCheckHeartRespRate={booleanCheckHeartRespRate}
                  dataClinicalAnalysis={dataClinicalAnalysis}
                ></HeartRespRate>
              </Box>
            )}

            {dataTable && (
              <Box
                key="6"
                data-grid={{ w: 5, h: 5, x: 2, y: 7, minW: 3, minH: 5 }}
              >
                <DataTable
                  booleanCheckDataTable={booleanCheckDataTable}
                  patientExams={patientExams.length}
                  patientExams1={patientExams}
                ></DataTable>
              </Box>
            )}

            {bunChart && (
              <Box
                key="7"
                data-grid={{ w: 5, h: 5, x: 5, y: 0, minW: 3, minH: 5 }}
              >
                <BunCharts
                  booleanBunChart={booleanBunChart}
                  dataClinicalAnalysis={dataClinicalAnalysis}
                ></BunCharts>
              </Box>
            )}

            {bMIChart && (
              <Box
                key="8"
                data-grid={{ w: 2, h: 9, x: 0, y: 4, minW: 2, minH: 5 }}
              >
                <BMIChart
                  booleanBMIChart={booleanBMIChart}
                  dataClinicalAnalysis={dataClinicalAnalysis}
                ></BMIChart>
              </Box>
            )}
          </ConfigurableGrid>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Dashboard;
