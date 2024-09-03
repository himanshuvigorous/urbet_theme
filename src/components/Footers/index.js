import { Col, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CasinoCheckModal from "../CasinoCheckModal/CasinoCheckModal";
import { FaHome, FaSdCard, FaUserCircle } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { BsCash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { userSignOut } from "../../appRedux/actions";



const Footers = () => {
    const [betSlipData, setBetSlipData] = useState({});
    const [casinoDataModal, setCasinoDataModal] = useState(false);
    const history = useHistory()
    const dispatch = useDispatch()

    const handleCasinoOpen = (data) => {

        setBetSlipData({ ...data });
        setCasinoDataModal(true)
    }

    const handleClose = () => {
        setCasinoDataModal(false)
        setBetSlipData({})
    };

    const pathname = window.location.pathname;

    const getLinkClassName = (path) => {
      return pathname === path ? 'gx-fs-sm gx-font-weight-semibold gx-text-yellow' : 'gx-fs-sm gx-font-weight-semibold gx-text-white';
    };
    return (
        <>
            {casinoDataModal ?
                <CasinoCheckModal
                    handleClose={handleClose}
                    betSlipData={betSlipData}
                />
                :

                <Row>
      <Col
        xs={24}
        className="gx-bg-grey gx-py-1 gx-px-3 gx-bg-flex gx-position-relative gx-justify-content-between"
      >
        <div onClick={() => history.push('/main/dashboard')}>
          <div className={`gx-bg-flex gx-justify-content-center gx-align-items-center gx-flex-column ${getLinkClassName('/main/dashboard')}` }>
            <FaHome size={20} />
            <span >
              Home
            </span>
          </div>
        </div>
    
        <div onClick={() => history.push('/main/ledger')}>
          <div className={`gx-bg-flex gx-justify-content-center gx-align-items-center gx-flex-column ${getLinkClassName('/main/ledger')}` }>
            <MdPushPin size={20} />
            <span >
              My Ledger
            </span>
          </div>
        </div>
    
        <div onClick={() => history.push('/main/casino')}>
          <div className={`gx-bg-flex gx-justify-content-center gx-align-items-center gx-flex-column ${getLinkClassName('/main/casino')}` }>
            <BsCash size={20} />
            <span >
              Live Casino
            </span>
          </div>
        </div>
    
        <div onClick={() => history.push('/main/statement')}>
          <div className={`gx-bg-flex gx-justify-content-center gx-align-items-center gx-flex-column ${getLinkClassName('/main/statement')}` }>
            <FaSdCard size={20} />
            <span >
              Statement
            </span>
          </div>
        </div>
    
        <div onClick={() => dispatch(userSignOut())}>
          <div className={`gx-bg-flex gx-justify-content-center gx-align-items-center gx-flex-column ${getLinkClassName('/main/logout')}` }>
            <FaUserCircle size={20} />
            <span >
              Logout
            </span>
          </div>
        </div>
      </Col>
    </Row>
              
              
            }</>
    )
}

export default Footers;






















// import { Col, Row } from "antd";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import CasinoCheckModal from "../CasinoCheckModal/CasinoCheckModal";


// const Footers = () => {

//     const [betSlipData, setBetSlipData] = useState({});
//     const [casinoDataModal, setCasinoDataModal] = useState(false);
//     const history = useHistory()

//     const handleCasinoOpen = (data) => {
//         setBetSlipData({ ...data });
//         setCasinoDataModal(true)
//     }

//     const handleClose = () => {
//         setCasinoDataModal(false)
//         setBetSlipData({})
//     };

//     return (

//         <Row>
//             {casinoDataModal ?
//                 <CasinoCheckModal
//                     handleClose={handleClose}
//                     betSlipData={betSlipData}
//                 />
//                 :
//                 <Col xs={24} className="gx-bg-grey gx-py-1 gx-px-3 gx-bg-flex gx-position-relative gx-justify-content-between">
//                     <div onClick={() => {
//                         history.push('/main/dashboard');

//                     }} style={{ top: '-25px', left: '50%', transform: 'translateX(-50%)' }} className="gx-position-absolute">
//                         <div style={{ width: "50px", height: "50px", border: "8px solid #36454F", backgroundColor: "grey" }} className={` gx-rounded-circle   gx-bg-flex gx-justify-content-center gx-align-items-center `}>
//                             <img src="/assets/images/tvs-home.svg" alt="statement" width={28} height={28} />
//                         </div>
//                     </div>
//                     <div>
//                         <Link className={`gx-bg-flex gx-justify-content-center gx-align-items-center gx-flex-column ${getLinkClassName('/main/dashboard')}` } to='/main/statement'>
//                             <img src="/assets/images/statement-only.png" alt="statement" width={28} height={28} /><br />
//                             <span className="gx-fs-sm gx-font-weight-semibold gx-text-white">Account</span> </Link>
//                     </div>


//                     <div>
//                         <Link className={`gx-bg-flex gx-justify-content-center gx-align-items-center gx-flex-column ${getLinkClassName('/main/dashboard')}` } to='/main/ledger'>
//                             <img src="/assets/images/ledger-only.png" alt="statement" width={28} height={28} /><br />
//                             <span className="gx-fs-sm gx-font-weight-semibold gx-text-white">Ledger</span>
//                         </Link>
//                     </div>


//                     <div>
//                         {/* {/ <Link className={`gx-bg-flex gx-justify-content-center gx-align-items-center gx-flex-column ${getLinkClassName('/main/dashboard')}` } to='/main/dashboard'> /}
//                         {/ <img src="/assets/images/tvs-home.svg" alt="statement" width={28} height={28} /><br /> /}
//                         {/ <span className="gx-fs-sm gx-font-weight-semibold gx-text-white">Home</span> /}
//                     {/ </Link> /} */}
//                     </div>


//                     <div>
//                         <Col onClick={() => handleCasinoOpen({ image: "/assets/images/aviator.png", name: "Aviator", gameId: "201206", nameHindi: "एविएटर" })}>
//                             {/* <Link className={`gx-bg-flex gx-justify-content-center gx-align-items-center gx-flex-column ${getLinkClassName('/main/dashboard')}` } to={`/main/iframe-casino/${201206}`}> */}
//                            <img src="/assets/images/aviator.png" alt="statement" width={28} height={28} /><br />
//                         <span className="gx-fs-sm gx-font-weight-semibold gx-text-white">Aviator</span>
//                             {/* </Link> */}
//                         </Col>
//                     </div>


//                     <Col
//                         onClick={() => handleCasinoOpen({ image: "/assets/images/tvs-ludo.png", name: "Ludo", gameId: "600113", nameHindi: "लूडो" })}
//                     >
//                         {/* <Link className={`gx-bg-flex gx-justify-content-center gx-align-items-center gx-flex-column ${getLinkClassName('/main/dashboard')}` } to={`/main/iframe-casino/${600113}`}> */}
//                         <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
//                             <img alt="inage" src="/assets/images/tvs-ludo.png" />
//                             <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase ">LUDO</div>
//                         </div>
//                         {/* </Link> */}
//                     </Col>
//                 </Col>}
//         </Row >
//     )
// }

// export default Footers;