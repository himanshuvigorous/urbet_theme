
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Auxiliary from "util/Auxiliary";
import { Link } from "react-router-dom";
import CasinoCheckModal from "../../../components/CasinoCheckModal/CasinoCheckModal";
import Slider from "react-slick";
import UrbetLayout from "../../../components/SidebarNew/SidebarNew";


const Dashboard = () => {
  const [betSlipData, setBetSlipData] = useState({});
  const [casinoDataModal, setCasinoDataModal] = useState(false);

  const handleCasinoOpen = (data) => {
    setBetSlipData({ ...data });
    setCasinoDataModal(true)
  }

  const handleClose = () => {
    setCasinoDataModal(false)
    setBetSlipData({})
  };

  var settings = {
    button: false,
    dots: true,
    slickPrev: false,
    slickNext: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
       <UrbetLayout >
       <Auxiliary>
          <Row className="gx-w-100">
            <Col xs={24}>
              <div className="pb-10">
                <Slider {...settings} className="gx-w-100">
                  <div>
                    <img
                      style={{ objectFit: "cover", width: "100%", height: "auto" }}
                      src="/images/banner.png"
                      alt="Banner 1"
                    />
                  </div>
                  <div>
                    <img
                      style={{ objectFit: "cover", width: "100%", height: "auto" }}
                      src="/images/banner_2.png"
                      alt="Banner 2"
                    />
                  </div>
                  <div>
                    <img
                      style={{ objectFit: "cover", width: "100%", height: "auto" }}
                      src="/images/banner.png"
                      alt="Banner 3"
                    />
                  </div>
                </Slider>
              </div>
            </Col>
          </Row>
        </Auxiliary>
       </UrbetLayout>
    </>

  );
};
export default Dashboard;