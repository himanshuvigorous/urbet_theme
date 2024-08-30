import React, { useState } from "react";
import { Button, Modal } from "antd";
import {websiteName, SecoundWebsiteName} from '../../constants/global'


const Info = () => {
  const [open , setOpen] = useState(true)
  const handleClose = () => {
    localStorage.removeItem("modalopen");
    setOpen(false)
  };

  return (
    <Modal
      open={open}
      style={{
        top: 25,
      }}
      title={`${websiteName} Rules`}
      onCancel={handleClose}
      footer={
        <Button className="gx-bg-primary gx-text-white gx-border-redius0" onClick={ ()=>handleClose()} >
          Close
        </Button >
      }
      className="gx-px-3"
    >
      <div className="gx-font-weight-semi-bold">
        <div className="gx-fs-xl gx-mb-2 gx-text-black gx-font-weight-semi-bold"> प्रिय ग्राहक,</div>
        <div className="gx-font-weight-demi-bold">
        {`आपसे अनुरोध है हमारी कोई डुप्लीकेट साइट नही है हमारी आधिकारिक साइट
        ${websiteName}.COM,${SecoundWebsiteName}.COM  से लॉगिन करें। लॉगइन करने से पहले साइट का नाम जरूर देख लें।
        आपके समर्थन के लिए धन्यवाद। टीम   ${websiteName}.COM,${SecoundWebsiteName}.COM`}
        </div>
      </div>
        <br />
      <div className="gx-font-weight-semi-bold">
        <div className="gx-fs-lg gx-mb-2 gx-text-black"> Dear Client,</div> 
        {`We don't have any duplicate site , You are requested to login with our
        official site   ${websiteName}.COM, ${SecoundWebsiteName}.COM .I only. Please check the site name before you
        login. Thanks for your support. Team    ${websiteName}.COM, ${SecoundWebsiteName}.COM`}
      </div>
    </Modal>
  );
};

export default Info;
