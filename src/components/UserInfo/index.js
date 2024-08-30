import React, { useState } from "react";
import {useDispatch} from "react-redux";
import {Avatar, Dropdown, Popover} from "antd";
import {userSignOut} from "appRedux/actions/Auth";

const UserInfo = () => {

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal=()=>{
    setShowModal(false)
  }

 
  const items = [
    {
      key: '1',
      label: (
        <div onClick={() => setShowModal(true)}>Change Password</div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={() => dispatch(userSignOut())}>Logout</div>
      ),
    }
  ];
  let userInfo = JSON.parse(localStorage.getItem('user_id'));

  return (
    <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        trigger={['click']} className="gx-border-redius0"
      >
        <div className="gx-fs-xl  gx-font-weight-normal gx-bg-flex  gx-justify-item-center gx-gap-4 gx-text-white gx-pointer">
          <span>{userInfo?.data?.name}</span>
          <span className="gx-pt-0.5"><i className="icon icon-chevron-down" /></span>
        </div>
      </Dropdown>
    
  )

}

export default UserInfo;
