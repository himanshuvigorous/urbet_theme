import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";
import Auxiliary from "util/Auxiliary";
import { userLedgerList } from "../../../appRedux/actions/User";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import BackMenuButton from "../../../components/BackMenu";
import Loader from "../../../components/loader";
import UrbetLayout from "../../../components/UrbetLayout/UrbetLayout";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";

const Ledger = () => {
  const [userLadger, setLadger] = useState([]);
  const [calAmount, setCalAmount] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);
  const [debitAmount, setDebitAmount] = useState(0);
  const dispatch = useDispatch();

  const { userLedgerListData, loading } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    userLedger();
  }, [dispatch]);

  useEffect(() => {
    if (userLedgerListData) {
      const { calAmount, creditAmount, debitAmount, ledgerData } = userLedgerListData;
      const filteredData = ledgerData.map((item, index) => ({
        key: `${item.userId}-${index}`,
        userID: `${item.userId}`,
        createdAt: item.createdAt,
        eventName: item.eventName,
        balance: item.balance,
        debit: item.amount > 0 ? item.amount : 0,
        credit: item.amount < 0 ? item.amount : 0,
        ledgerType: item.ledgerType,
        remark: item.remark,
        userType: item.userType,
        marketId: item.marketId,
        date: item.date,
      }));
      setLadger(filteredData);
      setCalAmount(calAmount);
      setCreditAmount(creditAmount);
      setDebitAmount(debitAmount);
    }
  }, [userLedgerListData]);

  const userLedger = async () => {
    let localData = JSON.parse(localStorage.getItem('user_id'));
    let reqData = {
      downlineUserId: localData?.data?.userId,
    };
    dispatch(userLedgerList(reqData));
  };


  const columns = [
    {
      title: "S. NO.",
   
      align: "start",
      onHeaderCell: (column) => ({
        style: {
          background:"#D3D3D3",
          color:"black",
          fontWeight:"bold"
        },
      }),
      className: " gx-text-nowrap",
      render: (value, row,index) => <span>{index+1}</span>,
    },
    {
      title: "DESCRIPTION",
      dataIndex: "remark",
      align: "start",
      className: " gx-text-nowrap",
      onHeaderCell: (column) => ({
        style: {
          background:"#D3D3D3",
          color:"black",
          fontWeight:"bold"
        },
      }),
      render: (value, row) => {
        if (row.ledgerType === "diamondCasino" || row.ledgerType === "internationalCasino") {
          return (
            <Link to={`/main/ledger-casino-details/${row?.marketId}/${row?.ledgerType}/${row?.date}`}>
              <span className="gx-text-link">
                {row.remark} ({moment(row.createdAt).format('DD-MMM-YYYY')})
              </span>
            </Link>
          );
        } else {
          return (
            <Link to={`/main/ledger-details/${row?.marketId}`}>
              <span className="gx-text-link">
                {row.remark} ({moment(row.createdAt).format('DD-MMM-YYYY')})
              </span>
            </Link>
          );
        }
      },
    },
    {
      title: "WON BY",
      dataIndex: "remark",
      align: "start",
      onHeaderCell: (column) => ({
        style: {
          background:"#D3D3D3",
          color:"black",
          fontWeight:"bold"
        },
      }),
      className: " gx-text-nowrap",
      render: (value, row) => <span>{row.remark}</span>,
    },
    {
      title: "DEBIT",
      dataIndex: "debit",
      align: "start",
      onHeaderCell: (column) => ({
        style: {
          background:"#D3D3D3",
          color:"black",
          fontWeight:"bold"
        },
      }),
      className: " gx-text-nowrap",
      render: (value) => (
        <span className="gx-text-green-0">
          {value > 0 ? Number.parseFloat(Math.abs(value)).toFixed(2).replace(/\.?0+$/, '') : 0}
        </span>
      ),
    },
    {
      title: "CREDIT",
      dataIndex: "credit",
      onHeaderCell: (column) => ({
        style: {
          background:"#D3D3D3",
          color:"black",
          fontWeight:"bold"
        },
      }),
      align: "start",
      className: " gx-text-nowrap",
      render: (value) => (
        <span className="gx-text-red">
          {value < 0 ? Number.parseFloat(Math.abs(value)).toFixed(2).replace(/\.?0+$/, '') : 0}
        </span>
      ),
    },
    {
      title: "HISAB",
      dataIndex: "balance",
      align: "start",
      onHeaderCell: (column) => ({
        style: {
          background:"#D3D3D3",
          color:"black",
          fontWeight:"bold"
        },
      }),
      className: " gx-text-nowrap",
      render: (value, row) => (
        <span className={`${row.balance > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
          {row.balance ? Number.parseFloat(Math.abs(row.balance)).toFixed(2).replace(/\.?0+$/, '') : 0}
        </span>
      ),
    },
  ];

  return (
    <>
      {loading ? <Loader props={loading} /> :
      <Row>
        <Col  xs={24}
        md={4}
        xl={3}
        className=" gx-d-none gx-d-md-block gx-px-0 gx-mx-0">
       
        <LeftSidebar />
        </Col>
        <Col xs={24} md={20} xl={21}>
        
        <>
         <div  style={{
        backgroundColor: "white",
        borderTop: "10px solid black",
        borderTopLeftRadius: "1rem",
        borderTopRightRadius: "1rem",
        height: "100%",
      }}>

<Row justify={"start"}>
  <Col xs={24}>
    <div className="gx-py-1">
      <div className=" gx-px-2 gx-text-black gx-font-weight-semi-bold">
        MY LEDGER
      </div>
    </div>

    <Table
  className="gx-table-responsive"
  dataSource={userLadger}
  columns={columns}
  size="small"
  bordered
  pagination={false}
/>;
  </Col>
</Row>

</div>
       </>
       </Col>
      </Row>
      }
    </>
  );
};

export default Ledger;
