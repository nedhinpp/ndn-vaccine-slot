import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import Cookies from "universal-cookie";

function Notify() {
  let curDate = moment().format("DD-MM-YYYY");
  const [date, setDate] = useState(curDate);
  const cookies = new Cookies();
  return (
    <div>
      {useEffect(() => {
        const timer = setInterval(() => {
          axios
            .get(
              `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=305&date=${date}`
            )
            .then((response) => {
              for (var i = 0; i < response.data.centers.length; i++) {
                for (
                  var k = 0;
                  k < response.data.centers[i].sessions.length;
                  k++
                ) {
                  if (
                    response.data.centers[i].sessions[k].available_capacity !==
                      0 &&
                    !cookies.get(
                      response.data.centers[i].center_id +
                        "-" +
                        response.data.centers[i].sessions[k].date +
                        "-" +
                        response.data.centers[i].sessions[k].min_age_limit +
                        "-" +
                        response.data.centers[i].sessions[k].vaccine
                    )
                  ) {
                    cookies.set(
                      response.data.centers[i].center_id +
                        "-" +
                        response.data.centers[i].sessions[k].date +
                        "-" +
                        response.data.centers[i].sessions[k].min_age_limit +
                        "-" +
                        response.data.centers[i].sessions[k].vaccine,
                      {
                        key:
                          response.data.centers[i].center_id +
                          "-" +
                          response.data.centers[i].sessions[k].date +
                          "-" +
                          response.data.centers[i].sessions[k].min_age_limit +
                          "-" +
                          response.data.centers[i].sessions[k].vaccine,
                      },
                      { path: "/", expires: new Date(Date.now() + 3600000) }
                    );
                    axios
                      .post(
                        "https://api.telegram.org/bot1860148922:AAHdt2gJdjl6kQT15lcxzbM-63ZJRTp4_Ps/sendMessage",
                        {
                          chat_id: "@c0vidVaccine",
                          text: `*Vaccination center available*

*${response.data.centers[i].name}*
${response.data.centers[i].address}
Vaccine: *${response.data.centers[i].sessions[k].vaccine}*
Age: *${response.data.centers[i].sessions[k].min_age_limit}* +
Total *${response.data.centers[i].sessions[k].available_capacity}* slots are available on *${response.data.centers[i].sessions[k].date}* 
(Dose1: ${response.data.centers[i].sessions[k].available_capacity_dose1}, Dose2: ${response.data.centers[i].sessions[k].available_capacity_dose2}) 

CoWin: https://selfregistration.cowin.gov.in `,
                          parse_mode: "Markdown",
                        }
                      )
                      .then((response) => {
                        console.log(response);
                      });
                  }
                }
              }
            });
          axios
            .get(
              `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=297&date=${date}`
            )
            .then((response) => {
              for (var i = 0; i < response.data.centers.length; i++) {
                for (
                  var k = 0;
                  k < response.data.centers[i].sessions.length;
                  k++
                ) {
                  if (
                    response.data.centers[i].sessions[k].available_capacity !==
                      0 &&
                    !cookies.get(
                      response.data.centers[i].center_id +
                        "-" +
                        response.data.centers[i].sessions[k].date +
                        "-" +
                        response.data.centers[i].sessions[k].min_age_limit +
                        "-" +
                        response.data.centers[i].sessions[k].vaccine
                    )
                  ) {
                    cookies.set(
                      response.data.centers[i].center_id +
                        "-" +
                        response.data.centers[i].sessions[k].date +
                        "-" +
                        response.data.centers[i].sessions[k].min_age_limit +
                        "-" +
                        response.data.centers[i].sessions[k].vaccine,
                      {
                        key:
                          response.data.centers[i].center_id +
                          "-" +
                          response.data.centers[i].sessions[k].date +
                          "-" +
                          response.data.centers[i].sessions[k].min_age_limit +
                          "-" +
                          response.data.centers[i].sessions[k].vaccine,
                      },
                      { path: "/", expires: new Date(Date.now() + 3600000) }
                    );
                    axios
                      .post(
                        "https://api.telegram.org/bot1860148922:AAHdt2gJdjl6kQT15lcxzbM-63ZJRTp4_Ps/sendMessage",
                        {
                          chat_id: "@c0vidVaccineKannur",
                          text: `*Vaccination center available*

*${response.data.centers[i].name}*
${response.data.centers[i].address}
Vaccine: *${response.data.centers[i].sessions[k].vaccine}*
Age: *${response.data.centers[i].sessions[k].min_age_limit}* +
Total *${response.data.centers[i].sessions[k].available_capacity}* slots are available on *${response.data.centers[i].sessions[k].date}* 
(Dose1: ${response.data.centers[i].sessions[k].available_capacity_dose1}, Dose2: ${response.data.centers[i].sessions[k].available_capacity_dose2}) 

CoWin: https://selfregistration.cowin.gov.in `,
                          parse_mode: "Markdown",
                        }
                      )
                      .then((response) => {
                        console.log(response);
                      });
                  }
                }
              }
            });

          axios
            .get(
              `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=295&date=${date}`
            )
            .then((response) => {
              for (var i = 0; i < response.data.centers.length; i++) {
                for (
                  var k = 0;
                  k < response.data.centers[i].sessions.length;
                  k++
                ) {
                  if (
                    response.data.centers[i].sessions[k].available_capacity !==
                      0 &&
                    !cookies.get(
                      response.data.centers[i].center_id +
                        "-" +
                        response.data.centers[i].sessions[k].date +
                        "-" +
                        response.data.centers[i].sessions[k].min_age_limit +
                        "-" +
                        response.data.centers[i].sessions[k].vaccine
                    )
                  ) {
                    cookies.set(
                      response.data.centers[i].center_id +
                        "-" +
                        response.data.centers[i].sessions[k].date +
                        "-" +
                        response.data.centers[i].sessions[k].min_age_limit +
                        "-" +
                        response.data.centers[i].sessions[k].vaccine,
                      {
                        key:
                          response.data.centers[i].center_id +
                          "-" +
                          response.data.centers[i].sessions[k].date +
                          "-" +
                          response.data.centers[i].sessions[k].min_age_limit +
                          "-" +
                          response.data.centers[i].sessions[k].vaccine,
                      },
                      { path: "/", expires: new Date(Date.now() + 3600000) }
                    );
                    axios
                      .post(
                        "https://api.telegram.org/bot1860148922:AAHdt2gJdjl6kQT15lcxzbM-63ZJRTp4_Ps/sendMessage",
                        {
                          chat_id: "@c0vidVaccineKasaragod",
                          text: `*Vaccination center available*

*${response.data.centers[i].name}*
${response.data.centers[i].address}
Vaccine: *${response.data.centers[i].sessions[k].vaccine}*
Age: *${response.data.centers[i].sessions[k].min_age_limit}* +
Total *${response.data.centers[i].sessions[k].available_capacity}* slots are available on *${response.data.centers[i].sessions[k].date}* 
(Dose1: ${response.data.centers[i].sessions[k].available_capacity_dose1}, Dose2: ${response.data.centers[i].sessions[k].available_capacity_dose2}) 

CoWin: https://selfregistration.cowin.gov.in `,
                          parse_mode: "Markdown",
                        }
                      )
                      .then((response) => {
                        console.log(response);
                      });
                  }
                }
              }
            });

          axios
            .get(
              `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=303&date=${date}`
            )
            .then((response) => {
              for (var i = 0; i < response.data.centers.length; i++) {
                for (
                  var k = 0;
                  k < response.data.centers[i].sessions.length;
                  k++
                ) {
                  if (
                    response.data.centers[i].sessions[k].available_capacity !==
                      0 &&
                    !cookies.get(
                      response.data.centers[i].center_id +
                        "-" +
                        response.data.centers[i].sessions[k].date +
                        "-" +
                        response.data.centers[i].sessions[k].min_age_limit +
                        "-" +
                        response.data.centers[i].sessions[k].vaccine
                    )
                  ) {
                    cookies.set(
                      response.data.centers[i].center_id +
                        "-" +
                        response.data.centers[i].sessions[k].date +
                        "-" +
                        response.data.centers[i].sessions[k].min_age_limit +
                        "-" +
                        response.data.centers[i].sessions[k].vaccine,
                      {
                        key:
                          response.data.centers[i].center_id +
                          "-" +
                          response.data.centers[i].sessions[k].date +
                          "-" +
                          response.data.centers[i].sessions[k].min_age_limit +
                          "-" +
                          response.data.centers[i].sessions[k].vaccine,
                      },
                      { path: "/", expires: new Date(Date.now() + 3600000) }
                    );
                    axios
                      .post(
                        "https://api.telegram.org/bot1860148922:AAHdt2gJdjl6kQT15lcxzbM-63ZJRTp4_Ps/sendMessage",
                        {
                          chat_id: "@c0vidVaccineThrissur",
                          text: `*Vaccination center available*

*${response.data.centers[i].name}*
${response.data.centers[i].address}
Vaccine: *${response.data.centers[i].sessions[k].vaccine}*
Age: *${response.data.centers[i].sessions[k].min_age_limit}* +
Total *${response.data.centers[i].sessions[k].available_capacity}* slots are available on *${response.data.centers[i].sessions[k].date}* 
(Dose1: ${response.data.centers[i].sessions[k].available_capacity_dose1}, Dose2: ${response.data.centers[i].sessions[k].available_capacity_dose2}) 

CoWin: https://selfregistration.cowin.gov.in `,
                          parse_mode: "Markdown",
                        }
                      )
                      .then((response) => {
                        console.log(response);
                      });
                  }
                }
              }
            });

          axios
            .get(
              `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=308&date=${date}`
            )
            .then((response) => {
              for (var i = 0; i < response.data.centers.length; i++) {
                for (
                  var k = 0;
                  k < response.data.centers[i].sessions.length;
                  k++
                ) {
                  if (
                    response.data.centers[i].sessions[k].available_capacity !==
                      0 &&
                    !cookies.get(
                      response.data.centers[i].center_id +
                        "-" +
                        response.data.centers[i].sessions[k].date +
                        "-" +
                        response.data.centers[i].sessions[k].min_age_limit +
                        "-" +
                        response.data.centers[i].sessions[k].vaccine
                    )
                  ) {
                    cookies.set(
                      response.data.centers[i].center_id +
                        "-" +
                        response.data.centers[i].sessions[k].date +
                        "-" +
                        response.data.centers[i].sessions[k].min_age_limit +
                        "-" +
                        response.data.centers[i].sessions[k].vaccine,
                      {
                        key:
                          response.data.centers[i].center_id +
                          "-" +
                          response.data.centers[i].sessions[k].date +
                          "-" +
                          response.data.centers[i].sessions[k].min_age_limit +
                          "-" +
                          response.data.centers[i].sessions[k].vaccine,
                      },
                      { path: "/", expires: new Date(Date.now() + 3600000) }
                    );
                    axios
                      .post(
                        "https://api.telegram.org/bot1860148922:AAHdt2gJdjl6kQT15lcxzbM-63ZJRTp4_Ps/sendMessage",
                        {
                          chat_id: "@c0vidVaccinePalakkad",
                          text: `*Vaccination center available*

*${response.data.centers[i].name}*
${response.data.centers[i].address}
Vaccine: *${response.data.centers[i].sessions[k].vaccine}*
Age: *${response.data.centers[i].sessions[k].min_age_limit}* +
Total *${response.data.centers[i].sessions[k].available_capacity}* slots are available on *${response.data.centers[i].sessions[k].date}* 
(Dose1: ${response.data.centers[i].sessions[k].available_capacity_dose1}, Dose2: ${response.data.centers[i].sessions[k].available_capacity_dose2}) 

CoWin: https://selfregistration.cowin.gov.in `,
                          parse_mode: "Markdown",
                        }
                      )
                      .then((response) => {
                        console.log(response);
                      });
                  }
                }
              }
            });

          axios
            .get(
              `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=302&date=${date}`
            )
            .then((response) => {
              for (var i = 0; i < response.data.centers.length; i++) {
                for (
                  var k = 0;
                  k < response.data.centers[i].sessions.length;
                  k++
                ) {
                  if (
                    response.data.centers[i].sessions[k].available_capacity !==
                      0 &&
                    !cookies.get(
                      response.data.centers[i].center_id +
                        "-" +
                        response.data.centers[i].sessions[k].date +
                        "-" +
                        response.data.centers[i].sessions[k].min_age_limit +
                        "-" +
                        response.data.centers[i].sessions[k].vaccine
                    )
                  ) {
                    cookies.set(
                      response.data.centers[i].center_id +
                        "-" +
                        response.data.centers[i].sessions[k].date +
                        "-" +
                        response.data.centers[i].sessions[k].min_age_limit +
                        "-" +
                        response.data.centers[i].sessions[k].vaccine,
                      {
                        key:
                          response.data.centers[i].center_id +
                          "-" +
                          response.data.centers[i].sessions[k].date +
                          "-" +
                          response.data.centers[i].sessions[k].min_age_limit +
                          "-" +
                          response.data.centers[i].sessions[k].vaccine,
                      },
                      { path: "/", expires: new Date(Date.now() + 3600000) }
                    );
                    axios
                      .post(
                        "https://api.telegram.org/bot1860148922:AAHdt2gJdjl6kQT15lcxzbM-63ZJRTp4_Ps/sendMessage",
                        {
                          chat_id: "@c0vidVaccineMalappuram",
                          text: `*Vaccination center available*

*${response.data.centers[i].name}*
${response.data.centers[i].address}
Vaccine: *${response.data.centers[i].sessions[k].vaccine}*
Age: *${response.data.centers[i].sessions[k].min_age_limit}* +
Total *${response.data.centers[i].sessions[k].available_capacity}* slots are available on *${response.data.centers[i].sessions[k].date}* 
(Dose1: ${response.data.centers[i].sessions[k].available_capacity_dose1}, Dose2: ${response.data.centers[i].sessions[k].available_capacity_dose2}) 

CoWin: https://selfregistration.cowin.gov.in `,
                          parse_mode: "Markdown",
                        }
                      )
                      .then((response) => {
                        console.log(response);
                      });
                  }
                }
              }
            });
        }, 30000);
        return () => {
          clearInterval(timer);
        };
      })}
    </div>
  );
}

export default Notify;
