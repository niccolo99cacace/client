import React, { useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TbwFfm from "./Charts/TbwFfm";
import XcAndFmLevel from "./Charts/XcAndFmLevel";
import HeartRespRate from "./Charts/HeartRespRate";
import DataTable from "./DataTable";
import Charts from "./Charts";
import Box from "@mui/material/Box";
import { purple } from "@mui/material/colors";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Ccc from "../Ccc" ;

function FetchBox(props) {
  const [tbwFfm, setTbwFfm] = useState(false);
  const [patientTbwFfm, setPatientTbwFfm] = useState([{}]);

  const [xcAndFmLevel, setXcAndFmLevel] = useState(false);
  const [patientXcAndFmLevel, setPatientXcAndFmLevel] = useState([{}]);

  const [heartRespRate, setHeartRespRate] = useState(false);
  const [patientHeartRate, setPatientHeartRate] = useState([{}]);
  const [patientRespRate, setPatientRespRate] = useState([{}]);
  const [patientHeartRespRate, setPatientHeartRespRate] = useState([{}]);

  const [dataTable, setDataTable] = useState(false);
  const [patientExams, setPatientExams] = useState([{}]);

  const urlHealthData =
    "http://localhost:8080/hospital/api/complex/basic/TRRVLA91M13Z404A";

  //----------------------------------------------------------------
  const urlBalanceData =
    "http://localhost:8080/hospital/api/balance/TRRVLA91M13Z404A";

  const fetchTbwFfm = () => {
    let x = [{}];
    fetch(urlBalanceData, {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const patient of data) {
          x.push({
            birthString: patient.examDate.slice(0, 9),
            birth: new Date(patient.examDate),
            tbw: patient.tbw.toFixed(3),
            ffm: patient.ffm.toFixed(3),
          });
        }

        x.sort((a, b) => a.birth - b.birth);

        setPatientTbwFfm(() => {
          return [...x];
        });
      });
  };

  function booleanCheckTbwFfm() {
    setTbwFfm(!tbwFfm);
  }

  const handleTbwFfmChange = (state) => {
    booleanCheckTbwFfm();
    fetchTbwFfm();
  };

  //-------------------------------------------------------

  const fetchXcAndFmLevel = () => {
    let x = [{}];
    fetch(urlBalanceData, {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const patient of data) {
          x.push({
            birthString: patient.examDate.slice(0, 9),
            birth: new Date(patient.examDate),
            xc: patient.xc,
            fm: patient.fm.toFixed(3),
          });
        }

        x.sort((a, b) => a.birth - b.birth);

        setPatientXcAndFmLevel(() => {
          return [...x];
        });
      });
  };

  function booleanCheckXcAndFmLevel() {
    setXcAndFmLevel(!xcAndFmLevel);
  }

  const handleXcAndFmLevel = (state) => {
    booleanCheckXcAndFmLevel();
    fetchXcAndFmLevel();
  };

  //----------------------------------------------------------------

  //fetch Heart rate
  const fetchHeartRate = () => {
    let x = [];

    fetch(urlHealthData, {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const patient of data.observations) {
          if (patient.codeText.localeCompare("Heart rate") == 0)
            x.push({
              birthString: patient.created.slice(0, 9),
              birth: new Date(patient.created),
              codeText: patient.codeText,
              heartRate: patient.valueNum,
            });
        }

        x.sort((a, b) => a.birth - b.birth);

        setPatientHeartRate(() => {
          return [...x];
        });
      });
  };

  //fetch Resp rate
  const fetchRespRate = () => {
    let x = [];

    fetch(urlHealthData, {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const patient of data.observations) {
          if (patient.codeText.localeCompare("Resp rate") == 0)
            x.push({
              birthString: patient.created.slice(0, 9),
              birth: new Date(patient.created),
              codeText: patient.codeText,
              respRate: patient.valueNum,
            });
        }

        x.sort((a, b) => a.birth - b.birth);

        setPatientRespRate(() => {
          return [...x];
        });
      });
  };

  const fetchAllHeartRespRate = () => {
    let x = [];

    fetchRespRate();
    fetchHeartRate();

    for (const p1 of patientHeartRate) {
      for (const p2 of patientRespRate) {
        if (p1.birthString.localeCompare(p2.birthString) == 0)
          x.push({
            birthString: p1.birthString,
            birth: p1.birth,
            codeText1: p1.codeText,
            codeText2: p2.codeText,
            heartRate: p1.heartRate,
            respRate: p2.respRate,
          });
      }
    }

    setPatientHeartRespRate(() => {
      return [...x];
    });
  };

  function booleanCheckHeartRespRate() {
    setHeartRespRate(!heartRespRate);
  }

  const handleHeartRespRate = (state) => {
    booleanCheckHeartRespRate();
    fetchAllHeartRespRate();
  };

  //----------------------------------------------------------------

  const fetchBalanceData = () => {
    let x = [];
    fetch(urlBalanceData, {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
      },
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
          });
        }

        x.sort((a, b) => a.birth - b.birth);

        setPatientExams(() => {
          return [...x];
        });
      });
  };

  function booleanCheckDataTable() {
    setDataTable(!dataTable);
  }

  const handleDataTableChange = (state) => {
    booleanCheckDataTable();
    fetchBalanceData();
  };

  //----------------------------------------------------------------

  return (
    <React.Fragment>
      

       
        
          <AppBar >
    <Toolbar>
          <h4>TBW AND FFM</h4>
          <Checkbox checked={tbwFfm} onChange={handleTbwFfmChange} />

          <h4>XC AND FM</h4>
          <Checkbox checked={xcAndFmLevel} onChange={handleXcAndFmLevel} />

          <h4>HEART AND RESP RATE</h4>
          <Checkbox checked={heartRespRate} onChange={handleHeartRespRate} />

          <h4>BALANCE DATA TABLE</h4>
          <Checkbox checked={dataTable} onChange={handleDataTableChange} />
        
          </Toolbar>
  </AppBar>
        



        <Charts
          tbwFfm={tbwFfm}
          patientTbwFfm={patientTbwFfm}
          patientTbwFfm1={patientTbwFfm}
          xcAndFmLevel={xcAndFmLevel}
          patientXcAndFmLevel={patientXcAndFmLevel}
          heartRespRate={heartRespRate}
          patientHeartRespRate={patientHeartRespRate}
          dataTable={dataTable}
          patientExams={patientExams.length}
          patientExams1={patientExams}
        ></Charts>

        <Ccc></Ccc>
      
    </React.Fragment>
  );
}

export default FetchBox;
