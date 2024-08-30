// import React, { useEffect, useState } from "react";
// import { Card, Col, Row, Spin, Table, Tag } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { PiTelevisionSimpleBold } from "react-icons/pi";
// import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { getMatchList } from "../../../appRedux/actions/User";
// import { ResponsiveContainer } from "recharts";

// const columns = [
//   {
//     title: "S/N",
//     dataIndex: "sn",
//     key: "sn",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//     // render: (value, row) => <span className="gx-text-nowrap">{row.name}</span>
//   },
//   {
//     title: "Open Date",
//     dataIndex: "opendate",
//     key: "opendate",
//     render: (value, row) => (
//       <span className="gx-text-nowrap">{row.opendate}</span>
//     ),
//   },
//   {
//     title: "Competition",
//     dataIndex: "competition",
//     key: "competition",
//   },
//   {
//     title: "Inplay",
//     dataIndex: "inplay",
//     key: "inplay",
//     render: () => (
//       <Tag color="#108ee9" className="gx-border-redius0">
//         Inplay
//       </Tag>
//     ),
//   },
//   {
//     title: "Details",
//     dataIndex: "",
//     key: "x",
//     render: (text, record) => (
//       <Link
//         to={`/main/match-deatils/${record.marketId}/${record.eventId}`}
//         className="link-button"
//       >
//         Details
//       </Link>
//     ),
//   },
// ];


// const Matches = () => {
//   const { matchList, loadingMatch } = useSelector((state) => state.UserReducer);
//   const [matchData, setMatchData] = useState([]);
//   const dispatch = useDispatch();


//   useEffect(() => {
//     // localStorage.removeItem('matchList');
//     dispatch(getMatchList());
//   }, []);

//   let adminMatchList = JSON.parse(localStorage.getItem('matchList'));
//   useEffect(() => {
//     let matchListData = adminMatchList ? adminMatchList : matchList;
//     if (matchListData) {
//       const data = matchListData?.map((item, index) => ({
//         key: item._id,
//         sn: index + 1,
//         name: item.matchName,
//         matchDate: item.matchDate,
//         seriesName: item.seriesName,
//         inplay: item.status,
//         matchName: item.matchName,
//         marketId: item.marketId,
//         eventId: item.eventId,
//         cacheUrl: item.cacheUrl

//       }));
//       setMatchData(data);
//     }
//   }, [matchList]);

//   const contentStyle = {
//     padding: 50,
//     background: "rgba(0, 0, 0, 0.05)",
//     borderRadius: 4,
//   };

//   const content = <div style={contentStyle} />;
//   const history = useHistory()

//   return (
//     <>
//       {/* {loadingMatch ? (
//         <div style={{ display: "flex", flexDirection: "column", gap: "small" }}>
//           <div
//             style={{ display: "flex", justifyContent: "center", gap: "small" }}
//           >
//             <Spin tip="Loading..." size="large">
//               {" "}
//               {content}
//             </Spin>
//           </div>
//         </div>
//       ) : ( */}

     
//       <Card title="Active Matches ">
//         {/* <Table className="gx-table-responsive "
//             columns={columns}
//             dataSource={matchData}
//             bordered
//             pagination={false}
//             size="small"
//           /> */}
//         {matchData?.map((element, index) =>
//           <Row
//             gutter={20}
//             onClick={() => history.push(`/main/match-deatils/${element.marketId}/${element.eventId}/${encodeURIComponent(element.cacheUrl)}`)}
//             // onClick={() => history.push(`/main/match-deatils/${element.marketId}/${element.eventId}`)}
//             className="gx-bg-flex gx-px-2 gx-py-3  gx-box-shadow gx-align-items-center gx-justify-content-start"
//             key={index}
//           >
//             <Col lg={5}>
//               <div className="gx-fs-md gx-d-none gx-d-lg-block gx-font-weight-semi-bold gx-pb-1">
//                 {element?.seriesName}
//               </div>
//               <div
//                 style={{
//                   borderTopRightRadius: "100px",
//                   borderBottomRightRadius: "100px",
//                 }}
//                 className="gx-px-1  gx-bg-grey responsive-text  gx-text-white gx-py-2"
//               >
//                 <div className="gx-text-truncate gx-my-1 gx-font-weight-semi-bold ">
//                   {element?.matchName}
//                 </div>
//                 <div className="">{element?.matchDate}</div>
//               </div>

//             </Col>
//             <Col
//               className="gx-bg-flex gx-px-2 gx-align-items-center gx-justify-content-center"
//               lg={4} xl={5}
//             >
//               {element.inplay === 'INPLAY' ? <div className="newBlinking gx-mx-1 "></div> : null}
//               <span className="gx-mx-1 gx-text-primary gx-fs-lg"><PiTelevisionSimpleBold /></span>
//               <span className="gx-mx-1 gx-text-primary gx-font-italic gx-fs-lg">B</span>
//               <span className="gx-mx-1 gx-text-primary gx-font-italic gx-fs-lg">F</span>
//             </Col>
//             <Col className="gx-bg-flex gx-my-1" lg={12}>
//               <div
//                 style={{ width: "9rem", gap: "3px" }}
//                 className="inplayElement matchdtailsYesBackground"
//               >
//                 {Math.random().toFixed(2)}
//               </div>
//               <div
//                 style={{ width: "9rem", gap: "3px" }}
//                 className="inplayElement matchdtailsNoBackground"
//               >
//                 {Math.random().toFixed(2)}
//               </div>
//               <div
//                 style={{ width: "9rem", gap: "3px" }}
//                 className="inplayElement matchdtailsYesBackground"
//               >
//                 {Math.random().toFixed(2)}
//               </div>
//               <div
//                 style={{ width: "9rem", gap: "3px" }}
//                 className="inplayElement matchdtailsNoBackground"
//               >
//                 {Math.random().toFixed(2)}
//               </div>
//               <div
//                 style={{ width: "9rem", gap: "3px" }}
//                 className="inplayElement matchdtailsYesBackground"
//               >
//                 {Math.random().toFixed(2)}
//               </div>
//               <div
//                 style={{ width: "9rem", gap: "3px" }}
//                 className="inplayElement matchdtailsNoBackground"
//               >
//                 {Math.random().toFixed(2)}
//               </div>
//             </Col>
//             <div className="gx-fs-md gx-px-2 gx-d-lg-none gx-d-block gx-font-weight-semi-bold gx-pb-1">
//               {element?.seriesName}
//             </div>
//           </Row>
//         )}
//       </Card>
//       {/* )} */}
//     </>
//   );
// };

// export default Matches;



















import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spin, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PiCricketFill, PiTelevisionSimpleBold } from "react-icons/pi";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getMatchList } from "../../../appRedux/actions/User";
import { FaTableTennis } from "react-icons/fa";
import { IoFootballSharp } from "react-icons/io5";

const columns = [
  {
    title: "S/N",
    dataIndex: "sn",
    key: "sn",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // render: (value, row) => <span className="gx-text-nowrap">{row.name}</span>
  },
  {
    title: "Open Date",
    dataIndex: "opendate",
    key: "opendate",
    render: (value, row) => (
      <span className="gx-text-nowrap">{row.opendate}</span>
    ),
  },
  {
    title: "Competition",
    dataIndex: "competition",
    key: "competition",
  },
  {
    title: "Inplay",
    dataIndex: "inplay",
    key: "inplay",
    render: () => (
      <Tag color="#108ee9" className="gx-border-redius0">
        Inplay
      </Tag>
    ),
  },
  {
    title: "Details",
    dataIndex: "",
    key: "x",
    render: (text, record) => (
      <Link
        to={`/main/match-deatils/${record.marketId}/${record.eventId}`}
        className="link-button"
      >
        Details
      </Link>
    ),
  },
];

const Matches = () => {
  const { matchList, loadingMatch } = useSelector((state) => state.UserReducer);
  const [matchData, setMatchData] = useState([]);
  const [activeTab, setActiveTab] = useState(4);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // localStorage.removeItem('matchList');
  //   dispatch(getMatchList());
  // }, []);

  // let adminMatchList = JSON.parse(localStorage.getItem("matchList"));
  // useEffect(() => {
  //   let matchListData = adminMatchList ? adminMatchList : matchList;
  //   const sortedSessions = matchListData?.sort((a, b) => a.priority - b.priority);
  //   if (sortedSessions) {
  //     const data = sortedSessions?.filter(element=> element.sportId === activeTab)?.map((item, index) => ({
  //       key: item._id,
  //       sn: index + 1,
  //       name: item.matchName,
  //       matchDate: item.matchDate,
  //       seriesName: item.seriesName,
  //       inplay: item.status,
  //       matchName: item.matchName,
  //       marketId: item.marketId,
  //       eventId: item.eventId,
  //       cacheUrl: item.cacheUrl,
  //     }));
  //     setMatchData(data);
  //   }
  // }, [matchList,activeTab]);



  const parseMatchDate = (dateString) => {

    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    const isPM = timePart.includes('PM');
    
    let hour = parseInt(hours, 10);
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
  
    return new Date(year, month - 1, day, hour, minutes);
  };
  useEffect(() => {
    // localStorage.removeItem('matchList');
    dispatch(getMatchList());
  }, []);

  let adminMatchList = JSON.parse(localStorage.getItem('matchList'));

  useEffect(() => {
    let matchListData = adminMatchList ? adminMatchList : matchList;

    // Filter matches by sportId and sort by date
    const filteredAndSortedData = matchListData?.filter(element=> element.sportId === activeTab)?.map((item, index) => ({
        key: item._id,
        sn: index + 1,
        name: item.matchName,
        matchDate: item.matchDate,
        seriesName: item.seriesName,
        inplay: item.status,
        matchName: item.matchName,
        marketId: item.marketId,
        eventId: item.eventId,
        cacheUrl: item.cacheUrl
      }))
      .sort((a, b) => parseMatchDate(a.matchDate) - parseMatchDate(b.matchDate)); // Sort by matchDate
console.log(filteredAndSortedData, "filteredAndSortedDatafilteredAndSortedData");
console.log(activeTab, "activeTab");
    setMatchData(filteredAndSortedData);
  }, [matchList, activeTab]); // Dependency array

  const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;
  const history = useHistory();
  return (
    <>
      {/* {loadingMatch ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "small" }}>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "small" }}
          >
            <Spin tip="Loading..." size="large">
              {" "}
              {content}
            </Spin>
          </div>
        </div>
      ) : ( */}
      {/* <Card title=""> */}
        {/* <div style={{ backgroundColor: "rgb(240,240,240)" }}> */}
          <Row className="gx-px-2  gx-border-bottom-2" style={{ backgroundColor: "rgb(240,240,240)"}} >
            <Col className="gx-my-2" xs={8}>
              <Button onClick={() => {setActiveTab(4)}}
               
                
                className={`gx-w-100 gx-border-0 gx-pl-0 gx-pl-0   gx-m-0 ${
                  activeTab === 4
                    ? "gx-bg-grey gx-text-white gx-box-shadow"
                    : "gx-bg-white gx-text-black"
                }   `}
              >
                <span className="gx-bg-flex gx-gap-4 gx-mx-auto  gx-justify-content-center gx-align-items-center"><PiCricketFill /> <span>Cricket</span></span>
               
              </Button>
            </Col>
            <Col  className="gx-my-2" xs={8}>
              <Button onClick={() => setActiveTab(1)}
              
                className={`gx-w-100 gx-border-0 gx-pl-0   gx-m-0 ${
                  activeTab === 1
                    ? "gx-bg-grey gx-text-white gx-box-shadow"
                    : "gx-bg-white gx-text-black"
                }   `}
              >
              <span className="gx-bg-flex gx-gap-4 gx-mx-auto  gx-justify-content-center gx-align-items-center"><IoFootballSharp /> <span>Football</span></span>

              </Button>
            </Col>
            <Col  className="gx-my-2" xs={8}>
              <Button
                onClick={() => {
                  console.log('Button clicked!');
                  setActiveTab(2)
                }}
            
               
                className={`gx-w-100 gx-border-0 gx-pl-0   gx-m-0 ${
                  activeTab === 2
                    ? "gx-bg-grey gx-text-white gx-box-shadow"
                    : "gx-bg-white gx-text-black "
                }   `}
              >
                <span className="gx-bg-flex gx-gap-4 gx-mx-auto  gx-justify-content-center gx-align-items-center"><FaTableTennis size={15} /> <span>Tennis</span></span>
              </Button>
            </Col>
           
          </Row>
         
        {/* </div> */}
        {matchData?.length > 0  ? matchData?.map((element, index) => (
            <Row
            justify={"center"}
              // gutter={20}
              onClick={() => history.push( `/main/match-deatils/${element.marketId}/${ element.eventId }`)}
              // onClick={() => history.push(`/main/match-deatils/${element.marketId}/${element.eventId}`)}
              className="gx-bg-flex gx-px-2 gx-py-3  gx-box-shadow gx-align-items-center gx-justify-content-start"
              key={index}
            >
              <Col lg={5}>
                <div className="gx-fs-md gx-d-none gx-d-lg-block gx-font-weight-semi-bold gx-pb-1">
                  {element?.seriesName}
                </div>
                <div
                  style={{
                    borderTopRightRadius: "100px",
                    borderBottomRightRadius: "100px",
                  }}
                  className="gx-px-1  gx-bg-grey responsive-text  gx-text-white gx-py-2"
                >
                  <div className="gx-text-truncate gx-my-1 gx-font-weight-semi-bold ">
                    {element?.matchName}
                  </div>
                  <div className="">{element?.matchDate}</div>
                </div>
              </Col>
              <Col
                className="gx-bg-flex gx-px-2 gx-align-items-center gx-justify-content-center"
                lg={4}
                xl={5}
              >
                {element.inplay === "INPLAY" ? (
                  <div className="newBlinking gx-mx-1 "></div>
                ) : null}
                <span className="gx-mx-1 gx-text-primary gx-fs-lg">
                  <PiTelevisionSimpleBold />
                </span>
                <span className="gx-mx-1 gx-text-primary gx-font-italic gx-fs-lg">
                  B
                </span>
                <span className="gx-mx-1 gx-text-primary gx-font-italic gx-fs-lg">
                  F
                </span>
              </Col>
              <Col className="gx-bg-flex gx-my-1" lg={12}>
                <div
                  style={{ width: "9rem", gap: "3px" }}
                  className="inplayElement matchdtailsYesBackground"
                >
                  {Math.random().toFixed(2)}
                </div>
                <div
                  style={{ width: "9rem", gap: "3px" }}
                  className="inplayElement matchdtailsNoBackground"
                >
                  {Math.random().toFixed(2)}
                </div>
                <div
                  style={{ width: "9rem", gap: "3px" }}
                  className="inplayElement matchdtailsYesBackground"
                >
                  {Math.random().toFixed(2)}
                </div>
                <div
                  style={{ width: "9rem", gap: "3px" }}
                  className="inplayElement matchdtailsNoBackground"
                >
                  {Math.random().toFixed(2)}
                </div>
                <div
                  style={{ width: "9rem", gap: "3px" }}
                  className="inplayElement matchdtailsYesBackground"
                >
                  {Math.random().toFixed(2)}
                </div>
                <div
                  style={{ width: "9rem", gap: "3px" }}
                  className="inplayElement matchdtailsNoBackground"
                >
                  {Math.random().toFixed(2)}
                </div>
              </Col>
              <div className="gx-fs-md gx-px-2 gx-d-lg-none gx-d-block gx-font-weight-semi-bold gx-pb-1">
                {element?.seriesName}
              </div>
            </Row>
          ))
          :
          <div className="gx-text-center gx-text-black gx-fs-lg gx-font-weight-semi-bold gx-py-2"> No Match Found</div>
        
        }
      {/* </Card> */}
      {/* {/ )} /} */}
    </>
  );
};

export default Matches;
