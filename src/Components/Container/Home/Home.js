import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Moment from "moment";
import axios from "axios";
import AuthContext from "../../../Store/auth-context";
import Card from "../../../assets/Card/Card";
import MiniLoading from "../../../assets/miniLoading/miniLoading";
import { formatCase } from "../../../Store/utility";
import { Container } from "@material-ui/core";
import QRCode from "react-qr-code";
import Chart from "../../../assets/Chart/Chart";
import Aos from "aos";
import "aos/dist/aos.css";
import ModalScreeningResult from "../../../assets/ModalScreeningResult/ModalScreeningResult";

const Home = ({ screeningData }) => {
  const [dataCase, setDataCase] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataScreening, setDataScreening] = useState();
  const [detailScreening, setDetailScreening] = useState({
    screeningStatus: "",
    screeningSuggest: "",
    symptom: [],
  });
  const [globalCase, setGlobalCase] = useState({
    recovers: [],
    confirms: [],
    deaths: [],
    countryNames: [],
    lastUpdate: [],
    chartReference: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showDataGraph, setshowDataGraph] = useState(false);
  const [userData, setUserData] = useState({});
  const authCtx = useContext(AuthContext);

  async function openModalHandler(screenerId) {
    try {
      setIsLoading(true);
      setOpenModal(true);
      let token = `Bearer ${authCtx.token}`;
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.get(
        `/account/detail-screener/${screenerId}`,
        config
      );
      if (response.status === 200 || response.status === 202) {
        setIsLoading(false);
        setDetailScreening({
          ...detailScreening,
          screeningStatus: response.data.data.detail_screening.screening_status,
          screeningSuggest:
            response.data.data.detail_screening.screening_suggest,
          symptom: response.data.data.detail_screening.symptom,
        });
      } else {
        setIsLoading(false);
        throw new Error(response);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function getDataScreening() {
    try {
      setIsLoading(true);
      let token = `Bearer ${authCtx.token}`;
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.get("/account/all-screener", config);
      if (response.status === 202 || response.status === 200) {
        setIsLoading(false);
        setDataScreening(response.data.data.list);
      } else {
        throw new Error(response);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function getNews() {
    setIsLoading(true);
    let response = await axios.get("/countries/IDN");
    let content;
    if (response.status === 200) {
      setIsLoading(false);
      content = await response.data;
      let arrContent = [
        content.confirmed.value,
        content.recovered.value,
        content.deaths.value,
        content.lastUpdate,
      ];
      setTimeout(() => {
        setDataCase(arrContent);
      }, 5000);
    } else {
      setIsLoading(false);
      throw new Error(`Can't Access Data Case. Detail : ${response}`);
    }
  }

  async function getGlobalNews() {
    try {
      setIsLoading(true);
      let caseCountry = [];
      let caseConfirmed = [];
      let caseRecovered = [];
      let caseDeaths = [];
      let lastUpdate = [];
      let content;
      const response = await axios.get("/confirmed");
      if (response.status === 200 || response.status === 202) {
        setIsLoading(false);
        content = await response.data;
        for (const dataObj of content) {
          caseCountry.push(dataObj.countryRegion);
          caseConfirmed.push(parseInt(dataObj.confirmed));
          caseRecovered.push(parseInt(dataObj.recovered));
          caseDeaths.push(parseInt(dataObj.deaths));
        }
        setGlobalCase({
          ...globalCase,
          confirms: caseConfirmed?.slice(0, 5),
          recovers: caseRecovered?.slice(0, 5),
          deaths: caseRecovered?.slice(0, 5),
          countryNames: caseCountry?.slice(0, 5),
        });
      } else {
        setIsLoading(false);
        throw new Error(response);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function getProfile() {
    setIsLoading(true);
    const token = authCtx.token;
    await axios
      .get("/account/get-user/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200 || response.statusText === "OK") {
          setIsLoading(false);
          setUserData(response.data.data);
        } else {
          setIsLoading(false);
          throw new Error(`Can't Access Data Case. Detail : ${response}`);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error.message);
      });

    await axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          alert(error.response);
        }
        return error;
      }
    );
  }

  function showGraph() {
    setshowDataGraph(true);
  }

  useEffect(() => {
    try {
      Aos.init({ duration: 2000 });
      getNews();
      getGlobalNews();
      setInterval(getNews, 3600000);
      getProfile();
      getDataScreening();

      return () => {
        setDataCase("");
        setUserData("");
        setGlobalCase();
      };
    } catch (error) {
      alert(error.message);
    }
  }, []);

  Moment.locale("en");
  let date = dataCase[3];
  let confirmed = dataCase[0];
  let recovered = dataCase[1];
  let deaths = dataCase[2];

  return (
    <main className="main">
      {openModal && (
        <ModalScreeningResult
          setOpenModal={setOpenModal}
          labelInput="Sugguestion"
          suggestion={detailScreening.screeningSuggest}
          title="Result"
          screeningStatus={detailScreening.screeningStatus}
          symptom={detailScreening.symptom}
        />
      )}
      <header className="header" data-aos="fade-bottom">
        <h1>Welcome to Screening COVID-19</h1>
        <h3>{userData.full_name}</h3>
      </header>
      <section className="datacase" data-aos="fade-right">
        <h2>Data Case Indonesia</h2>
        <div className="datacase-container">
          {isLoading ? (
            <MiniLoading />
          ) : dataCase === undefined ? null : (
            <>
              <Card
                title="Confirmed"
                value={formatCase(confirmed)}
                img="https://icon-library.com/images/join-icon-png/join-icon-png-6.jpg"
                lastUpdate={Moment(date).format("DD MMM YYYY")}
                alt="Confirmed Case"
              />
              <Card
                title="Recovered"
                value={formatCase(recovered)}
                img="https://image.flaticon.com/icons/png/512/1512/1512922.png"
                lastUpdate={Moment(date).format("DD MMM YYYY")}
                alt="Recovered Case"
              />
              <Card
                title="Deaths"
                value={formatCase(deaths)}
                img="https://cdn.iconscout.com/icon/free/png-256/death-2511679-2103286.png"
                lastUpdate={Moment(date).format("DD MMM YYYY")}
                alt="Deaths Case"
              />
            </>
          )}
        </div>
      </section>
      <section
        className="globalcase"
        onMouseOver={showGraph}
        data-aos="fade-left"
      >
        <h2>Global Case</h2>
        <div className="globalcase-container">
          <div className="chart-img">
            {showDataGraph && (
              <Chart
                chartReference={globalCase?.chartReference}
                titles1="Confirmed Case"
                titles2="Recovered Case"
                titles3="Deaths Case"
                datas1={globalCase?.confirms}
                datas2={globalCase?.recovers}
                datas3={globalCase?.deaths}
                labels={globalCase?.countryNames}
              />
            )}
          </div>
        </div>
      </section>
      <section className="history-qrCode" data-aos="fade-right">
        <h2>History Screening</h2>
        <div className="history-qrCode-container">
          <div className="history-qrCode-img">
            {dataScreening?.map((val, key) => {
              return (
                <div class="qrcodes-screening">
                  <QRCode
                    value={val}
                    size={115}
                    key={val.ID}
                    onClick={() => openModalHandler(val.screener_id)}
                  />
                  <p>{Moment(val.createdAt).format("DD MMM YYYY")}</p>
                </div>
              );
            })}
          </div>
          <div className="history-qrCode-description"></div>
        </div>
      </section>
    </main>
  );
};

export default Home;
