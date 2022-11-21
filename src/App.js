import Search from "./components/Search";
import React from 'react';

function App() {

  const a = "aaa";
  /*
  const [patients, setPatients] = useState("JO");
   const username = "j.parker@meddoctor.org";
  const password = "DocJParker";
  const url = 'http://141.95.111.168:8080/media/v1/patients/MMRMRA89L29Z404B';  

  const fetchPatients = () => {
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPatients(data.results[0].title);
      });
  };
  */

  return (
    
      <Search></Search>
  );
}

export default App;
