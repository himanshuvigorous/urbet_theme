import React from "react";
import { Col, Row, Spin } from "antd";

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;



const Loader = (props) => (
  <div style={{zIndex:1000}} className="gx-bg-flex gx-justify-content-center " >
    <Row justify="center" align="middle" className="gx-full-height ">
      <Col>
        {props && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'small' }}>
            <div style={{ display: 'flex', gap: 'small' }}>
               <div className="pulseLoader rounded-full"></div>
            </div>
          </div>
        )}
      </Col>
    </Row>
  </div>
);

export default Loader;

