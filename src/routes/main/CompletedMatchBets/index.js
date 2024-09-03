import React, { useEffect, useState }  from "react";
import { Button, Col, Row, Table } from "antd";
import UrbetLayout from "../../../components/UrbetLayout/UrbetLayout";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getSportsBetsList } from "../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const CompletedMatchBets = () => {

    const {marketId} = useParams()
    const dispatch = useDispatch()
    const { sportsBetsList,  } = useSelector((state) => state.UserReducer);
    const [compltedFancy, setCompletedFancy] = useState(null);
    const [totalSessionPlusMinus, setTotalSessionPlusMinus] = useState(null)
    const fetchBetLists = async (fancyBet=true , oddsBet=true) => {
        
        try {
            setCompletedFancy(null)
          const BetListData = {
            fancyBet: true,
            oddsBet: true,
            marketId: marketId,
            
          };
          dispatch(getSportsBetsList(BetListData));
        } catch (error) {
          console.error("Error fetching bet lists:", error);
          throw error;
        }
      };
      useEffect(()=>{
        fetchBetLists()
      },[])
      useEffect(() => {
        if (sportsBetsList) {
          const sortedOddsBetData = sportsBetsList?.data?.oddsBetData
            ? sportsBetsList?.data?.oddsBetData
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            : [];
          const filteredFancyBetData = sportsBetsList?.data?.fancyBetData
            ? sportsBetsList?.data?.fancyBetData.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
            : [];
          const completeFancy =
            filteredFancyBetData && filteredFancyBetData.length > 0
              ? filteredFancyBetData.filter((element) => element.isDeclare === 1)
              : [];
          let showCompletedFancy = [];
    
          completeFancy.map((data, key) => {
            let pos = 0;
            if (data.decisionRun >= data.run && data.type === "Y") {
              pos = Math.round(data.amount * data.odds);
            } else if (data.decisionRun >= data.run && data.type === "N") {
              pos = Math.round(-1 * data.amount * data.odds);
            } else if (data.decisionRun < data.run && data.type === "Y") {
              pos = Math.round(-1 * data.amount);
            } else if (data.decisionRun < data.run && data.type === "N") {
              pos = Math.round(data.amount);
            }
            data.pos = pos;
            completeFancy[key].pos = pos
    
            showCompletedFancy.push(data);
          });
          setCompletedFancy(showCompletedFancy);
         
        }
      }, [sportsBetsList]);

    const compltedBetsColumn = [
        {
          title: "S.No",
           onHeaderCell: (column) => ({
        style: {
          background:"rgba(0,0,0,0.3)",
          color:'black',
          fontWeight:"bold",
          textTransform:"uppercase"
        },
      }),
          dataIndex: "index",
          key: "index",
          align:"center",
          render: (value , record , index) => <span className="gx-text-nowrap gx-font-weight-semi-bold gx-text-uppercase">{index}</span>,
        },
        {
          title: "Runner",
           onHeaderCell: (column) => ({
        style: {
          background:"rgba(0,0,0,0.3)",
          color:'black',
          fontWeight:"bold",
          textTransform:"uppercase"
        },
      }),
          dataIndex: "Team",
          key: "Team",
          render: (value) => <span className="gx-text-nowrap gx-text-uppercase">{value}</span>,
        },
        {
            title: "Date",
             onHeaderCell: (column) => ({
        style: {
          background:"rgba(0,0,0,0.3)",
          color:'black',
          fontWeight:"bold",
          textTransform:"uppercase"
        },
      }),
            dataIndex: "Date",
            key: "Date",
            render: (value) => <span className="gx-text-nowrap">{value}</span>,
          },
          {
            title: "Run",
             onHeaderCell: (column) => ({
        style: {
          background:"rgba(0,0,0,0.3)",
          color:'black',
          fontWeight:"bold",
          textTransform:"uppercase"
        },
      }),
            dataIndex: "Runs",
            key: "Runs",
          },
          {
            title: "Rate",
             onHeaderCell: (column) => ({
        style: {
          background:"rgba(0,0,0,0.3)",
          color:'black',
          fontWeight:"bold",
          textTransform:"uppercase"
        },
      }),
            dataIndex: "Rate",
            key: "Rate",
          },
          {
            title: "Results",
             onHeaderCell: (column) => ({
        style: {
          background:"rgba(0,0,0,0.3)",
          color:'black',
          fontWeight:"bold",
          textTransform:"uppercase"
        },
      }),
            dataIndex: "results",
            key: "results",
          },
        {
          title: "Amount",
           onHeaderCell: (column) => ({
        style: {
          background:"rgba(0,0,0,0.3)",
          color:'black',
          fontWeight:"bold",
          textTransform:"uppercase"
        },
      }),
          dataIndex: "Amount",
          key: "Amount",
        },
       
        
        {
          title: "Mode",
           onHeaderCell: (column) => ({
        style: {
          background:"rgba(0,0,0,0.3)",
          color:'black',
          fontWeight:"bold",
          textTransform:"uppercase"
        },
      }),
          dataIndex: "Type",
          key: "Type",
        },
        
       
        {
          title: "P&L",
           onHeaderCell: (column) => ({
        style: {
          background:"rgba(0,0,0,0.3)",
          color:'black',
          fontWeight:"bold",
          textTransform:"uppercase"
        },
      }),
          dataIndex: "pos",
          key: "pos",
          render: (value) => (
            <span className={`${value > 0 ? "gx-text-green-0" : value < 0 ? "gx-text-red" : "gx-text-black"}`}>
              {value}
            </span>
          ),
        },
      ];

      const generateCompletedData = () => {
        const data = [];
    
    
        compltedFancy?.forEach((element, index) => {
    
          data.push({
            key: index,
            Runs: element.run,
            Rate: Number.parseFloat(100 * element.odds).toFixed(2),
            Amount: Number.parseFloat(element.amount).toFixed(2),
            Type:
              element.type === "N"
                ? "NO"
                : element.type === "Y"
                  ? "YES"
                  : element.type === "K"
                    ? "Khai"
                    : element.type === "L"
                      ? "Lagai"
                      : "",
    
            Team: element.sessionName,
            Client: `${element.userInfo && element.userInfo.clientName
              ? element.userInfo.clientName
              : ""
              } ${element.userInfo && element.userInfo.clientCode
                ? element.userInfo.clientCode
                : ""
              }`,
            Agent: `${element.userInfo && element.userInfo.creatorName
              ? element.userInfo.creatorName
              : ""
              }`,
            oddsType: `${element.oddsType}`,
            results: `${element.decisionRun}`,
            Date: `${element.createdAt
              ? moment(element.createdAt)
                .utcOffset("+05:30")
                .format("DD MMM hh:mm:ss A")
              : ""
              }`,
            pos: `${(element.pos)}`,
          });
        });
        return data;
      };
    
    
      useEffect(() => {
        let sessionPlusMinus = 0
        compltedFancy?.map((data, key) => {
          let pos = 0;
          if (data.decisionRun >= data.run && data.type === "Y") {
            pos = Math.round(data.amount * data.odds);
          } else if (data.decisionRun >= data.run && data.type === "N") {
            pos = Math.round(-1 * data.amount * data.odds);
          } else if (data.decisionRun < data.run && data.type === "Y") {
            pos = Math.round(-1 * data.amount);
          } else if (data.decisionRun < data.run && data.type === "N") {
            pos = Math.round(data.amount);
          }
          sessionPlusMinus += pos
          data.pos = pos
          compltedFancy[key].pos = pos
    
    
        })
        setTotalSessionPlusMinus(sessionPlusMinus)
    
      }, [compltedFancy])
    
      const completeddataList = generateCompletedData();
     const history = useHistory()
    
    return (
        <Row>
        <Col  xs={24}
        md={4}
        xl={3}
        className=" gx-d-none gx-d-md-block gx-px-0 gx-mx-0">
       
        <LeftSidebar />
        </Col>
        <Col 
        xs={24}
        md={20}
        xl={21}
        className="urbet_layout_header_top gx-bg-white"
        >
            <div className="gx-bg-flex gx-justify-content-between gx-align-items-center gx-px-2 gx-py-1">
                <div className="gx-fs-lg gx-font-weight-semi-bold " >Completed Bet History</div>
                <Button onClick={()=>history.goBack()} size="small" className="gx-bg-dark gx-mb-0 gx-text-white gx-font-weight-semi-bold">Back</Button>
            </div>
              <Table
          className="gx-w-100 gx-mx-0 gx-my-0"
          size="small"
          rowHoverable={false}
          title=""
          scroll={{ x: true }}
          dataSource={completeddataList}
          columns={compltedBetsColumn}
          pagination={false}
          bordered
          rowClassName={(row, index) => row.Type === 'NO' || row.Type === 'Khai' ? 'matchdtailsNoBackground' : row.Type === 'YES' || row.Type === 'Lagai' ? 'matchdtailsYesBackground' : "gx-bg-light-grey"}
        />
        </Col>
        </Row>
    );
};

export default CompletedMatchBets;


