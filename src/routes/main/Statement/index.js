// // import React, { useEffect, useState } from "react";
// // import { Col, Row, DatePicker, Table } from "antd";
// // import Auxiliary from "util/Auxiliary";
// // import { useDispatch, useSelector } from "react-redux";
// // import moment from "moment";
// // import { getUserStatement } from "../../../appRedux/actions/User";
// // const { RangePicker } = DatePicker;

// // const Statement = () => {
// //   const [statementList, setStatementList] = useState([]);
// //   const [dateRange, setDateRange] = useState([moment().startOf('month'), moment().endOf('month')]);
// //   const dispatch = useDispatch();
// //   const { userStatement, loading } = useSelector(state => state.UserReducer);

// //   useEffect(() => {
// //     getUserStatementFun();
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (userStatement) {
// //       const filteredData = userStatement?.map((item, index) => ({
// //         key: `${index}`,
// //         createdAt: item.createdAt,
// //         remark: item.remark,
// //         amount: item.amount,
// //         newAmount: item.newAmount,
// //       }));
// //       setStatementList(filteredData);
// //     }
// //   }, [userStatement]);

// //   const getUserStatementFun = async () => {
// //     let reqData = {
// //       toDate: moment().format("YYYY-MM-DD"),
// //       fromDate: moment().subtract(60, "days").format("YYYY-MM-DD"),
// //     };
// //     dispatch(getUserStatement(reqData));
// //   };

// //   const onChange = (dates) => {
// //     setDateRange(dates);
// //   };

// //   return (
// //     <Auxiliary>
// //       <Row justify={"center"}>
// //         <Col sm={14} xs={22} className="gx-col-full " style={{ height: 200 }}>
// //           <div className="gx-py-2 gx-bg-yellow gx-my-2 gx-w-100">
// //             gh
// //           </div>
// //           <div className="gx-py-2 gx-bg-grey gx-bg-flex gx-justify-content-center gx-text-white gx-w-100">
// //           MY ACCOUNT STATEMENT ()
// //           </div>
// //           <div className="gx-my-3 gx-px-5 gx-bg-flex gx-bg-red">
// //             <div className="gx-w-50 gx-mt-3">
// //               <RangePicker
// //                 className="gx-border-redius0"
// //                 ranges={{
// //                   Today: [moment(), moment()],
// //                   Yesterday: [
// //                     moment().subtract(1, "days"),
// //                     moment().subtract(1, "days"),
// //                   ],
// //                   "This Week": [moment().startOf("week"), moment().endOf("week")],
// //                   "Last Week": [
// //                     moment().subtract(1, "week").startOf("week"),
// //                     moment().subtract(1, "week").endOf("week"),
// //                   ],
// //                   "This Month": [
// //                     moment().startOf("month"),
// //                     moment().endOf("month"),
// //                   ],
// //                   "Last Month": [
// //                     moment().subtract(1, "month").startOf("month"),
// //                     moment().subtract(1, "month").endOf("month"),
// //                   ],
// //                 }}
// //                 onChange={onChange}
// //                 style={{ width: 300 }}
// //                 value={dateRange}
// //               />
// //             </div>
// //             <div className="gx-w-50 gx-bg-flex gx-mb-3">
// //               <div className="gx-w-50 gx-bg-flex">
// //                 <div className="gx-bg-primary gx-border gx-w-25">All</div>
// //                 <div className="gx-bg-primary gx-border gx-w-25">P&L</div>
// //                 <div className="gx-bg-primary gx-border gx-w-25">Account</div>
// //                 <div className="gx-bg-primary gx-border gx-w-25"></div>
// //               </div>
// //             </div>
// //           </div>
// //           <Table className="gx-table-responsive" dataSource={statementList} pagination={false} bordered rowKey="createdAt">
// //             <Table.Column
// //             className="llllll"
// //               title="Date"
// //               dataIndex="createdAt"
// //               key="createdAt"
// //               render={text => moment(text).utcOffset("+05:30").format("DD MMM YY")}
// //             />
// //             <Table.Column
// //               title="Description"
// //             className="llllll"
// //               dataIndex="remark"
// //               key="remark"
// //               render={text => <div className="truncate">{text}</div>}
// //             />
// //             <Table.Column
// //               title="CREDIT"
// //             className="llllll"
// //               dataIndex="amount"
// //               key="credit"
// //               render={(text) => text > 0 ? <div className="text-[#52B5E1]">{Number.parseFloat(Math.abs(text)).toFixed(2).replace(/\.?0+$/, "")}</div> : 0}
// //             />
// //             <Table.Column
// //               title="DEBIT"
// //             className="llllll"
// //               dataIndex="amount"
// //               key="debit"
// //               render={(text) => text < 0 ? <div className="red-text">{Number.parseFloat(Math.abs(text)).toFixed(2).replace(/\.?0+$/, "")}</div> : 0}
// //             />
// //             <Table.Column
// //               title="Balance"
// //             className="llllll"
// //               dataIndex="balance"
// //               key="balance"
// //               render={text => Number.parseFloat(Math.abs(text)).toFixed(2).replace(/\.?0+$/, "")}
// //             />
// //           </Table>
// //         </Col>
// //       </Row>
// //     </Auxiliary>
// //   );
// // };

// // export default Statement;

// import React, { useEffect, useState } from "react";
// import { Col, Row, DatePicker, Table, Pagination, Button, Radio } from "antd";
// import Auxiliary from "util/Auxiliary";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
// import { getUserStatement } from "../../../appRedux/actions/User";
// import BackMenuButton from "../../../components/BackMenu";
// import Loader from "../../../components/loader";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";

// const { RangePicker } = DatePicker;

// const Statement = () => {
//   const [dateRange, setDateRange] = useState([
//     moment().startOf("month"),
//     moment().endOf("month"),
//   ]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [activeTab, setActiveTab] = useState(1);
//   const dispatch = useDispatch();
//   const { userStatement, loading } = useSelector((state) => state.UserReducer);
//   const [statementList, setStatementList] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [displayedData, setDisplayedData] = useState([]);

//   useEffect(() => {
//     fetchUserStatement();
//   }, [dateRange, currentPage, itemsPerPage]);

//   useEffect(() => {
//     if (userStatement) {
//       const transformedData = userStatement.map((item, index) => ({
//         key: `${index}`,
//         createdAt: item.createdAt,
//         remark: item.remark,
//         amount: item.amount,
//         newAmount: item.newAmount,
//         statementFor: item.statementFor,
//       }));
//       setStatementList(transformedData);
//     }
//   }, [userStatement]);

//   useEffect(() => {
//     filterData();
//   }, [statementList, activeTab]);

//   useEffect(() => {
//     updateDisplayedData();
//   }, [filteredData, currentPage]);

//   const fetchUserStatement = () => {
//     const reqData = {
//       fromDate: dateRange[0].format("YYYY-MM-DD"),
//       toDate: dateRange[1].format("YYYY-MM-DD"),
//       page: currentPage,
//       pageSize: itemsPerPage,
//     };
//     dispatch(getUserStatement(reqData));
//   };

//   const onChange = (dates) => {
//     setDateRange(dates);
//   };

//   const handleTabClick = (tabIndex) => {
//     setActiveTab(tabIndex);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page, pageSize) => {
//     setCurrentPage(page);
//     setItemsPerPage(pageSize);
//   };

//   const filterData = () => {
//     const data = statementList.filter((item) => {
//       if (activeTab === 1) return item.statementFor !== "All";
//       if (activeTab === 2) return item.statementFor !== "ACCOUNT_STATEMENT";
//       if (activeTab === 3) return item.statementFor === "ACCOUNT_STATEMENT";

//       return true;
//     });

//     let totalAmount = 0;
//     data.forEach((data) => {
//       totalAmount += data.amount;
//     });

//     let balance = 0;
//     let showAmount = 0;

//     const finalData = data.map((data) => {
//       balance = totalAmount - showAmount;
//       showAmount += data.amount;
//       return {
//         ...data,
//         balance: balance,
//       };
//     });

//     setFilteredData(finalData);
//     setDisplayedData([]);
//   };

//   const updateDisplayedData = () => {
//     const data = filteredData.slice(
//       (currentPage - 1) * itemsPerPage,
//       currentPage * itemsPerPage
//     );
//     setDisplayedData(data);
//   };

//   const itemRender = (current, type, originalElement) => {
//     if (type === "prev") {
//       return <a className="gx-px-2 gx-fs-sm gx-py-2 gx-bg-white gx-border gx-border-info">Prev</a>;
//     }
//     if (type === "next") {
//       return <a className="gx-px-2 gx-fs-sm gx-py-2 gx-border gx-bg-white gx-border-info">Next</a>;
//     }
//     return originalElement;
//   };

//   return (
//     <>

//       {loading ? <Loader props={loading} /> :
//         <Auxiliary>
//           <div className="gx-py-3 gx-w-100">
//             <BackMenuButton />
//           </div>
//           <Row justify={"center"}>
//             <Col sm={14} xs={24} className="gx-col-full " >

//               <div className="gx-py-2 gx-bg-grey gx-bg-flex gx-justify-content-center gx-text-white gx-w-100">
//                 MY ACCOUNT STATEMENT ({displayedData?.length || "-"})
//               </div>
//               <Row
//                 className="  gx-bg-flex  gx-align-items-center gx-w-100 gx-py-1"
//                 justify={"space-between"}
//               >
//                 <Col className="gx-mt-3 gx-py-md-0 gx-py-2 gx-px-4" sm={8} xs={24}>

//                   <RangePicker
//                     className="gx-border-redius0 gx-ml-2 gx-w-100"
//                     ranges={{
//                       Today: [moment(), moment()],
//                       Yesterday: [
//                         moment().subtract(1, "days"),
//                         moment().subtract(1, "days"),
//                       ],
//                       "This Week": [
//                         moment().startOf("week"),
//                         moment().endOf("week"),
//                       ],
//                       "Last Week": [
//                         moment().subtract(1, "week").startOf("week"),
//                         moment().subtract(1, "week").endOf("week"),
//                       ],
//                       "This Month": [
//                         moment().startOf("month"),
//                         moment().endOf("month"),
//                       ],
//                       "Last Month": [
//                         moment().subtract(1, "month").startOf("month"),
//                         moment().subtract(1, "month").endOf("month"),
//                       ],
//                     }}
//                     onChange={onChange}
//                     style={{ width: 300 }}
//                     value={dateRange}
//                   />

//                   {/* <span className="gx-px-2">
//              <Button className="gx-bg-grey gx-text-white gx-font-weight-bold gx-fs-xl gx-my-0" >
//                 Submit
//               </Button>
//              </span> */}
//                 </Col>
//                 <Col
//                   className="  gx-text-white gx-fs-lg gx-py-md-0 gx-py-2 gx-font-weight-bold gx-bg-flex gx-align-items-center gx-justify-content-start "
//                   sm={12} xs={24}
//                 >

//                   <Radio.Group
//                     size="small"

//                     className="gx-bg-flex gx-w-100 gx-py- gx-my-0 gx-align-items-center gx-justify-content-center  "

//                   >
//                     <Radio.Button
//                       className={`${activeTab === 1 ? "gx-bg-dark" : "gx-bg-primary"
//                         } gx-text-white gx-py- gx-my-0`}
//                       onClick={() => handleTabClick(1)}
//                       value="1"
//                     >
//                       All
//                     </Radio.Button>
//                     <Radio.Button
//                       className={`${activeTab === 2 ? "gx-bg-dark" : "gx-bg-primary"
//                         } gx-text-white gx-py- gx-my-0`}
//                       onClick={() => handleTabClick(2)}
//                       value="2"
//                     >
//                       P&L
//                     </Radio.Button>
//                     <Radio.Button
//                       className={`${activeTab === 3 ? "gx-bg-dark" : "gx-bg-primary"
//                         } gx-text-white gx-py- gx-my-0`}
//                       onClick={() => handleTabClick(3)}
//                       value="3"
//                     >
//                       Account
//                     </Radio.Button>
//                   </Radio.Group>

//                 </Col>
//               </Row>

//               <Table
//                 className="gx-table-responsive "
//                 dataSource={displayedData}
//                 pagination={false}
//                 bordered
//                 rowKey="createdAt"
//               >
//                 <Table.Column
//                   className="llllll"
//                   title="Date"
//                   dataIndex="createdAt"
//                   key="createdAt"
//                   render={(text) =>
//                     moment(text).utcOffset("+05:30").format("DD MMM YY")
//                   }
//                 />
//                 <Table.Column
//                   title="Description"
//                   className="llllll"
//                   dataIndex="remark"
//                   key="remark"
//                   render={(text) => <div className="truncate">{text}</div>}
//                 />
//                 <Table.Column
//                   title="CREDIT"
//                   className="llllll"
//                   dataIndex="amount"
//                   key="credit"
//                   render={(text) =>
//                     text > 0 ? (
//                       <div className="gx-text-primary gx-font-weight-bold gx-fs-md">
//                         {Number.parseFloat(Math.abs(text))
//                           .toFixed(2)
//                           .replace(/\.?0+$/, "")}
//                       </div>
//                     ) : (
//                       0
//                     )
//                   }
//                 />
//                 <Table.Column
//                   title="DEBIT"
//                   className="llllll"
//                   dataIndex="amount"
//                   key="debit"
//                   render={(text) =>
//                     text < 0 ? (
//                       <div className="gx-text-red gx-font-weight-bold gx-fs-md">
//                         {Number.parseFloat(Math.abs(text))
//                           .toFixed(2)
//                           .replace(/\.?0+$/, "")}
//                       </div>
//                     ) : (
//                       0
//                     )
//                   }
//                 />
//                 <Table.Column
//                   title="Balance"
//                   className="llllll"
//                   dataIndex="balance"
//                   key="balance"
//                   render={(text) =>
//                     <div className="gx-text-black gx-font-weight-bold gx-fs-md">
//                       {Number.parseFloat(Math.abs(text))
//                         .toFixed(2)
//                         .replace(/\.?0+$/, "")}
//                     </div>
//                   }
//                 />
//               </Table>
//               <Pagination
//                 className="gx-mt-3"
//                 current={currentPage}
//                 pageSize={itemsPerPage}
//                 total={filteredData.length}
//                 onChange={handlePageChange}
//                 itemRender={itemRender}
//                 showSizeChanger={false}
//               />
//               <div className="gx-py-4">
//                 <Link to='/main/dashboard/'>
//                   <div className="gx-bg-grey gx-py-1 gx-text-white gx-font-weight-semi gx-bg-flex gx-justify-content-center">
//                     BACK TO MAIN MENU
//                   </div>
//                 </Link>
//               </div>
//             </Col>
//           </Row>

//         </Auxiliary>
//       }

//     </>
//   );
// };

// export default Statement;







// import React, { useEffect, useState } from "react";
// import { Col, Row, DatePicker, Table } from "antd";
// import Auxiliary from "util/Auxiliary";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
// import { getUserStatement } from "../../../appRedux/actions/User";
// const { RangePicker } = DatePicker;

// const Statement = () => {
//   const [statementList, setStatementList] = useState([]);
//   const [dateRange, setDateRange] = useState([moment().startOf('month'), moment().endOf('month')]);
//   const dispatch = useDispatch();
//   const { userStatement, loading } = useSelector(state => state.UserReducer);

//   useEffect(() => {
//     getUserStatementFun();
//   }, [dispatch]);

//   useEffect(() => {
//     if (userStatement) {
//       const filteredData = userStatement?.map((item, index) => ({
//         key: `${index}`,
//         createdAt: item.createdAt,
//         remark: item.remark,
//         amount: item.amount,
//         newAmount: item.newAmount,
//       }));
//       setStatementList(filteredData);
//     }
//   }, [userStatement]);

//   const getUserStatementFun = async () => {
//     let reqData = {
//       toDate: moment().format("YYYY-MM-DD"),
//       fromDate: moment().subtract(60, "days").format("YYYY-MM-DD"),
//     };
//     dispatch(getUserStatement(reqData));
//   };

//   const onChange = (dates) => {
//     setDateRange(dates);
//   };

//   return (
//     <Auxiliary>
//       <Row justify={"center"}>
//         <Col sm={14} xs={22} className="gx-col-full " style={{ height: 200 }}>
//           <div className="gx-py-2 gx-bg-yellow gx-my-2 gx-w-100">
//             gh
//           </div>
//           <div className="gx-py-2 gx-bg-grey gx-bg-flex gx-justify-content-center gx-text-white gx-w-100">
//           MY ACCOUNT STATEMENT ()
//           </div>
//           <div className="gx-my-3 gx-px-5 gx-bg-flex gx-bg-red">
//             <div className="gx-w-50 gx-mt-3">
//               <RangePicker
//                 className="gx-border-redius0"
//                 ranges={{
//                   Today: [moment(), moment()],
//                   Yesterday: [
//                     moment().subtract(1, "days"),
//                     moment().subtract(1, "days"),
//                   ],
//                   "This Week": [moment().startOf("week"), moment().endOf("week")],
//                   "Last Week": [
//                     moment().subtract(1, "week").startOf("week"),
//                     moment().subtract(1, "week").endOf("week"),
//                   ],
//                   "This Month": [
//                     moment().startOf("month"),
//                     moment().endOf("month"),
//                   ],
//                   "Last Month": [
//                     moment().subtract(1, "month").startOf("month"),
//                     moment().subtract(1, "month").endOf("month"),
//                   ],
//                 }}
//                 onChange={onChange}
//                 style={{ width: 300 }}
//                 value={dateRange}
//               />
//             </div>
//             <div className="gx-w-50 gx-bg-flex gx-mb-3">
//               <div className="gx-w-50 gx-bg-flex">
//                 <div className="gx-bg-primary gx-border gx-w-25">All</div>
//                 <div className="gx-bg-primary gx-border gx-w-25">P&L</div>
//                 <div className="gx-bg-primary gx-border gx-w-25">Account</div>
//                 <div className="gx-bg-primary gx-border gx-w-25"></div>
//               </div>
//             </div>
//           </div>
//           <Table className="gx-table-responsive" dataSource={statementList} pagination={false} bordered rowKey="createdAt">
//             <Table.Column
//             className="llllll"
//               title="Date"
//               dataIndex="createdAt"
//               key="createdAt"
//               render={text => moment(text).utcOffset("+05:30").format("DD MMM YY")}
//             />
//             <Table.Column
//               title="Description"
//             className="llllll"
//               dataIndex="remark"
//               key="remark"
//               render={text => <div className="truncate">{text}</div>}
//             />
//             <Table.Column
//               title="CREDIT"
//             className="llllll"
//               dataIndex="amount"
//               key="credit"
//               render={(text) => text > 0 ? <div className="text-[#52B5E1]">{Number.parseFloat(Math.abs(text)).toFixed(2).replace(/\.?0+$/, "")}</div> : 0}
//             />
//             <Table.Column
//               title="DEBIT"
//             className="llllll"
//               dataIndex="amount"
//               key="debit"
//               render={(text) => text < 0 ? <div className="red-text">{Number.parseFloat(Math.abs(text)).toFixed(2).replace(/\.?0+$/, "")}</div> : 0}
//             />
//             <Table.Column
//               title="Balance"
//             className="llllll"
//               dataIndex="balance"
//               key="balance"
//               render={text => Number.parseFloat(Math.abs(text)).toFixed(2).replace(/\.?0+$/, "")}
//             />
//           </Table>
//         </Col>
//       </Row>
//     </Auxiliary>
//   );
// };

// export default Statement;

import React, { useEffect, useState } from "react";
import { Col, Row, DatePicker, Table, Pagination, Button, Radio } from "antd";
import Auxiliary from "util/Auxiliary";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getUserStatement } from "../../../appRedux/actions/User";
import BackMenuButton from "../../../components/BackMenu";
import Loader from "../../../components/loader";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";

const Statement = () => {
  const [dateRange, setDateRange] = useState([
    moment().startOf("month"),
    moment().endOf("month"),
  ]);
  const [dates, setDates] = useState(dateRange);
  const [userLists, setUserLists] = useState([]);
  const { userId } = useParams();
  const [currentPage, setCurrentPage] = useState(1)
  const [totalSize, setTotalSize] = useState('')
  const [activeTab, setActiveTab] = useState(1);
  const [paginationicon, setPaginationIcon] = useState(true)
  const pageSize = 20;
  const dispatch = useDispatch();
  const { userStatement, loading, balanceAmount, message } = useSelector(state => state.UserReducer)
  const { userStatementMessage } = useSelector(state => state.UserReducer)

  const [displayedData, setDisplayedData] = useState([]);
  useEffect(() => {
    getUserStatementFun()
  }, [dispatch, currentPage, userId]);

  useEffect(() => {
    if (userStatement?.statementData) {
      let balance = Number(userStatement.balanceAmount);
      const reversedData = [...userStatement.statementData].reverse();
      const filteredData = reversedData.map((item, index) => {
        balance += Number(item.amount);
        return {
          key: `${index}`,
          createdAt: item.createdAt,
          remark: item.remark,
          amount: item.amount,
          newAmount: balance,
          statementFor: item.statementFor,
        };
      });
      const finalData = filteredData.reverse();
      setUserLists(finalData);
      setTotalSize(userStatement?.totalCount);
      setPaginationIcon(true);
      return;
    }
    if (userStatementMessage) {
      let balance = Number(userStatementMessage.message);
      const reversedData = [...userStatementMessage?.data].reverse();
      const filteredData = reversedData?.map((item, index) => {
        balance += Number(item.amount);
        return {
          key: `${index}`,
          createdAt: item.createdAt,
          remark: item.remark,
          amount: item.amount,
          newAmount: balance,
          statementFor: item.statementFor,
        };
      });
      const finalData = filteredData.reverse();
      setUserLists(finalData);
      setPaginationIcon(false)
      return;
    }
  }, [userStatement]);


  useEffect(() => {
    setDisplayedData([]);
    filterData();
  }, [userLists, activeTab]);

  const getUserStatementFun = async () => {
    let reqData = {
      userId: userId,
      pageNo: currentPage,
      size: pageSize
    };
    dispatch(getUserStatement(reqData))
  }

  const RangePicker = DatePicker.RangePicker;

  const onChange = (dates) => {
    setDates(dates);
    const reqData = {
      userId: userId,
      toDate: dates[1].format("YYYY-MM-DD"),
      fromDate: dates[0].format("YYYY-MM-DD"),
    };
    dispatch(getUserStatement(reqData));
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const filterData = () => {
    const data = userLists?.filter((item) => {
      if (activeTab === 1) return item.statementFor !== "All";
      if (activeTab === 2) return item.statementFor !== "ACCOUNT_STATEMENT";
      if (activeTab === 3) return item.statementFor === "ACCOUNT_STATEMENT";
      return true;
    });
  return setDisplayedData(data)
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    setCurrentPage(1);
    return setDisplayedData([]);
  };

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <a className="gx-px-2 gx-fs-sm gx-py-2 gx-bg-white gx-border gx-border-info">Prev</a>;
    }
    if (type === "next") {
      return <a className="gx-px-2 gx-fs-sm gx-py-2 gx-border gx-bg-white gx-border-info">Next</a>;
    }
    return originalElement;
  };
  return (
    <>

      {loading ? <Loader props={loading} /> :
        <Auxiliary>
          <div className="gx-py-3 gx-w-100">
            <BackMenuButton />
          </div>
          <Row justify={"center"}>
            <Col sm={14} xs={24} className="gx-col-full " >

              <div className="gx-py-2 gx-bg-grey gx-bg-flex gx-justify-content-center gx-text-white gx-w-100">
                MY ACCOUNT STATEMENT ({userLists?.length || "-"})
              </div>
              <Row
                className="  gx-bg-flex  gx-align-items-center gx-w-100 gx-py-1"
                justify={"space-between"}
              >
                <Col className="gx-mt-3 gx-py-md-0 gx-py-2 gx-px-4" sm={8} xs={24}>

                  <RangePicker
                    className="gx-border-redius0 gx-ml-2 gx-w-100"
                    ranges={{
                      Today: [moment(), moment()],
                      Yesterday: [
                        moment().subtract(1, "days"),
                        moment().subtract(1, "days"),
                      ],
                      "This Week": [
                        moment().startOf("week"),
                        moment().endOf("week"),
                      ],
                      "Last Week": [
                        moment().subtract(1, "week").startOf("week"),
                        moment().subtract(1, "week").endOf("week"),
                      ],
                      "This Month": [
                        moment().startOf("month"),
                        moment().endOf("month"),
                      ],
                      "Last Month": [
                        moment().subtract(1, "month").startOf("month"),
                        moment().subtract(1, "month").endOf("month"),
                      ],
                    }}
                    onChange={onChange}
                    style={{ width: 300 }}
                    value={dates}
                  />
                </Col>
                <Col
                  className="  gx-text-white gx-fs-lg gx-py-md-0 gx-py-2 gx-font-weight-bold gx-bg-flex gx-align-items-center gx-justify-content-start "
                  sm={12} xs={24}
                >
                  <Radio.Group
                    size="small"
                    className="gx-bg-flex gx-w-100 gx-py- gx-my-0 gx-align-items-center gx-justify-content-center  "
                  >
                    <Radio.Button
                      className={`${activeTab === 1 ? "gx-bg-dark" : "gx-bg-primary"
                        } gx-text-white gx-py- gx-my-0`}
                      onClick={() => handleTabClick(1)}
                      value="1"
                    >
                      All
                    </Radio.Button>
                    <Radio.Button
                      className={`${activeTab === 2 ? "gx-bg-dark" : "gx-bg-primary"
                        } gx-text-white gx-py- gx-my-0`}
                      onClick={() => handleTabClick(2)}
                      value="2"
                    >
                      P&L
                    </Radio.Button>
                    <Radio.Button
                      className={`${activeTab === 3 ? "gx-bg-dark" : "gx-bg-primary"
                        } gx-text-white gx-py- gx-my-0`}
                      onClick={() => handleTabClick(3)}
                      value="3"
                    >
                      Account
                    </Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
              <Table
                className="gx-table-responsive "
                dataSource={displayedData}
                pagination={false}
                bordered
                rowKey="createdAt"
              >
                <Table.Column
                  className="llllll gx-text-nowrap"
                  title="Date"
                  dataIndex="createdAt"
                  key="createdAt"
                  render={(text) =>
                    moment(text).utcOffset("+05:30").format("DD MMM YY")
                  }
                />
                <Table.Column
                  title="Description"
                  className="llllll gx-text-nowrap"
                  dataIndex="remark"
                  key="remark"
                  render={(text) => <div className="truncate">{text}</div>}
                />
                <Table.Column
                  title="CREDIT"
                  className="llllll gx-text-nowrap"
                  dataIndex="amount"
                  key="credit"
                  render={(text) =>
                    text > 0 ? (
                      <div className="gx-text-primary gx-font-weight-bold gx-fs-md">
                        {Number.parseFloat(Math.abs(text))
                          .toFixed(2)
                          .replace(/\.?0+$/, "")}
                      </div>
                    ) : (
                      0
                    )
                  }
                />
                <Table.Column
                  title="DEBIT"
                  className="llllll gx-text-nowrap"
                  dataIndex="amount"
                  key="debit"
                  render={(text) =>
                    text < 0 ? (
                      <div className="gx-text-red gx-font-weight-bold gx-fs-md">
                        {Number.parseFloat(Math.abs(text))
                          .toFixed(2)
                          .replace(/\.?0+$/, "")}
                      </div>
                    ) : (
                      0
                    )
                  }
                />
                <Table.Column
                  title="Balance"
                  className="llllll gx-text-nowrap"
                  dataIndex="newAmount"
                  key="balance"
                  render={(text) =>
                    <div className="gx-text-black gx-font-weight-bold gx-fs-md">
                      {Number.parseFloat(Math.abs(text))
                        .toFixed(2)
                        .replace(/\.?0+$/, "")}
                    </div>
                  }
                />
              </Table>
              {paginationicon && <Pagination
                className="gx-mt-3"
                current={currentPage}
                pageSize={pageSize}
                total={totalSize}
                onChange={handlePageChange}
                itemRender={itemRender}
                showSizeChanger={false}
              />
              }
              <div className="gx-py-4">
                <Link to='/main/dashboard/'>
                  <div className="gx-bg-grey gx-py-1 gx-text-white gx-font-weight-semi gx-bg-flex gx-justify-content-center">
                    BACK TO MAIN MENU
                  </div>
                </Link>
              </div>
            </Col>
          </Row>
        </Auxiliary>
      }
    </>
  );
};

export default Statement;