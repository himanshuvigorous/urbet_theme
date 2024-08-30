import React, {useEffect} from "react";
import {Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import InsideHeader from "../Topbar/InsideHeader/index";
import Topbar from "../Topbar/index";
import App from "../../routes/index";
import Footers from '../../components/Footers'
// import Customizer from "../Customizer";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE,
} from "../../constants/ThemeSetting";
import {useRouteMatch} from "react-router-dom";
import {updateWindowWidth} from "../../appRedux/actions";
import AppSidebar from "./AppSidebar";
import { NotificationContainer } from "react-notifications";

const {Content, Footer} = Layout;

const getContainerClass = (navStyle) => {
  switch (navStyle) {
    case NAV_STYLE_DARK_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_DEFAULT_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_BELOW_HEADER:
      return "gx-container-wrap";
    case NAV_STYLE_ABOVE_HEADER:
      return "gx-container-wrap";
    default:
      return '';
  }
};

const getNavStyles = (navStyle) => {
  switch (navStyle) {

    case NAV_STYLE_INSIDE_HEADER_HORIZONTAL :
      return <InsideHeader/>;
    case NAV_STYLE_FIXED :
      return <Topbar/>;
    case NAV_STYLE_DRAWER :
      return <Topbar/>;
    case NAV_STYLE_MINI_SIDEBAR :
      return <Topbar/>;
    default :
      return null;
  }
};

const MainApp = () => {
  const {navStyle} = useSelector(({settings}) => settings);
  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch(updateWindowWidth(window.innerWidth));
    })
  }, [dispatch]);
  const width = useSelector(({common}) => common.width);

  return (
    <Layout className="gx-app-layout">
      <AppSidebar navStyle={navStyle}/>
      <Layout>
        {getNavStyles(navStyle)}
        <Content className={`gx-layout-content  ${getContainerClass(navStyle)} `}>
        {/* gx-px-md-5 */}
          <App match={match}/>
          {width >= TAB_SIZE ? null :
          <Footer>
            <Footers/>
          </Footer>}
        </Content>
      </Layout>
      {/* <Customizer/> */}
      <NotificationContainer position="top-left" />
    </Layout>
  )
};
export default MainApp;

