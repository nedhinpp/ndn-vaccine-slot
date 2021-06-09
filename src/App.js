import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";

function App() {
  let curDate = moment().format("DD-MM-YYYY");
  const cookies = new Cookies();
  const [data, setData] = useState([]);
  const [states, setState] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [date, setDate] = useState(curDate);
  return (
    <div className="App">
      <div className="container">
        <h1>Hello Folks Get your slots for covid vaccine</h1>

        {useEffect(() => {
          axios
            .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
            .then((response) => {
              console.log(response);
              setState(response.data.states);
            });
        }, [])}

        <select
          className="btn btn-secondary dropdown-toggle selection"
          onChange={(e) => {
            axios
              .get(
                `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${e.target.value}`
              )
              .then((response) => {
                console.log(response);
                setDistricts(response.data.districts);
              });
          }}
        >
          <option value="">Select</option>
          {states.map((statesName, index) => {
            return (
              <option key={index} value={statesName.state_id}>
                {statesName.state_name}
              </option>
            );
          })}
        </select>

        <select
          className="btn btn-secondary dropdown-toggle selection"
          onChange={(e) => {
            axios
              .get(
                `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${e.target.value}&date=${date}`
              )
              .then((response) => {
                console.log(response);
                setData(response.data.centers);
              });
          }}
        >
          <option value="">Select</option>
          {districts.map((districtName, index) => {
            return (
              <option key={index} value={districtName.district_id}>
                {districtName.district_name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="container">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th className="text-left"> Vaccination Center</th>
              <th>Availablity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((obj, index) => {
              return data[index].sessions.map(function (ses) {
                if (ses.available_capacity !== 0) {
                  return (
                    <tr>
                      <td className="text-left">
                        <span className="name">{obj.name} </span>
                        <span className={obj.fee_type}>{obj.fee_type}</span>
                        <br />
                        <span className="smallfont">{obj.address}</span>
                        <br />
                        <span className="smallfont font-weight-bold">
                          {ses.date} |{" "}
                        </span>
                        <span className="smallfont font-weight-bold">
                          {ses.vaccine} |{" "}
                        </span>{" "}
                        <span className="smallfont font-weight-bold">
                          Age
                          {ses.min_age_limit} +
                        </span>
                      </td>
                      <td
                        className={
                          ses.available_capacity === 0 ? "nostock" : "stock"
                        }
                      >
                        Dose 1 : {ses.available_capacity_dose1}
                        <br />
                        Dose 2 : {ses.available_capacity_dose2}
                        <br />
                      </td>
                    </tr>
                  );
                }
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
