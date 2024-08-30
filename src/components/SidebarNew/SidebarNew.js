import { Col, Row } from "antd"
import LeftSidebar from "../LeftSidebar/LeftSidebar"

function UrbetLayout({children}) {
    return (
        <Row justify={"space-between"}>
<Col xs={24} md={4} xl={3} className=" gx-d-none gx-d-md-block">
<LeftSidebar />
</Col>
<Col xs={24} md={15} xl={16}>
{children}
</Col>
<Col xs={24} md={5} xl={5} className="gx-d-none gx-d-md-block">
</Col>
        </Row>
    )
}

export default UrbetLayout
