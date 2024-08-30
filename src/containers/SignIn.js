// import React, { useEffect, useState } from "react";
// import { Button, Form, Input, message } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { hideMessage, showAuthLoader, userLoginCheck, userSignIn, } from "../appRedux/actions";
// import IntlMessages from "util/IntlMessages";
// import CircularProgress from "../components/CircularProgress";
// import { domainSettingByDomain } from "../appRedux/actions/User";



// const SignIn = () => {
//   const [fieldslogin, setFieldsLogin] = useState({ username: '', password: '', otp: '' });
//   // const [showAdditionalField, setShowAdditionalField] = useState(false);
//   let showAdditionalField = false
//   const dispatch = useDispatch();
//   const { loader, showMessage, authUser, loginChek, isLogin } = useSelector(({ auth }) => auth);

//   const history = useHistory();
//   useEffect(() => {
//     if (showMessage) {
//       setTimeout(() => {
//         dispatch(hideMessage());
//       }, 100);
//     }
//     if (authUser !== null) {
//       history.push('/');
//     }
//   }, [authUser, dispatch, history, showMessage]);


//   const inputChange = (e) => {
//     const { name, value } = e.target;
//     if (!name || !value) {
//       return;
//     }
//     setFieldsLogin(prevFields => ({
//       ...prevFields,
//       [name]: value,
//     }));
//   };

//   const onFinish = values => {
//     // const { otp } = fieldslogin;

//     let domainSetting = {
//       "domainUrl": window.location.origin
//     };
//     const data = {
//       username: fieldslogin.username,
//       password: fieldslogin.password,
//       isClient: true,
//       host: window.location.host,
//     };
//     dispatch(showAuthLoader())
//     dispatch(userSignIn(data));

//     // if(isLogin === true){
//       dispatch(domainSettingByDomain(domainSetting))
//     // }
//   };




//   return (
//     <>

//       <div className="gx-app-login-wrap gx-bg-grey">
//         <div className="gx-app-login-container ">
//           <div className="gx-app-login-main-content ">
//             <div className="gx-app-logo-content">
//               <div className="gx-app-logo-content-bg"></div>
//               <div className="gx-app-logo-wid">
//                 <h1><IntlMessages id="app.userAuth.signIn" /></h1>
//                 <p><IntlMessages id="app.userAuth.bySigning" /></p>
//               </div>
//               <div className="gx-app-logo">
//                 <img alt="example" src="/assets/images/logo.png" />
//               </div>
//             </div>
//             <div className="gx-app-login-content">
//               <Form
//                 initialValues={{ remember: true }}
//                 name="basic"
//                 className="gx-signin-form gx-form-row0"
//               >
//                 <Form.Item
//                   rules={[{ required: true, message: 'UserName can not be blank!' }]}
//                   name="username"
//                 >
//                   <Input
//                     placeholder="User Name"
//                     name="username"
//                     value={fieldslogin.username}
//                     onChange={inputChange}
//                     className="gx-border-redius0"
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   rules={[{ required: true, message: 'User Password can not be blank!' }]}
//                   name="password"
//                 >
//                   <Input
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     value={fieldslogin.password}
//                     onChange={inputChange}
//                     className="gx-border-redius0"

//                   />
//                 </Form.Item>
//                 <Button
//                       type="primary"
//                       className="gx-mb-0"
//                       htmlType="submit"
//                       onClick={loader ? null : () => onFinish()}
//                     >
//                       <IntlMessages id="app.userAuth.signIn" />
//                     </Button>
//               </Form>
//             </div>

//             {loader ?
//               <div className="gx-loader-view">
//                 <CircularProgress />
//               </div> : null}
//           </div>
//         </div>
//       </div>

//     </>
//   );
// };

// export default SignIn;

// import React, { useEffect, useState } from "react";
// import { Button, Form, Input, message } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { hideMessage, showAuthLoader, userLoginCheck, userSignIn, } from "../appRedux/actions";
// import IntlMessages from "util/IntlMessages";
// import CircularProgress from "../components/CircularProgress";
// import { domainSettingByDomain } from "../appRedux/actions/User";



// const SignIn = () => {
//   const [fieldslogin, setFieldsLogin] = useState({ username: '', password: '', otp: '' });
//   // const [showAdditionalField, setShowAdditionalField] = useState(false);
//   let showAdditionalField = false
//   const dispatch = useDispatch();
//   const { loader, showMessage, authUser, loginChek, isLogin } = useSelector(({ auth }) => auth);

//   const history = useHistory();
//   useEffect(() => {
//     if (showMessage) {
//       setTimeout(() => {
//         dispatch(hideMessage());
//       }, 100);
//     }
//     if (authUser !== null) {
//       history.push('/');
//     }
//   }, [authUser, dispatch, history, showMessage]);


//   const inputChange = (e) => {
//     const { name, value } = e.target;
//     if (!name || !value) {
//       return;
//     }
//     setFieldsLogin(prevFields => ({
//       ...prevFields,
//       [name]: value,
//     }));
//   };

//   const onFinish = values => {
//     // const { otp } = fieldslogin;

//     let domainSetting = {
//       "domainUrl": window.location.origin
//     };
//     const data = {
//       username: fieldslogin.username,
//       password: fieldslogin.password,
//       isClient: true,
//       host: window.location.host,
//     };
//     dispatch(showAuthLoader())
//     dispatch(userSignIn(data));

//     // if(isLogin === true){
//       dispatch(domainSettingByDomain(domainSetting))
//     // }
//   };




//   return (
//     <>

//       <div className="gx-app-login-wrap gx-bg-grey">
//         <div className="gx-app-login-container ">
//           <div className="gx-app-login-main-content ">
//             <div className="gx-app-logo-content">
//               <div className="gx-app-logo-content-bg"></div>
//               <div className="gx-app-logo-wid">
//                 <h1><IntlMessages id="app.userAuth.signIn" /></h1>
//                 <p><IntlMessages id="app.userAuth.bySigning" /></p>
//               </div>
//               <div className="gx-app-logo">
//                 <img alt="example" src="/assets/images/logo.png" />
//               </div>
//             </div>
//             <div className="gx-app-login-content">
//               <Form
//                 initialValues={{ remember: true }}
//                 name="basic"
//                 className="gx-signin-form gx-form-row0"
//               >
//                 <Form.Item
//                   rules={[{ required: true, message: 'UserName can not be blank!' }]}
//                   name="username"
//                 >
//                   <Input
//                     placeholder="User Name"
//                     name="username"
//                     value={fieldslogin.username}
//                     onChange={inputChange}
//                     className="gx-border-redius0"
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   rules={[{ required: true, message: 'User Password can not be blank!' }]}
//                   name="password"
//                 >
//                   <Input
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     value={fieldslogin.password}
//                     onChange={inputChange}
//                     className="gx-border-redius0"

//                   />
//                 </Form.Item>
//                 <Button
//                       type="primary"
//                       className="gx-mb-0"
//                       htmlType="submit"
//                       onClick={loader ? null : () => onFinish()}
//                     >
//                       <IntlMessages id="app.userAuth.signIn" />
//                     </Button>
               
//               </Form>
//             </div>

//             {loader ?
//               <div className="gx-loader-view">
//                 <CircularProgress />
//               </div> : null}
//           </div>
//         </div>
//       </div>

//     </>
//   );
// };

// export default SignIn;

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  hideMessage,
  showAuthLoader,
  userLoginCheck,
  userSignIn,
} from "../appRedux/actions";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "../components/CircularProgress";
import { domainSettingByDomain } from "../appRedux/actions/User";
import { LuLogIn } from "react-icons/lu";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";

const SignIn = () => {
  const [fieldslogin, setFieldsLogin] = useState({    username: "",
  password: "",
  otp: ""});


  // const [showAdditionalField, setShowAdditionalField] = useState(false);
  let showAdditionalField = false;
  const dispatch = useDispatch();
  const { loader, showMessage, authUser, loginChek, isLogin } = useSelector(
    ({ auth }) => auth
  );

  const history = useHistory();
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 100);
    }
    if (authUser !== null) {
      let domainSetting = {
        domainUrl: 	window.location.origin,
      };
      dispatch(domainSettingByDomain(domainSetting));
      history.push("/main/rules");
    }
  }, [authUser, dispatch, history, showMessage]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    if (!name) {
      return;
    }

    setFieldsLogin((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };
  

  const onFinish = (values) => {
    // const { otp } = fieldslogin;

   
    const data = {
      username: fieldslogin.username,
      password: fieldslogin.password,
      isClient: true,
      host: window.location.host,
    };
    dispatch(showAuthLoader());
    dispatch(userSignIn(data));

   
  };

  return (
    <>
      {/* <div className="gx-app-login-wrap ">
        <div className="gx-app-login-container ">
          <div className="gx-app-login-main-content ">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg"></div>
              <div className="gx-app-logo-wid">
                <h1><IntlMessages id="app.userAuth.signIn" /></h1>
                <p><IntlMessages id="app.userAuth.bySigning" /></p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src="/assets/images/logo.png" />
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form
                initialValues={{ remember: true }}
                name="basic"
                className="gx-signin-form gx-form-row0"
              >
                <Form.Item
                  rules={[{ required: true, message: 'UserName can not be blank!' }]}
                  name="username"
                >
                  <Input
                    placeholder="User Name"
                    name="username"
                    value={fieldslogin.username}
                    onChange={inputChange}
                    className="gx-border-redius0"
                  />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: 'User Password can not be blank!' }]}
                  name="password"
                >
                  <Input
                    type="password"fieldslogin.username
                <Button
                      type="primary"
                      className="gx-mb-0"
                      htmlType="submit"
                      onClick={loader ? null : () => onFinish()}
                    >
                      <IntlMessages id="app.userAuth.signIn" />
                    </Button>
              </Form>
            </div>

            {loader ?
              <div className="gx-loader-view">
                <CircularProgress />
              </div> : null}
          </div>
        </div>
      </div> */}
      <div
        style={{ width: "100vw", height: "100vh" }}
        className="gx-bg-flex gx-box-shadow gx-bg-grey  gx-justify-content-center gx-align-items-center"
      >
        <div style={{ maxWidth: "600px" , minWidth:"350px" }} className="gx-bg-white gx-rounded-sm gx-py-3">
          <div className="  gx-bg-flex gx-flex-column ">
            <div className=" gx-w-100">
              <div className=" gx-py-1 gx-bg-flex gx-justify-content-center gx-align-items-center">
                <img src={"/assets/images/logo.png"} alt="Neature" />
              </div>
            </div>
           
            <div className="gx-app-login-content gx-w-100  gx-py-1">
              <Form
                initialValues={{ remember: true }}
                name="basic"
                className="gx-signin-form gx-form-row0 "
              >
                <Form.Item
                  rules={[
                    { required: true, message: "User Name can not be blank!" },
                  ]}
                  name="username"
                  className=" gx-mb-2"
                >
                  <div className="gx-bg-flex">

                   <div style={{backgroundColor:"rgb(247 190 39 )"}} className="gx-p-3">
                  <FaUserAlt className="gx-text-black" />
                </div>
                  <Input
                    placeholder="UserName"
                    
                    name="username"
                    value={fieldslogin.username}
                    onChange={inputChange}
                    className="gx-border-redius0"
                    />
                    </div>
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "User Password can not be blank!",
                    },
                  ]}
                  name="password"
                    className=" gx-mb-2"
                >
                  <div className="gx-bg-flex">

<div style={{backgroundColor:"rgb(247 190 39 )"}} className="gx-p-3">
<FaLock className="gx-text-black" />
</div>
                  <Input
                    type="password"
                    placeholder="Password"
                    
                    name="password"
                    value={fieldslogin.password}
                    onChange={inputChange}
                    className="gx-border-redius0"
                  />
                  </div>
                </Form.Item>
                <Button
                  className="gx-mb-0 gx-w-100 gx-border-redius0 gx-font-weight-semi-bold gx-fs-lg gx-text-white"
                  style={{ 
                    backgroundColor: "rgb(247 190 39 )", 
                    border: "none",
                    display: 'flex',             
                    alignItems: 'center',      
                    justifyContent: 'center',    
                    position: 'relative'         
                  }}
                  htmlType="submit"
                  onClick={loader ? null : () => onFinish()}
                >
                     {loader &&   <div className="loaderSpinner "></div> } <div className="gx-px-2 gx-text-black">LOG IN  </div> <BiLogIn className="gx-text-black"  />
                </Button>
                 {/* <div className="gx-text-center gx-fs-md gx-my-2 gx-font-weight-semi-bold   gx-text-white gx-text-underline">
                  Note - This Website is not for Indian Territory
                </div>
                <div className="gx-text-center gx-fs-md gx-my-2 gx-font-weight-semi-bold    gx-text-white gx-text-underline">
                  <span className="gx-mx-2">Privacy Policy</span>
                  <span className="gx-mx-2"> Terms & Conditions</span>
                  <span className="gx-mx-2"> Rules & Regulations</span>
                </div> */}
              </Form>
            </div>

            {/* {loader ? (
              <div style={{ width: "100vw", height: "100vh" , backgroundColor:'rgba(0,0,0,0.6)' }}
              className="gx-bg-flex gx-position-absolute gx-top-0 gx-left-0 gx-justify-content-center gx-align-items-center">
                <div className="gx-loader-view">
                  <CircularProgress />
                </div>
              </div>
            ) : null} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;