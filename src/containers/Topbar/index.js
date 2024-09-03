import React, { useState, useEffect } from "react";
import { Button, Col, Layout, Popover, Row } from "antd";
import { Link } from "react-router-dom";

import { toggleCollapsedSideNav } from "../../appRedux/actions";
import UserInfo from "../../components/UserInfo";
import Auxiliary from "util/Auxiliary";
import { userSignOut } from "../../appRedux/actions/Auth";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import Info from "./Info";
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE,
} from "../../constants/ThemeSetting";
import { useDispatch, useSelector } from "react-redux";
import {
  domainSettingByDomain,
  getMatchList,
  userBalance,
} from "../../appRedux/actions/User";
import { useLocation } from "react-router-dom";
import { useBalance } from "../../ContextApi";
import Marquee from "react-fast-marquee";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const { Header } = Layout;

const Topbar = () => {
  const [searchText, setSearchText] = useState("");
  const [displayNumber, setDisplayNumber] = useState("");
  const { locale, navStyle } = useSelector(({ settings }) => settings);
  const navCollapsed = useSelector(({ common }) => common.navCollapsed);

  const auth = JSON.parse(useSelector((state) => state.auth?.authUser));
  const { exposureSaga, balanceSaga } = useSelector(
    (state) => state.UserReducer
  );
  const width = useSelector(({ common }) => common.width);
  const { balance, setBalance } = useBalance();

  const dispatch = useDispatch();
  const location = useLocation();
  // let notification = localStorage.getItem("notification");
  const { doaminsettingData } = useSelector((state) => state.UserReducer);
  const [showNotification, setNotification] = useState();
  useEffect(() => {
    let notificationData = localStorage.getItem("notification");
    let data = notificationData
      ? notificationData
      : doaminsettingData?.userNotification;
    setNotification(data);
  }, [doaminsettingData]);
  useEffect(() => {
    let domainSetting = {
      domainUrl: window.location.origin,
    };
    dispatch(userBalance());
    const balanceInterval = setInterval(() => {
      dispatch(userBalance());
    }, 5000);

    const interval = setInterval(() => {
      dispatch(getMatchList());
      dispatch(domainSettingByDomain(domainSetting));
    }, 60 * 1000 * 5);
    return () => {
      clearInterval(balanceInterval);
      clearInterval(interval);
    };
  }, [dispatch]);

  useEffect(() => {
    const path = location.pathname.split("/");
    if (path[1] === "main") {
      switch (path[2]) {
        case "rules":
          setDisplayNumber("Rules");
          break;
        case "matches":
          setDisplayNumber("MATCHES");
          break;

        case "dashboard":
          setDisplayNumber("");
          break;
        case "profile":
          setDisplayNumber("PROFILE");
          break;
        case "freegame":
          setDisplayNumber("Free Games");
          break;
        case "changepassword":
          setDisplayNumber("Change Password");
          break;
        case "casino":
          setDisplayNumber("");
          break;
        case "ledger":
          setDisplayNumber("Ledgers");
          break;
        case "statement":
          setDisplayNumber("Statement");
          break;

        default:
          setDisplayNumber("");
          break;
      }
    }
  }, [location]);

  useEffect(() => {
    // notification = localStorage.getItem("notification");
    const preventBodyScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const allowBodyScroll = () => {
      document.body.style.overflow = "auto";
    };

    preventBodyScroll();
    allowBodyScroll();

    return () => {
      allowBodyScroll();
    };
  }, []);

  //  let userID = JSON.parse(localStorage.getItem("user_id"));
  //  let exposure = JSON.parse(localStorage.getItem("client-wallet-exposure"));
  //  let balance = JSON.parse(localStorage.getItem("client-wallet-balance"));
  // const modalOpen = localStorage.getItem("modalopen")

  let userID = JSON.parse(localStorage.getItem("user_id"));
  let exposureLocal = JSON.parse(
    localStorage.getItem("client-wallet-exposure")
  );
  let balanceLocal = JSON.parse(localStorage.getItem("client-wallet-balance"));
  const modalOpen = localStorage.getItem("modalopen");

  let client = userID?.data ? userID?.data : auth?.data;
  // let clientBalance = balance?.coins ? balance?.coins : balanceSaga;
  // let clientExposure = balance?.exposure ? balance?.exposure : exposureSaga;

  let clientBalance = balanceLocal ? balanceLocal : balanceSaga;
  let clientExposure = exposureLocal ? exposureLocal : exposureSaga;

  const Notification = localStorage.getItem("notification");

  const history = useHistory();
  const [activeTab, setActiveTab] = useState("Account Statement");

  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName); // Update active tab
    history.push(path); // Navigate to the specified path
  };

  return (
    <>
     <Header
      style={{ height: "75px" }}
      className="gx-bg-flex gx-w-100 gx-align-content-center"
    >
   <div style={{ backgroundColor: '#2A2A2A' }}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40, height: '76px', width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {/* <GiHamburgerMenu onClick={() => setOpenTrue()} style={{ fontSize: '1.8rem', color: 'white', marginLeft: '8px', display: 'block' }} /> */}
      <div style={{ width: '80px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <img onClick={() => history.push("/main/dashboard")} src='/images/biharlogo.49d3c75d.png' alt='logo' style={{ height: '40px', cursor: 'pointer' }} />
      </div>
    </div>
    <div style={{ display: 'none', width: '66.67%', color: 'white', padding: '4px 0', fontWeight: '400', fontSize: '16px' }}>
      <Marquee gradient={false} speed={50}>
        {/* <HiSpeakerphone size={20} style={{ margin: '0 8px' }} /> */}
        Welcome
      </Marquee>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <div style={{ color: 'white', position: 'relative' }}>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontSize: '10px', lineHeight: '1', borderRadius: '4px', cursor: 'pointer', color: 'white' }}>
                <p>Chips: <span>{Number.parseFloat(Math.abs(clientBalance)).toFixed(2)}</span></p>
                <p>Expo: <span>{Number.parseFloat(Math.abs(clientExposure)).toFixed(2)}</span></p>
              </div>
              <UserInfo />
            </div>
            
          </div>
        </div>
        <div  style={{ color: 'black', fontSize: '14px', fontWeight: '500', display: 'block', padding: '12px 8px', backgroundColor: '#F7BE27', borderRadius: '4px' }}>
          Bets
        </div>
      </div>
    </div>
  </div>
  <div style={{ display: 'none', width: '100%', color: 'white', fontSize: '14px' }}>
    <Marquee gradient={false} speed={70}>
      {/* <HiSpeakerphone size={18} style={{ margin: '0 8px' }} /> */}
      Welcome
    </Marquee>
  </div>
</div>
    </Header>
     

      <div className="gx-d-lg-flex gx-d-none gx-cursor-pointer gx-justify-content-start gx-bg-white gx-box-shadow">
        <span
          style={{ cursor: "pointer" }}
          className={`gx-px-3 gx-py-3  gx-fs-md gx-font-weight-semi-bold  ${
            activeTab === "Account Statement"
              ? "gx-bg-grey gx-text-white"
              : "gx-text-black"
          }`}
          onClick={() => handleTabClick("Account Statement", "/main/statement")}
        >
          Account Statement
        </span>
        <span
          style={{ cursor: "pointer" }}
          className={`gx-px-3 gx-py-3 gx-fs-md gx-font-weight-semi-bold  ${
            activeTab === "My Ledger"
              ? "gx-bg-grey gx-text-white"
              : "gx-text-black"
          }`}
          onClick={() => handleTabClick("My Ledger", "/main/ledger")}
        >
          My Ledger
        </span>
        <span
          style={{ cursor: "pointer" }}
          className={`gx-px-3 gx-py-3 gx-fs-md gx-font-weight-semi-bold ${
            activeTab === "Live Games"
              ? "gx-bg-grey gx-text-white"
              : "gx-text-black"
          }`}
          onClick={() => handleTabClick("Live Games", "/main/casino")}
        >
          Live Games
        </span>
      </div>
    </>
  );
};

export default Topbar;
