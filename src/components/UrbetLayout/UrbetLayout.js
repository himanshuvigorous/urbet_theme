import { Col, Row } from "antd";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import RightSidebar from "../RightSidebar/RightSidebar";

function UrbetLayout({ children }) {
  return (
    <Row style={{overflow:"hidden"}} justify={"space-between"} >
      <Col
        xs={24}
        md={24}
        lg={4}
        xl={3}
        className=" gx-d-none gx-d-lg-block gx-px-0 gx-mx-0"
      >
        <LeftSidebar />
      </Col>
      <Col  xs={24} md={24} lg={15} xl={16}>
        {children}
      </Col>
      <Col
        xs={24}
        md={24}
        lg={5}
        xl={5}
        className="gx-d-none gx-d-lg-block gx-px-0 gx-mx-0"
      >
        <RightSidebar />
      </Col>
    </Row>
  );
}

export default UrbetLayout;
