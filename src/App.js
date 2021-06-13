import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";
import audio from "./assets/audios/police_siren.mp3";
import TelegramLink from "./Components/TelegramLink/TelegramLink";
import { isMobile } from "react-device-detect";

function App() {
  let curDate = moment().format("DD-MM-YYYY");
  const cookies = new Cookies();
  const [data, setData] = useState([]);
  const [states, setState] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [date, setDate] = useState(curDate);
  const [district, setCurrentDistrict] = useState("");
  const [canPlay, setCanPlay] = useState(true);
  const [dose, setDose] = useState("");
  const [age, setAge] = useState("");
  let play = false;
  let nodata = false;

  return (
    <div className="App">
      {/* <Notify /> */}
      <nav className="navbar navbar-default nav-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <span className="glyphicon glyphicon-envelope"></span> Home
            </a>
            <a
              className="navbar-brand"
              target="_blank"
              href="https://nidhinpp.in/"
            >
              About
            </a>
          </div>
        </div>
      </nav>

      <div className="container" style={{ marginTop: "2rem" }}>
        <h2>Vaccine Availability Tracker</h2>

        {(() => {
          if (district === "305") {
            return <TelegramLink name="Kozhikode" tid="c0vidVaccine" />;
          } else if (district === "295") {
            return (
              <TelegramLink name="Kasaragod" tid="c0vidVaccineKasaragod" />
            );
          } else if (district === "297") {
            return <TelegramLink name="Kannur" tid="c0vidVaccineKannur" />;
          } else if (district === "303") {
            return <TelegramLink name="Thrissur" tid="c0vidVaccineThrissur" />;
          } else if (district === "308") {
            return <TelegramLink name="Palakkad" tid="c0vidVaccinePalakkad" />;
          } else if (district === "302") {
            return (
              <TelegramLink name="Malappuram" tid="c0vidVaccineMalappuram" />
            );
          } else {
            return <div></div>;
          }
        })()}

        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="enableAudioAlert"
            defaultChecked="true"
            onClick={(e) => {
              setCanPlay(!canPlay);
            }}
          ></input>
          <label
            className="custom-control-label"
            htmlFor="enableAudioAlert"
            style={{ float: "left" }}
          >
            Enable Audio Alert
          </label>
        </div>

        {useEffect(() => {
          axios
            .get("https://cdn-api.co-vin.in/api/v2/admin/location/districts/17")
            .then((response) => {
              setDistricts(response.data.districts);
            });
        }, [])}
        {/* <select
          className="btn btn-secondary dropdown-toggle selection"
          onChange={(e) => {
            axios
              .get(
                `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${e.target.value}`
              )
              .then((response) => {
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
        </select> */}
        <select
          className="btn btn-secondary dropdown-toggle selection"
          onChange={(e) => {
            axios
              .get(
                `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${e.target.value}&date=${date}`
              )
              .then((response) => {
                setData(response.data.centers);
                setCurrentDistrict(e.target.value);
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
        <select
          className="btn btn-secondary dropdown-toggle smallSelection"
          onChange={(e) => {
            setDose(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="1">Dose 1</option>
          <option value="2">Dose 2</option>
        </select>
        <select
          className="btn btn-secondary dropdown-toggle smallSelection"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="18">18 - 40</option>
          <option value="40">41 - 44</option>
          <option value="45"> 45+ </option>
        </select>
        {useEffect(() => {
          const timer = setInterval(() => {
            if (district !== "") {
              axios
                .get(
                  `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${date}`
                )
                .then((response) => {
                  setData(response.data.centers);
                  play = false;
                  for (var i = 0; i < response.data.centers.length; i++) {
                    for (
                      var k = 0;
                      k < response.data.centers[i].sessions.length;
                      k++
                    ) {
                      if (
                        response.data.centers[i].sessions[k]
                          .available_capacity !== 0 &&
                        (age === "" ||
                          (age !== "" &&
                            age ==
                              response.data.centers[i].sessions[k]
                                .min_age_limit)) &&
                        (dose === "" ||
                          (dose !== "" &&
                            ((dose == "1" &&
                              response.data.centers[i].sessions[k]
                                .available_capacity_dose1 > 0) ||
                              (dose == "2" &&
                                response.data.centers[i].sessions[k]
                                  .available_capacity_dose2 > 0)))) &&
                        !cookies.get(
                          response.data.centers[i].center_id +
                            response.data.centers[i].sessions[k].date +
                            response.data.centers[i].sessions[k].min_age_limit +
                            response.data.centers[i].sessions[k].vaccine
                        )
                      ) {
                        cookies.set(
                          response.data.centers[i].center_id +
                            response.data.centers[i].sessions[k].date +
                            response.data.centers[i].sessions[k].min_age_limit +
                            response.data.centers[i].sessions[k].vaccine,
                          {
                            key:
                              response.data.centers[i].center_id +
                              response.data.centers[i].sessions[k].date +
                              response.data.centers[i].sessions[k]
                                .min_age_limit +
                              response.data.centers[i].sessions[k].vaccine,
                          },
                          { path: "/", expires: new Date(Date.now() + 3600000) }
                        );

                        if (!play) play = true;
                        break;
                      }
                    }
                  }
                  if (play && canPlay) new Audio(audio).play();
                });
            }
          }, 30000);
          return () => {
            clearInterval(timer);
          };
        })}
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
            {(nodata = false)}
            {data.map((obj, index) => {
              return data[index].sessions.map(function (ses) {
                if (
                  ses.available_capacity !== 0 &&
                  (age === "" || (age !== "" && age == ses.min_age_limit)) &&
                  (dose === "" ||
                    (dose !== "" &&
                      ((dose == "1" && ses.available_capacity_dose1 > 0) ||
                        (dose == "2" && ses.available_capacity_dose2 > 0))))
                ) {
                  if (!nodata) nodata = true;
                  return (
                    <tr>
                      <td className="text-left left-td">
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
                          ses.available_capacity === 0
                            ? "nostock right-td"
                            : "stock right-td"
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
            {(() => {
              if (!nodata && district !== "") {
                return (
                  <tr>
                    <td colSpan="2">
                      No Vaccination center is available for booking in the
                      selected district.
                    </td>
                  </tr>
                );
              }
            })()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
