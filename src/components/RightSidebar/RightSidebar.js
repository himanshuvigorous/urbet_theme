import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Table } from "antd";
import { getMatchList } from "../../appRedux/actions/User";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AiFillCaretDown } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const { Option } = Select;

const parseMatchDate = (dateString) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");
  const isPM = timePart.includes("PM");

  let hour = parseInt(hours, 10);
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;

  return new Date(year, month - 1, day, hour, minutes);
};

function RightSidebar() {



  
  const columns = [
    {
      title: "Team",
      onHeaderCell: (column) => ({
        style: {
          background: "#CCCCCC",
          color:"black",
          fontWeight:"bold"
        },
      }),
      dataIndex: "team",
      key: "team",
      className: "px-[6px] py-3 whitespace-nowrap",
    },
    {
      title: "Mode",
      onHeaderCell: (column) => ({
        style: {
          background: "#CCCCCC",
          color:"black",
          fontWeight:"bold"
        },
      }),
      dataIndex: "mode",

      key: "mode",
      className: "px-[6px] py-3 whitespace-nowrap",
    },
    {
      title: "Run",
      onHeaderCell: (column) => ({
        style: {
          background: "#CCCCCC",
          color:"black",
          fontWeight:"bold"
        },
      }),
      dataIndex: "run",
      key: "run",
      className: "px-[6px] py-3 whitespace-nowrap",
    },
    {
      title: "Rate",
      onHeaderCell: (column) => ({
        style: {
          background: "#CCCCCC",
          color:"black",
          fontWeight:"bold"
        },
      }),
      dataIndex: "rate",

      key: "rate",
      className: "px-[6px] py-3 whitespace-nowrap",
    },
    {
      title: "Amount",
      onHeaderCell: (column) => ({
        style: {
          background: "#CCCCCC",
          color:"black",
          fontWeight:"bold"
        },
      }),
      dataIndex: "amount",
      key: "amount",
      className: "px-[6px] py-3 whitespace-nowrap",
    },
  ];
  const customLocale = {
    emptyText: <div></div>,
  };

  return (
    <>
    {/* <Row id="betPLaceModal"
         justify={"center"}
         >
          {timeLeft > 0 && (
            <Col
              style={{ border: "2px solid #8B8000" }}
              className="gx-px-0 gx-py-0 gx-rounded-lg gx-d-none gx-d-lg-block  gx-mx-0 gx-my-2"
              xs={24}
              sm={22}
            >
              <div className="gx-my-1 gx-mx-1">
                <div className="gx-bg-flex gx-align-items-center gx-fs-xl  gx-px-5 ">
                  <div
                    style={{ gap: "20px" }}
                  // className={`gx-bg-flex   gx-justify-content-between ${betModalData?.printData === 'Lagai' || betModalData?.printData === 'Yes' ? 'gx-text-blue' : betModalData?.printData === 'Khai' || betModalData?.printData === 'No' ? 'gx-text-red' : 'gx-text-black'
                  //   }`}
                  >
                    <span>{betModalData?.sessionName} </span>

                    <span>
                      Rate : {betModalData?.odds} [{betModalData?.runs ? betModalData?.runs : "0"}]
                      <span style={{ color: betModalData?.printData === 'No' || betModalData?.printData === 'Khai' ? '#FAA9BA' : betModalData?.printData === 'Yes' || betModalData?.printData === 'Lagai' ? '#72BBEF' : '#fff' }}>

                        (
                        {betModalData?.printData ? betModalData?.printData : ""})
                      </span>

                    </span>
                  </div>
                  <span
                    style={{ width: "30px", height: "30px" }}
                    className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-align-items-center gx-rounded-circle gx-font-weight-semi-bold gx-fs-xl gx-text-white gx-text-center"
                  >
                    <span>{timeLeft}</span>
                  </span>
                </div>
                <div
                  style={{ gap: "10px" }}
                  className="gx-bg-flex  gx-justify-content-center gx-align-items-center"
                >
                  <span>Amount</span>
                  <span>
                    <Input
                      value={inputValue}
                      onChange={(values) => setInputValue(Number(values.target.value))}
                      type="number"
                      className="gx-font-weight-semi-bold gx-fs-lg"
                    />
                  </span>
                  <Button  className="gx-text-uppercase" onClick={() => setInputValue(0)} type="danger">
                      Clear
                    </Button>

                </div>
                <div className="gx-text-justify">
          
                    {Object.keys(betChips)
                  
                              .map((subKey) => (
                                <Button
                                  className="gx-px-5 gx-font-weight-semi-bold gx-text-white gx-bg-grey gx-bg-grey"
                                  key={subKey}
                                  onClick={() => setInputValue(betChips[subKey])}
                                  style={{ margin: "5px" }}
                                >
                                  {betChips[subKey]}
                                </Button>
                              ))}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "5px",
                    }}
                    className=""
                  >
                    
                    <Button
                     className="gx-text-uppercase"
                      onClick={() => {
                        setTimeLeft(0);
                        setInputValue(0);
                      }}
                      type="danger"
                    >
                      Close
                    </Button>
                    <Button
                    disabled={processingBet}
                    onClick={() => placeNewBet()}
                    className={`${processingBet ? "gx-bg-primary" : "gx-bg-primary"
                      } gx-text-white gx-text-uppercase  gx-mb-0 gx-px-2`}
                  >
                    Done
               
                    {processingBet && <div className="loaderSpinner gx-px-1"></div>}
                  </Button>
                  </div>
                </div>
              </div>
            </Col>
          )}
        </Row> */}
  
    <div
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <div
        style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
        className="gx-bg-grey gx-px-2 gx-text-white "
      >
        <div
          style={{ gap: "40px" }}
          className="gx-bg-flex gx-justify-content-start gx-py-1"
        >
          <div>All bet</div>
          <div>Match bet</div>
          <div>Fancy bet</div>
        </div>
        <div
          style={{ gap: "40px" }}
          className=" gx-bg-flex gx-justify-content-start gx-py-1 "
        >
          <div>Casino bet</div>
          <div>Matka bet</div>
        </div>
      </div>
      <Table columns={columns} scroll={{x:true}} bordered locale={customLocale} />
    </div>
    </>
  );
}

export default RightSidebar;
