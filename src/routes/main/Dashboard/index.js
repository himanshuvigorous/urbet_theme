import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Auxiliary from "util/Auxiliary";
import { Link } from "react-router-dom";
import CasinoCheckModal from "../../../components/CasinoCheckModal/CasinoCheckModal";
import Slider from "react-slick";
import UrbetLayout from "../../../components/UrbetLayout/UrbetLayout";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const parseMatchDate = (dateString) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");
  const isPM = timePart.includes("PM");

  let hour = parseInt(hours, 10);
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;

  return new Date(year, month - 1, day, hour, minutes);
};

const Dashboard = () => {
  const history = useHistory();

  const { matchList } = useSelector((state) => state.UserReducer);
  const [matchData, setMatchData] = useState([]);

  const settings = {
    dots: false, // Disable the navigation dots
    arrows: false, // Disable the navigation arrows
    infinite: true, // Enable infinite scrolling
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable auto-play
    autoplaySpeed: 3000, // Set the auto-slide interval in ms (3 seconds here)
    pauseOnHover: false, // Optional: Prevent auto-slide pause on hover
  };

  let adminMatchList = JSON.parse(localStorage.getItem("matchList"));

  useEffect(() => {
    let matchListData = adminMatchList ? adminMatchList : matchList;

    const filteredAndSortedData = matchListData
      ?.map((item, index) => ({
        key: item._id,
        sn: index + 1,
        name: item.matchName,
        matchDate: item.matchDate,
        seriesName: item.seriesName,
        inplay: item.status,
        matchName: item.matchName,
        marketId: item.marketId,
        eventId: item.eventId,
        cacheUrl: item.cacheUrl,
        status:item.status
      }))
      .sort(
        (a, b) => parseMatchDate(a.matchDate) - parseMatchDate(b.matchDate)
      );

    setMatchData(filteredAndSortedData);
  }, [matchList]);
  const handleResponseGame = (element) => {
    history.push(`/main/match-deatils/${element.marketId}/${element.eventId}`);
  };

  const handleNavigate = (route) => {
    history.push(`${route}`);
  };

  
  return (
    <>
      <UrbetLayout>
        <Row  className="gx-mx-0 gx-bg-white" justify={"center"}>
          <Col>
            <Slider {...settings}>
              <img src="/images/banner.png" alt="" />
              <img src="/images/banner_2.png" alt="" />
              <img src="/images/banner.png" alt="" />
            </Slider>

            <div>
              <div className="gx-fs-lg gx-px-1 gx-py-1 gx-font-weight-semi-bold gx-text-white gx-bg-grey">
                Cricket
              </div>
              <div className="gx-w-100">
                {matchData && matchData.length > 0
                  ? matchData.map((element, index) => (
                      <>
                        <Row
              
                        
                          className=" gx-ml-1 gx-py-1 "
                        >
                          <Col xs={24} md={12}>
                            <Row
                              gutter={[20, 20]}
                              className="gx-bg-flex  gx-w-100"
                            >
                              <Col span={24}>
                                <Row
                                  gutter={[20, 20]}
                                  className="gx-bg-flex justify-between gx-border-top"
                                >
                                  <Col>
                                    <Row
                                      gutter={[20, 20]}
                                      className="gx-bg-flex justify-start gx-align-items-center cursor-pointer"
                                    >
                                      <Col span={24}>
                                        <h2
                                          className="gx-fs-md  gx-font-weight-semi-bold"
                                          onClick={() =>
                                            handleResponseGame(element)
                                          }
                                        >
                                          {element.matchName}
                                        </h2>
                                      </Col>
                                    </Row>
                                    <Row
                                      gutter={[20, 20]}
                                      className="gx-bg-flex justify-start py-1 gx-align-items-center text-gray-600 gx-fs-md  gx-font-weight-semi-bold space-x-1"
                                    >
                                      <Col>
                                        <span>
                                          {element && element.matchDate
                                            ? element.matchDate
                                            : "--"}
                                        </span>
                                      </Col>
                                      <Col>
                                        <img
                                          style={{ width: "25px" }}
                                          alt="tv"
                                          src="/images/live-tv.png"
                                        />
                                      </Col>
                                      <Col>
                                     {element.status === "INPLAY" && <div className="gx-font-weight-semi-bold gx-fs-md gx-bg-green-0 gx-text-white gx-px-2 gx-py-1 gx-rounded-xxl">Inplay</div>}
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col className="text-black space-y-0.5">
                                    {/* Empty space or additional content can be added here */}
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                          <Col xs={24} md={12}>
                            <Row

                              gutter={[20, 20]}
                              className=" gx-flex-wrap gx-d-none gx-d-md-flex   gx-w-100 text-base gx-position-relative rounded-xl"
                            >
                              <Col
                                className="matchdtailsYesBackground gx-bg-flex gx-justify-content-center gx-align-items-center gx-fs-xs gx-font-weight-bold gx-py-2 gx-px-1 rounded-l-xl"
                                span={4}
                              >
                                <h2>-</h2>
                              </Col>
                              <Col
                                className="matchdtailsNoBackground gx-bg-flex gx-justify-content-center gx-align-items-center gx-fs-xs gx-font-weight-bold gx-py-2 gx-px-1"
                                span={4}
                              >
                                <h2>-</h2>
                              </Col>
                              <Col
                                className="matchdtailsYesBackground gx-bg-flex gx-justify-content-center gx-align-items-center gx-fs-xs gx-font-weight-bold gx-py-2 gx-px-1"
                                span={4}
                              >
                                <h2>-</h2>
                              </Col>
                              <Col
                                className="matchdtailsNoBackground gx-bg-flex gx-justify-content-center gx-align-items-center gx-fs-xs gx-font-weight-bold gx-py-2 gx-px-1"
                                span={4}
                              >
                                <h2>-</h2>
                              </Col>
                              <Col
                                className="matchdtailsYesBackground gx-bg-flex gx-justify-content-center gx-align-items-center gx-fs-xs gx-font-weight-bold gx-py-2 gx-px-1"
                                span={4}
                              >
                                <h2>-</h2>
                              </Col>
                              <Col
                                className="matchdtailsNoBackground gx-bg-flex gx-justify-content-center gx-align-items-center gx-fs-xs gx-font-weight-bold gx-py-2 gx-px-1 rounded-r-xl"
                                span={4}
                              >
                                <h2>-</h2>
                              </Col>
                            </Row>
                            <Row
                              gutter={[20, 20]}
                              className=" gx-flex-wrap gx-mt-1  gx-d-flex gx-d-md-none gx-w-100 text-base gx-position-relative rounded-xl"
                            >
                              <Col
                              style={{borderStartStartRadius:"2rem",borderEndStartRadius:"2rem"}}
                                className="matchdtailsYesBackground gx-bg-flex gx-justify-content-center gx-align-items-center gx-fs-xs gx-font-weight-bold gx-py-1 gx-px-1 rounded-l-xl"
                                span={4}
                              >
                                <h2>-</h2>
                              </Col>
                              <Col
                                className="matchdtailsNoBackground gx-bg-flex gx-justify-content-center gx-align-items-center gx-fs-xs gx-font-weight-bold gx-py-1 gx-px-1"
                                span={4}
                              >
                                <h2>-</h2>
                              </Col>
                              <Col
                                className="matchdtailsYesBackground gx-bg-flex gx-justify-content-center gx-align-items-center gx-fs-xs gx-font-weight-bold gx-py-1 gx-px-1"
                                span={4}
                              >
                                <h2>-</h2>
                              </Col>
                              <Col
                                className="matchdtailsNoBackground gx-bg-flex gx-justify-content-center gx-align-items-center gx-fs-xs gx-font-weight-bold gx-py-1 gx-px-1"
                                span={4}
                              >
                                <h2>-</h2>
                              </Col>
                              <Col
                                className="matchdtailsYesBackground gx-bg-flex gx-justify-content-center gx-align-items-center gx-fs-xs gx-font-weight-bold gx-py-1 gx-px-1"
                                span={4}
                              >
                                <h2>-</h2>
                              </Col>
                              <Col
                              style={{borderEndEndRadius:"2rem",borderStartEndRadius:"2rem"}}
                                className="matchdtailsNoBackground gx-bg-flex gx-justify-content-center gx-align-items-center gx-fs-xs gx-font-weight-bold gx-py-1 gx-px-1 rounded-r-xl"
                                span={4}
                              >
                                <h2>-</h2>
                              </Col>
                            </Row>
                            
                          </Col>
                        </Row>
                      </>
                    ))
                  : null}
              </div>
            </div>
            <div>
              <div className="gx-fs-lg gx-px-1 gx-py-1 gx-font-weight-semi-bold gx-text-white gx-bg-grey">
                Live Casino
              </div>
              <Row
                justify={"space-between"}
                className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 md:grid-cols-4 my-2"
              >
                <Col
                  xs={8}
                  sm={6}
                  md={4}
                  lg={4}
                  onClick={() => {
                    handleNavigate("ab2/3043");
                  }}
                  className="gx-bg-flex gx-align-items-center gx-flex-column gx-py-1 gx-justify-content-center"
                >
                  <img
                    style={{ width: "100px", height: "100px" }}
                    className=" gx-rounded-circle"
                    alt=""
                    src="/images/CasinoImages/abj.jpg"
                  />
                  <div className="gx-font-weight-bold gx-text-center">
                    Andar Bahar 2
                  </div>
                </Col>
                <Col
                  xs={8}
                  sm={6}
                  md={4}
                  lg={4}
                  onClick={() => {
                    handleNavigate("lucky7/3032");
                  }}
                  className="gx-bg-flex gx-align-items-center gx-flex-column gx-py-1 gx-justify-content-center"
                >
                  <img
                    style={{ width: "100px", height: "100px" }}
                    className=" gx-rounded-circle"
                    alt=""
                    src="/images/CasinoImages/lucky7eu.jpg"
                  />
                  <div className="gx-font-weight-bold gx-text-center">
                    Lucky7B
                  </div>
                </Col>
                <Col
                  xs={8}
                  sm={6}
                  md={4}
                  lg={4}
                  onClick={() => {
                    handleNavigate("aaa/3056");
                  }}
                  className="gx-bg-flex gx-align-items-center gx-flex-column gx-py-1 gx-justify-content-center"
                >
                  <img
                    style={{ width: "100px", height: "100px" }}
                    className="gx-rounded-circle"
                    alt=""
                    src="/images/CasinoImages/aaa.jpg"
                  />
                  <div className="gx-font-weight-bold gx-text-center">AAA</div>
                </Col>
                <Col
                  xs={8}
                  sm={6}
                  md={4}
                  lg={4}
                  onClick={() => {
                    handleNavigate("teen20/3030");
                  }}
                  className="gx-bg-flex gx-align-items-center gx-flex-column gx-py-1 gx-justify-content-center"
                >
                  <img
                    style={{ width: "100px", height: "100px" }}
                    className="gx-rounded-circle"
                    alt=""
                    src="/images/CasinoImages/teen20.jpg"
                  />
                  <div className="gx-font-weight-bold gx-text-center">
                    TeenPatti T20
                  </div>
                </Col>
                <Col
                  xs={8}
                  sm={6}
                  md={4}
                  lg={4}
                  onClick={() => {
                    handleNavigate("teen/3031");
                  }}
                  className="gx-bg-flex gx-align-items-center gx-flex-column gx-py-1 gx-justify-content-center"
                >
                  <img
                    style={{ width: "100px", height: "100px" }}
                    className="gx-rounded-circle"
                    alt=""
                    src="/images/CasinoImages/teen.jpg"
                  />
                  <div className="gx-font-weight-bold gx-text-center">
                    TeenPatti ODI
                  </div>
                </Col>
                <Col
                  xs={8}
                  sm={6}
                  md={4}
                  lg={4}
                  onClick={() => {
                    handleNavigate("dt20/3035");
                  }}
                  className="gx-bg-flex gx-align-items-center gx-flex-column gx-py-1 gx-justify-content-center"
                >
                  <img
                    style={{ width: "100px", height: "100px" }}
                    className="gx-rounded-circle"
                    alt=""
                    src="/images/CasinoImages/dt20.jpg"
                  />
                  <div className="gx-font-weight-bold gx-text-center">
                    Dragon Tiger
                  </div>
                </Col>
                <Col
                  xs={8}
                  sm={6}
                  md={4}
                  lg={4}
                  onClick={() => {
                    handleNavigate("dt202/3059");
                  }}
                  className="gx-bg-flex gx-align-items-center gx-flex-column gx-py-1 gx-justify-content-center"
                >
                  <img
                    style={{ width: "100px", height: "100px" }}
                    className="gx-rounded-circle"
                    alt=""
                    src="/images/CasinoImages/dt20.jpg"
                  />
                  <div className="gx-font-weight-bold gx-text-center">
                    DragonTiger2
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <div>
                <div className="gx-fs-lg gx-px-1 gx-py-1 gx-font-weight-semi-bold gx-text-white gx-bg-grey">
                  Virtual Casino & Matka
                </div>
                <Row className="gx-py-1">
                  <Col
                    xs={8}
                    sm={6}
                    md={4}
                    lg={4}
                    className="gx-bg-flex gx-flex-column gx-text-center gx-align-items-center gx-justify-content-center"
                  >
                    <img
                      onClick={() => history.push("worli2/3054")}
                      style={{ width: "100px", height: "100px" }}
                      className="gx-rounded-circle"
                      alt=""
                      src="/images/CasinoImages/Matka.webp"
                    />
                    <div className="gx-font-weight-semi-bold">Worli Matka</div>
                  </Col>
                  <Col
                    xs={8}
                    sm={6}
                    md={4}
                    lg={4}
                    className="gx-bg-flex gx-flex-column gx-text-center gx-align-items-center gx-justify-content-center"
                  >
                    <img
                      style={{ width: "100px", height: "100px" }}
                      className="gx-rounded-circle"
                      alt=""
                      src="/images/CasinoImages/7ud.webp"
                    />
                    <div className="gx-font-weight-semi-bold">7 Up Down</div>
                  </Col>
                  <Col
                    xs={8}
                    sm={6}
                    md={4}
                    lg={4}
                    onClick={() =>
                      this.handleModalOpen("/iframe-vartual-casino/andar-bahar")
                    }
                    className="gx-bg-flex gx-flex-column gx-text-center gx-align-items-center gx-justify-content-center"
                  >
                    <img
                      onClick={() => history.push("virtual-games/andar-bahar")}
                      style={{ width: "100px", height: "100px" }}
                      className="gx-rounded-circle"
                      alt=""
                      src="/images/CasinoImages/v_ab.jpg"
                    />
                    <div className="gx-font-weight-semi-bold">
                      Anadar Bhahar
                    </div>
                  </Col>

                  <Col
                    xs={8}
                    sm={6}
                    md={4}
                    lg={4}
                    onClick={() => history.push("matka")}
                    className="gx-bg-flex gx-flex-column gx-text-center gx-align-items-center gx-justify-content-center"
                  >
                    <img
                      style={{ width: "100px", height: "100px" }}
                      className="gx-rounded-circle"
                      alt=""
                      src="/images/CasinoImages/matka.png"
                    />
                    <div className="gx-font-weight-semi-bold">Matka</div>
                  </Col>
                  <Col
                    xs={8}
                    sm={6}
                    md={4}
                    lg={4}
                    className="gx-bg-flex gx-flex-column gx-text-center gx-align-items-center gx-justify-content-center"
                  >
                    <img
                      style={{ width: "100px", height: "100px" }}
                      className="gx-rounded-circle"
                      alt=""
                      src="/images/CasinoImages/av-new.png"
                    />
                    <div className="gx-font-weight-semi-bold">Coming Soon</div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </UrbetLayout>
    </>
  );
};
export default Dashboard;
