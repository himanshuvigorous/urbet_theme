
import React, { useEffect } from "react";
import { Col, Row } from "antd";
import Auxiliary from "util/Auxiliary";
import { Link } from "react-router-dom";
import BackMenuButton from "../../../components/BackMenu";



const Settings = () => {


    return (
        <Auxiliary>
            <div className="gx-pb-4">
                <Link to='/main/dashboard/'>
                    <div className="gx-bg-grey gx-py-1 gx-text-white gx-font-weight-semi gx-bg-flex gx-justify-content-center">
                        BACK TO MAIN MENU
                    </div>
                </Link>
            </div>
            <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-4 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>
                <Col>
                    <Link to='/main/profile'>
                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/images/profile.png" />
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase">Profile</div>
                        </div>
                    </Link>
                </Col>

                <Col>
                    <Link to='/main/freegame'>
                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/images/free-games.png" />
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase">free games</div>
                        </div>
                    </Link>
                </Col>
            </Row>

            <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-4 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>
                <Col>
                    <Link to='/main/rules'>

                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/images/tvs-rules.png" />
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase">Rules</div>
                        </div>
                    </Link>

                </Col>
                <Col>
                    <Link to='/main/changepassword'>

                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/images/tvs-password.png" />
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase ">PASSWORD</div>
                        </div>
                    </Link>

                </Col>
            </Row>


            <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-4 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>
                <Col>
                    <Link to='/main/edit-stakes'>
                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/images/edit-stakes.png" />
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase">Stake</div>
                        </div>
                    </Link>

                </Col>
                <Col>
              <Link to='/main/pending-bets'>
                <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                  <img alt="inage" src="/assets/images/unsettled-bets.png" />
                  <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase ">Exposure</div>
                </div>
              </Link>
            </Col>

            </Row>



        </Auxiliary>
    );
};
export default Settings;







