import React from "react";
import { connect } from "react-redux";
// import { userActions } from "../../_actions";
import BetLockedRoundedBmx from "../../../components/casino_components/BetLockedRoundedBmx/BetLockedRoundedBmx";
import io from 'socket.io-client';
import PlaceBetMobileBmx from "../../../components/casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";
import ResultModelBmx from "../../../components/casino_components/ResultModelBmx/ResultModelBmx";
import FlipCountdown from '@rumess/react-flip-countdown';
import RoundedTabBmx from "../../../components/casino_components/RoundedTabBmx/RoundedTabBmx";
import axios from "axios";
import PageHeaderTheme from "../../../components/casino_components/PageHeaderTheme/PageHeaderTheme";
import moment from "moment";
import PlaceBetMobileBmxBet from "../../../components/casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import MyBetTabBmx from "../../../components/casino_components/MyBetTabBmx/MyBetTabBmx";
import BetListTableBmx from "../../../components/casino_components/BetListTableBmx/BetListTableBmx";
import { httpPost } from "../../../http/http";


import { BsSuitSpadeFill, BsSuitClubFill, BsSuitDiamondFill, BsFillSuitHeartFill } from "react-icons/bs";
import GameCard from "../../../components/casino_components/GameCard/GameCard";


class AndarBahar2theme2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      backBetModal: false,
      backBetModalMobile: false,
      Result: false,
      result: {},
      betSlipData: {},
      count: 0,
      time: 7,
      casinoData: [],
      showLoader: false,
      fieldsbet: {},
      errorsbet: {},
      ResultModel: false,
      casinoDetails: {},
      fetchData: "",
      socketURL: "",
      tvUrl: "",
      cacheURL: "",
      betStatus: "",
      cashinoStatus: "",
      eventId: "",
      minStake: "",
      maxStake: "",
      name: "",
      shortName: "abj",
      betList: [],
      betresponse: [],
      setting: {},
      posArray: {},
      currentRoundId: 0,
      oddsDifference: 0,
      totalProfitLoss: 0,
      message: "",
      isFatch: false,
      error: false,
      socketPerm: "",
      domainSettingByDomainName: null,
    };
    this.socket = null;
    this.section1Ref = React.createRef();
    this.scrollTimeout = null;
    this.inputRef = React.createRef();
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.users && nextProps.users.betPlaceSucess) {
      return {
        ...nextProps,
        backBetModal: false,
        backBetModalMobile: false,
        betSlipData: {},
      }
    } else {
      return {
        ...nextProps,

      }
    }
  }
  increaseCount = () => {
    const increasedCount = (parseFloat(this.state.count) + 0.01).toFixed(2);
    this.setState({ count: parseFloat(increasedCount) });
  };

  decreaseCount = () => {
    const decreasedCount = (parseFloat(this.state.count) - 0.01).toFixed(2);
    this.setState({ count: parseFloat(decreasedCount) });
  };

  componentDidMount() {
    this.getDomainSettingByDomainName();
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    let requestData = {
      eventId: this.props.match.params.eventId,
    }
    this.getDidMountData(requestData)
  }

  getDomainSettingByDomainName = () => {
    try {
      let domainSetting = localStorage.getItem('domainSettingByDomainName');
      if (domainSetting) {
        const parsedDomainSetting = JSON.parse(domainSetting);
        this.setState({ domainSettingByDomainName: parsedDomainSetting });
      } else {
        this.setState({ domainSettingByDomainName: null });
      }
    } catch {
      console.error('Error parsing domainSettingByDomainName:');
      this.setState({ domainSettingByDomainName: null });
    }
  };

  getDidMountData = async (requestData) => {
    this.setState({ showLoader: true })
    let getCasinoDetails = await httpPost(`casino/getDiamondCasinoByEventId`, requestData)
    if (!getCasinoDetails.error) {
      let casinoDetails = getCasinoDetails.data
      this.setState({
        casinoDetails: casinoDetails,
        fetchData: casinoDetails && casinoDetails.fetchData ? casinoDetails.fetchData : {},
        socketURL: casinoDetails && casinoDetails.socketURL ? casinoDetails.socketURL : {},
        tvUrl: casinoDetails && casinoDetails.videoUrl1 ? casinoDetails.videoUrl1 : "",
        cacheURL: casinoDetails && casinoDetails.cacheURL ? casinoDetails.cacheURL : {},
        socketPerm: casinoDetails && casinoDetails.fetchData ? casinoDetails.fetchData : "",
        betStatus: casinoDetails && casinoDetails.betStatus ? casinoDetails.betStatus : "",
        cashinoStatus: casinoDetails && casinoDetails.cashinoStatus ? casinoDetails.cashinoStatus : "",
        eventId: casinoDetails && casinoDetails.eventId ? casinoDetails.eventId : "",
        minStake: casinoDetails && casinoDetails.minStake ? casinoDetails.minStake : "",
        maxStake: casinoDetails && casinoDetails.maxStake ? casinoDetails.maxStake : "",
        name: casinoDetails && casinoDetails.name ? casinoDetails.name : "",
        shortName: casinoDetails && casinoDetails.shortName ? casinoDetails.shortName : "abj",
        setting: casinoDetails && casinoDetails.setting ? casinoDetails.setting : {},
        oddsDifference: casinoDetails && casinoDetails.setting && casinoDetails.setting.oddsDifference ? casinoDetails.setting.oddsDifference : 0,
      })
      if (casinoDetails.eventId) {
        this.betList(casinoDetails.eventId)
      }

      let socketPerm = ""
      let socketUrl = ""
      let cacheUrl = ""
      if (casinoDetails.fetchData) {
        socketPerm = casinoDetails.fetchData
      }
      if (casinoDetails.socketURL) {
        socketUrl = casinoDetails.socketURL
      }
      if (casinoDetails.cacheURL) {
        cacheUrl = casinoDetails.cacheURL
      }

      if (socketPerm === "socket") {
        await this.connectSocket(socketUrl, socketPerm, casinoDetails.shortName)
      } else {
        await this.callCache(cacheUrl);
      }
    } else {

    }
    this.setState({ showLoader: false })
  }

  connectSocket = async (socketUrl, socketPerm, shortName) => {
    if (!socketUrl) {
      socketUrl = this.state.socketURL
    }
    if (!socketPerm) {
      socketPerm = this.state.socketPerm
    }
    if (!shortName) {
      shortName = this.state.shortName
    }
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return;
    }

    if (socketPerm === "socket") {
      this.socket = io.connect(socketUrl, {
        transports: ["websocket"],
        reconnection: false,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 99,
      });

      this.socket.emit('JoinRoom', shortName);
      this.socket.on(shortName, data => {
        this.setState({ currentRoundId: data && data.data && data.data.t1 && data.data.t1[0] && data.data.t1[0].mid ? data.data.t1[0].mid : 0 })
        this.setState({ casinoData: data })
        this.updatePos()
      });
    }
  }

  callCache = async (cacheUrl) => {
    try {
      this.interval = setInterval(async () => this.getMarketCacheUrl(cacheUrl), 1000);
    } catch (error) {
      console.error('Error calling cache:', error);
    }
  }

  getMarketCacheUrl = async (cacheUrl) => {
    try {
      const response = await axios.get(cacheUrl);
      this.setState({ casinoData: response?.data?.data })
    } catch (error) {
      console.error('Error fetching cache data:', error);
    }
  }


  updatePos = async () => {
    const { betList, currentRoundId } = this.state;
    if (betList && betList.length > 0) {
      const filteredBets = betList.filter((element) => element.roundId == currentRoundId);
      let pushPos = {};
      filteredBets.forEach((bet) => {
        const posArray = bet.posArray;
        Object.entries(posArray).forEach(([key, value]) => {
          pushPos[key] = (pushPos[key] || 0) + Number(value);
        });
      });

      this.setState({ posArray: pushPos });
    }
  }

  betList = async (eventId) => {
    let betReq = {
      "eventId": eventId,
      fromDate: moment().format('YYYY-MM-DD'),
      toDate: moment().format('YYYY-MM-DD'),
    };

    let getCasinoDetails = await httpPost(`casino/diamondBetsList`, betReq)
    let totalProfitLoss = 0
    let betList = getCasinoDetails?.data?.casinoBetData
    if (betList && betList.length > 0) {
      betList?.map((bet, key) => {
        let profitLoss = "Not Declare"
        let profitLossCount = 0
        if (bet.isDeclare) {
          profitLossCount = bet.profitLoss ? bet.profitLoss : 0
          profitLoss = bet.profitLoss
        }
        totalProfitLoss += Number(profitLossCount)
        betList[key].profitLoss = profitLoss
      })
    }
    if (getCasinoDetails) {
      this.setState({ betList: betList, totalProfitLoss: totalProfitLoss })
    }
  }

  componentWillUnmount() {
    clearInterval(this.cacheInterval);
    clearTimeout(this.timer);
    if (this.inputRef.current) {
      this.inputRef.current.removeEventListener('touchstart', this.handleTouchStart);
    }
    this.cleanupWebSocket();
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  }

  cleanupWebSocket = () => {
    if (this.socket) {
      this.socket.close();
    }
  };

  handleVisibilityChange = () => {
    if (document.visibilityState === 'visible' && !this.state.isConnected) {
      this.connectSocket()
    } else if (document.visibilityState === 'hidden') {
      this.cleanupWebSocket();
    }
  };

  updateStackOnclic = (num) => {
    let { betSlipData } = this.state;
    betSlipData.stake = num;
    this.setState({
      betSlipData: betSlipData,
    });
  };

  inputChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (value < 0 || isNaN(Number(value))) {
      value = 0;
    }

    if (value[0] === '0' && value.length > 1) {
      value = value.substring(1);
    }

    let { betSlipData } = this.state;
    betSlipData.stake = value;
    this.setState({
      betSlipData: betSlipData,
      [name]: Number(value),
    });
  };


  placeBet = async () => {
    const { casinoData } = this.state;
    this.setState({ LoadingBet: true })
    let { data } = casinoData ? casinoData : {};
    let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    // console.log(this.state.betSlipData, "this.state.betSlipData");
    let betObject = {
      "roundId": t1.mid,
      "sid": this.state.betSlipData.sid,
      "rate": this.state.count + "",
      "amount": Number(this.state.betSlipData.stake),
      "casinoType": this.state.shortName ? this.state.shortName : "abj",
      "eventId": this.props.match.params.eventId,
      "betFor": this.state.betFor + "",
    }

    const result = await httpPost("casino/casinoBetPlace", betObject);
    if (result) {
      if (result.error === false) {

        this.setState(
          {
            betresponse: result.data
          },
        );
        this.setState({ isFatch: true, message: "Bet Successful", error: false })
        setTimeout(() => {
          this.setState({ isFatch: false })
        }, 3000);
        this.betList(this.props.match.params.eventId)
        result?.data?.totalCoins && localStorage.setItem("client-wallet-balance", result?.data?.totalCoins)
        result?.data?.exposure && localStorage.setItem("client-wallet-exposure", result?.data?.exposure)
        // this.props.dispatch(userActions.getUserBalance());
      }
      else {
        this.setState({ isFatch: true, message: result.message, error: true })
        setTimeout(() => {
          this.setState({ isFatch: false })
        }, 3000);
      }
    }
    this.handleClose();
    this.setState({ LoadingBet: false })
  };

  handleBackOpen = (data) => {
    this.betForSet(data.nat)
    if (this.scrollTimeout) {
      clearInterval(this.scrollTimeout);
    }
    this.setState({ backBetModal: true, backBetModalMobile: true, betSlipData: { ...data, stake: "0" }, count: data && data.odds ? data.odds : data.b1, time: 7, });
    this.scrollTimeout = setInterval(() => {
      this.setState(prevState => ({ time: prevState.time - 1 }), () => {
        if (this.state.time < 0) {
          this.setState({ backBetModal: false });
        }
      });
    }, 1000);
  };



  betForSet = (nat) => {
    let value = nat;
    if (value === "SA" || value === "1st Bet" || value === "2nd Bet" || value === "SB") {
      this.setState({ betFor: "andarBahar" })
    } else if (value === "Joker A" || value === "Joker 2" || value === "Joker 3" || value === "Joker 4" || value === "Joker 5" || value === "Joker 6" || value === "Joker 7" || value === "Joker 8" || value === "Joker 9" || value === "Joker 10" || value === "Joker J" || value === "Joker Q" || value === "Joker K") {
      this.setState({ betFor: "cards" })
    } else if (value === "Joker Diamond" || value === "Joker Heart" || value === "Joker Club" || value === "Joker Spade") {
      this.setState({ betFor: "color" })
    } else if (value === "Joker Odd" || "Joker Even") {
      this.setState({ betFor: "oddEven" })
    }
  }

  handleResultModel = (data) => {
    this.setState({ ResultModel: true, result: data });
  };

  handleClose = () => {
    this.setState({ backBetModal: false, backBetModalMobile: false });
  };

  handleCloseResult = () => {
    this.setState({ ResultModel: false });
  };

  toastClose = () => {
    this.setState({ isFatch: false });
  };

  render() {
    const { casinoData, name, shortName, ResultModel, time, count, backBetModal, tvUrl, betList, showLoader, LoadingBet, posArray, oddsDifference, totalProfitLoss, isFatch, message, error, domainSettingByDomainName } = this.state;
    let { data, result } = casinoData ? casinoData : {};

    let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    // let t2 = data && data.t2 ? data.t2 : {};
    let image = t1 && t1.cards ? t1.cards.split(',') : [];
    let SA = data && data.t2 && data.t2[0] ? data.t2[0] : {};
    let SAFBet = data && data.t2 && data.t2[1] ? data.t2[1] : {};
    let SASBet = data && data.t2 && data.t2[2] ? data.t2[2] : {};
    let SB = data && data.t2 && data.t2[3] ? data.t2[3] : {};
    let SBFBet = data && data.t2 && data.t2[4] ? data.t2[4] : {};
    let SBSBet = data && data.t2 && data.t2[5] ? data.t2[5] : {};
    let CardA = data && data.t2 && data.t2[6] ? data.t2[6] : {};
    let Card2 = data && data.t2 && data.t2[7] ? data.t2[7] : {};
    let Card3 = data && data.t2 && data.t2[8] ? data.t2[8] : {};
    let Card4 = data && data.t2 && data.t2[9] ? data.t2[9] : {};
    let Card5 = data && data.t2 && data.t2[10] ? data.t2[10] : {};
    let Card6 = data && data.t2 && data.t2[11] ? data.t2[11] : {};
    let Card7 = data && data.t2 && data.t2[12] ? data.t2[12] : {};
    let Card8 = data && data.t2 && data.t2[13] ? data.t2[13] : {};
    let Card9 = data && data.t2 && data.t2[14] ? data.t2[14] : {};
    let Card10 = data && data.t2 && data.t2[15] ? data.t2[15] : {};
    let CardJ = data && data.t2 && data.t2[16] ? data.t2[16] : {};
    let CardQ = data && data.t2 && data.t2[17] ? data.t2[17] : {};
    let CardK = data && data.t2 && data.t2[18] ? data.t2[18] : {};
    let Spade = data && data.t2 && data.t2[19] ? data.t2[19] : {};
    let Club = data && data.t2 && data.t2[20] ? data.t2[20] : {};
    let Heart = data && data.t2 && data.t2[21] ? data.t2[21] : {};
    let Diamond = data && data.t2 && data.t2[22] ? data.t2[22] : {};
    let Odd = data && data.t2 && data.t2[23] ? data.t2[23] : {};
    let Even = data && data.t2 && data.t2[24] ? data.t2[24] : {};

    return (
      <>
      
          <div className={`w-[100vw] relative h-full  page_bg overflow-y-auto text-sm flex  ${domainSettingByDomainName && domainSettingByDomainName.clientNotification ? "md:pt-[105px] pt-[100px]" : "md:pt-[72px] pt-[70px]"}`}>
            {/* {
              isFatch ?
                <ErrorTost message={message} toastClose={this.toastClose} error={error} /> : null
            } */}
            {this.state && ResultModel === true ? (
              <ResultModelBmx
                handleClose={this.handleCloseResult}
                name={name ? name : "Andar Bahar"}
                shortName={shortName ? shortName : "abj"}
                result={this.state.result}
              />
            ) : null}
            {LoadingBet === true ?
              <>
                <PlaceBetMobileBmxBet
                  betSlipData={this.state.betSlipData}
                  time={time}
                  count={count}
                />
              </> :
              <>
                {backBetModal === true ? (
                  <PlaceBetMobileBmx
                    betSlipData={this.state.betSlipData}
                    updateStackOnclic={this.updateStackOnclic}
                    placeBet={this.placeBet}
                    handleClose={this.handleClose}
                    section1Ref={this.section1Ref}
                    time={time}
                    inputChange={this.inputChange}
                    decreaseCount={this.decreaseCount}
                    increaseCount={this.increaseCount}
                    count={count}
                  />
                ) : null}
              </>
            }

            <div className="lg:flex w-full h-screen p-1.5 overflow-y-auto space-x-1.5">
              <div className="xl:w-[41%] lg:w-[61%] md:w-full mx-auto h-full bg-white">
                <PageHeaderTheme
                  PageTitle={name ? name : "Andar Bahar"}
                  ruleImage={"/assets/images/rulesImage/ab2-rules.webp"}
                  t1={t1}
                />

                <div className="bg-black flex justify-between w-full relative md:text-sm text-[10px] xl:h-[400px] md:h-[350px] h-[250px]">
                  <iframe src={tvUrl ? tvUrl : null} title="" className='relative w-full  ' />
                  <div className=" flex justify-between">
                    <div className="absolute top-0 left-0">
                      <div className="h-full p-2 flex justify-between space-x-2">
                        <div className="flex justify-between items-center lg:space-x-4 space-x-2 ">
                          <div className="text-white font-semibold lg:text-base text-sm space-y-4">
                            <p>A</p>
                            <p>B</p>
                          </div>
                          <div className="flex justify-center items-center">
                            <img src={`/cards/${t1 && t1.C1 ? t1.C1 : "1"}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-5" />
                          </div>
                          <div className="lg:space-y-3 space-y-2 lg:pl-2 pl-1">
                            <img src={`/cards/${image && image[2] ? image[0] : "1"}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-5" />
                            <img src={`/cards/${image && image[1] ? image[1] : "1"}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-5" />
                          </div>
                        </div>
                        {/* <div className="w-5">

                      </div> */}
                        <div className="flex justify-center space-x-1">
                          <div className="lg:space-y-3 space-y-2">
                            {image[4] === "1" ? null :
                              <img src={`/cards/${image && image[4] ? image[4] : "1"}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-5" />}
                            {image[3] === "1" ? null :
                              <img src={`/cards/${image && image[3] ? image[3] : "1"}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-5" />}
                          </div>
                          <div className="lg:space-y-3 space-y-2">
                            {image[6] === "1" ? null :
                              <img src={`/cards/${image && image[6] ? image[6] : "1"}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-5" />}
                            {image[5] === "1" ? null :
                              <img src={`/cards/${image && image[5] ? image[5] : "1"}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-5" />}
                          </div>
                          <div className="lg:space-y-3 space-y-2">
                            {image[8] === "1" ? null :
                              <img src={`/cards/${image && image[8] ? image[8] : "1"}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-5" />}
                            {image[7] === "1" ? null :
                              <img src={`/cards/${image && image[7] ? image[7] : "1"}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-5" />}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end items-end absolute md:bottom-0 bottom-4 right-0 ">
                      <FlipCountdown
                        titlePosition='hidden'
                        hideYear
                        hideMonth
                        hideDay
                        hideHour
                        hideMinute
                        endAtZero
                        size='small'
                        endAt={new Date(Date.now() + 1000 * (t1 && t1.autotime ? t1.autotime : null)).toUTCString()}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="border border-gray-300 grey_background white-text divide-y divide-white">
                  <div className="grid grid-cols-3 text-center divide-x">
                    <div className="col-span-2 w-full h-[44px] font-semibold text-[18px]  py-3">Main</div>
                    <div className="w-full h-[44px] font-semibold text-[18px] back_colour py-3">Back</div>
                  </div>
                  <div className="w-full text-center colour_back_odds ">
                    <div className="grid grid-cols-3">
                      <div className="h-full text-[13px] capitalize text-gray-800 font-semibold py-2 px-2 col-span-2 w-full">
                        <div>Andar</div>
                        <p>0</p>
                      </div>
                      <div className="flex justify-end items-center divide-x w-full">
                        <div className="relative w-full back_colour cursor-pointer " >
                          <div className=" text-center py-1" onClick={() => this.handleBackOpen({ data: SAFBet, type: "Yes", odds: SAFBet.b1, nat: SAFBet.nat }, this.section1Ref)}>
                            <span className="text-[18px] font-semibold">{SAFBet && SAFBet.b1 ? SAFBet.b1 : "0.00"}</span><br />
                            <span className="text-[14px]">0</span>
                          </div>
                          {SAFBet && SAFBet.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full text-center colour_back_odds">
                    <div className="grid grid-cols-3">
                      <div className="h-full text-[13px] capitalize text-gray-800 font-semibold py-2 px-2 w-full col-span-2">
                        <div>Bahar</div>
                        <p>0</p>
                      </div>
                      <div className="flex justify-end items-center divide-x w-full">
                        <div className="relative w-full back_colour cursor-pointer ">
                          <div className=" text-center py-1" onClick={() => this.handleBackOpen({ data: SBFBet, type: "Yes", odds: SBFBet.b1, nat: SBFBet.nat }, this.section1Ref)}>
                            <span className="text-[18px] font-semibold">{SBFBet && SBFBet.b1 ? SBFBet.b1 : "0.00"}</span><br />
                            <span className="text-[14px]">0</span>
                          </div>
                          {SBFBet && SBFBet.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="space-y-1 pt-1">
                  <div className=" odds-bet">
                    <div className=" text-center pt-2 w-full">
                      <div className="flex py-0.5 md:gap-6 gap-2 justify-center items-center">
                        <div className="md:flex block justify-between items-center md:space-x-12 space-x-0 w-5/6">
                          <div className="md:pb-5 pb-2">
                            <p className="text-md font-bold">Andar</p>
                          </div>
                          <div className="flex justify-between items-center md:space-x-6 space-x-2 w-full">

                            <div className="w-full">
                              <div className="relative">
                                <div onClick={() => this.handleBackOpen({ data: SA, type: "Yes", odds: SA.b1, nat: SA.nat, sid: SA.sid }, this.section1Ref)}
                                  className="even-background 2xl:px-16 xl:px-10 px-4 white-text font-bold text-sm py-1  cursor-pointer">
                                  <p>{SA && SA.nat ? SA.nat : "2nd Bet"}</p>
                                  <p>{SA && SA.b1 ? SA.b1 : "2.00"}</p>
                                </div>
                                {SA && SA.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                              </div>
                              <div className={`${posArray[SA.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[SA.sid] ?? 0.00}</div>
                            </div>
                            <div className="w-full">
                              <div className="relative">
                                <div onClick={() => this.handleBackOpen({ data: SAFBet, type: "Yes", odds: SAFBet.b1, nat: SAFBet.nat, sid: SAFBet.sid }, this.section1Ref)}
                                  className="even-background 2xl:px-16 xl:px-10 px-4 white-text font-bold text-sm py-1  cursor-pointer">
                                  <p>{SAFBet && SAFBet.nat ? SAFBet.nat : "2nd Bet"}</p>
                                  <p>{SAFBet && SAFBet.b1 ? SAFBet.b1 : "2.00"}</p>
                                </div>
                                {SAFBet && SAFBet.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                              </div>
                              <div className={`${posArray[SAFBet.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[SAFBet.sid] ?? 0.00}</div>
                            </div>
                            <div className="w-full">
                              <div className="relative">
                                <div onClick={() => this.handleBackOpen({ data: SASBet, type: "Yes", odds: SASBet.b1, nat: SASBet.nat, sid: SASBet.sid }, this.section1Ref)}
                                  className="even-background 2xl:px-16 xl:px-10 px-4 white-text font-bold text-sm py-1  cursor-pointer">
                                  <p>{SASBet && SASBet.nat ? SASBet.nat : "2nd Bet"}</p>
                                  <p>{SASBet && SASBet.b1 ? SASBet.b1 : "2.00"}</p>
                                </div>
                                {SASBet && SASBet.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                              </div>
                              <div className={`${posArray[SASBet.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[SASBet.sid] ?? 0.00}</div>
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="flex py-0.5 md:gap-6 gap-2 justify-center items-center">
                        <div className="md:flex block justify-between items-center md:space-x-12 space-x-0 w-5/6">
                          <div className="md:pb-5 pb-2">
                            <p className="text-md font-bold">Bahar</p>
                          </div>
                          <div className="flex justify-between items-center md:space-x-6 space-x-2 w-full">

                            <div className="w-full">
                              <div className="relative">
                                <div onClick={() => this.handleBackOpen({ data: SB, type: "Yes", odds: SB.b1, nat: SB.nat, sid: SB.sid }, this.section1Ref)}
                                  className="even-background 2xl:px-16 xl:px-10 px-4 white-text font-bold text-sm py-1  cursor-pointer  ">
                                  <p>{SB && SB.nat ? SB.nat : "1st Bet"}</p>
                                  <p>{SB && SB.b1 ? SB.b1 : "2.00"}</p>
                                </div>
                                {SB && SB.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                              </div>
                              <div className={`${posArray[SB.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[SB.sid] ?? 0.00}</div>
                            </div>
                            <div className="w-full">
                              <div className="relative">
                                <div onClick={() => this.handleBackOpen({ data: SBFBet, type: "Yes", odds: SBFBet.b1, nat: SBFBet.nat, sid: SBFBet.sid }, this.section1Ref)}
                                  className="even-background 2xl:px-16 xl:px-10 px-4 white-text font-bold text-sm py-1  cursor-pointer  ">
                                  <p>{SBFBet && SBFBet.nat ? SBFBet.nat : "1st Bet"}</p>
                                  <p>{SBFBet && SBFBet.b1 ? SBFBet.b1 : "2.00"}</p>
                                </div>
                                {SBFBet && SBFBet.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                              </div>
                              <div className={`${posArray[SBFBet.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[SBFBet.sid] ?? 0.00}</div>
                            </div>
                            <div className="w-full">
                              <div className="relative">
                                <div onClick={() => this.handleBackOpen({ data: SBSBet, type: "Yes", odds: SBSBet.b1, nat: SBSBet.nat, sid: SBSBet.sid }, this.section1Ref)}
                                  className="even-background 2xl:px-16 xl:px-10 px-4 white-text font-bold text-sm py-1  cursor-pointer  ">
                                  <p>{SBSBet && SBSBet.nat ? SBSBet.nat : "1st Bet"}</p>
                                  <p>{SBSBet && SBSBet.b1 ? SBSBet.b1 : "2.00"}</p>
                                </div>
                                {SBSBet && SBSBet.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                              </div>
                              <div className={`${posArray[SBSBet.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[SBSBet.sid] ?? 0.00}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>


                <div className="space-y-1 pt-1">
                  <div className=" odds-bet">
                    <div className=" text-center pt-2 w-full">
                      <div className="flex py-0.5 gap-2 justify-center items-center">
                        <div className="md:flex block justify-between items-center md:space-x-2 space-x-0 w-11/12">
                          <div className="flex justify-between items-center md:space-x-2 space-x-2 w-full">

                            <div className="w-full">
                              <p className="text-[14px] font-[600]">{Odd && Odd.b1 ? Odd.b1 : "2.00"}</p>
                              <div className="relative">
                                <div onClick={() => this.handleBackOpen({ data: Odd, type: "Yes", odds: Odd.b1, nat: Odd.nat, sid: Odd.sid }, this.section1Ref)}
                                  className="even-background white-text font-bold text-sm py-2.5  cursor-pointer uppercase ">
                                  <p>{Odd && Odd.nat ? Odd.nat : "ODD"}</p>
                                </div>
                                {Odd && Odd.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                              </div>
                              <div className={`${posArray[Odd.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[Odd.sid] ?? 0.00}</div>
                            </div>
                            <div className="w-full">
                              <p className="text-[14px] font-[600]">{Even && Even.b1 ? Even.b1 : "2.00"}</p>
                              <div className="relative">
                                <div onClick={() => this.handleBackOpen({ data: Even, type: "Yes", odds: Even.b1, nat: Even.nat, sid: Even.sid }, this.section1Ref)}
                                  className="even-background white-text font-bold text-sm py-2.5  cursor-pointer uppercase ">
                                  <p>{Even && Even.nat ? Even.nat : "Even"}</p>
                                </div>
                                {Even && Even.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                              </div>
                              <div className={`${posArray[Odd.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[Odd.sid] ?? 0.00}</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center md:space-x-2 space-x-2 w-full">


                            <div className="w-full">
                              <p className="text-[14px] font-[600]">{Spade && Spade.b1 ? Spade.b1 : "2.00"}</p>
                              <div className="relative">
                                <div onClick={() => this.handleBackOpen({ data: Spade, type: "Yes", odds: Spade.b1, nat: Spade.nat, sid: Spade.sid }, this.section1Ref)}
                                  className="even-background font-bold text-sm py-2.5  cursor-pointer uppercase flex justify-center items-center">
                                  <p className="text-black">   <BsSuitSpadeFill /></p>
                                </div>
                                {Spade && Spade.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                              </div>
                              <div className={`${posArray[Spade.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[Spade.sid] ?? 0.00}</div>
                            </div>
                            <div className="w-full">
                              <p className="text-[14px] font-[600]">{Club && Club.b1 ? Club.b1 : "2.00"}</p>
                              <div className="relative">
                                <div onClick={() => this.handleBackOpen({ data: Club, type: "Yes", odds: Club.b1, nat: Club.nat, sid: Club.sid }, this.section1Ref)}
                                  className="even-background font-bold text-sm py-2.5  cursor-pointer uppercase flex justify-center items-center ">
                                  <p className="text-black"> <BsSuitClubFill /></p>
                                </div>
                                {Club && Club.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                              </div>
                              <div className={`${posArray[Club.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[Club.sid] ?? 0.00}</div>
                            </div>
                            <div className="w-full">
                              <p className="text-[14px] font-[600]">{Heart && Heart.b1 ? Heart.b1 : "2.00"}</p>
                              <div className="relative">
                                <div onClick={() => this.handleBackOpen({ data: Heart, type: "Yes", odds: Heart.b1, nat: Heart.nat, sid: Heart.sid }, this.section1Ref)}
                                  className="even-background font-bold text-sm py-2.5  cursor-pointer uppercase flex justify-center items-center ">
                                  <p className="text-red-color"> <BsFillSuitHeartFill /></p>
                                </div>
                                {Heart && Heart.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                              </div>
                              <div className={`${posArray[Heart.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[Heart.sid] ?? 0.00}</div>
                            </div>
                            <div className="w-full">
                              <p className="text-[14px] font-[600]">{Diamond && Diamond.b1 ? Diamond.b1 : "2.00"}</p>
                              <div className="relative">
                                <div onClick={() => this.handleBackOpen({ data: Diamond, type: "Yes", odds: Diamond.b1, nat: Diamond.nat, sid: Diamond.sid }, this.section1Ref)}
                                  className="even-background font-bold text-sm py-2.5  cursor-pointer uppercase flex justify-center items-center ">
                                  <p className="text-red-color"> <BsSuitDiamondFill /></p>
                                </div>
                                {Diamond && Diamond.gstatus === "1" ? null : <BetLockedRoundedBmx />}
                              </div>
                              <div className={`${posArray[Diamond.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[Diamond.sid] ?? 0.00}</div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>


                <div className="py-1 ">
                  <div className="odds-bet">
                    <p className="flex justify-center items-center text-black text-[16px] font-bold">{CardA?.b1 ? CardA.b1 - oddsDifference : 0}</p>
                    <div className="w-full grid 2xl:grid-cols-12 md:grid-cols-8 grid-cols-5 space-x-0 gap-2 text-center">
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={CardA}
                        num={"1"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                      />
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={Card2}
                        num={"2"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                      />
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={Card3}
                        num={"3"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                      />
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={Card4}
                        num={"4"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                      />
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={Card5}
                        num={"5"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                      />
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={Card6}
                        num={"6"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                      />
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={Card7}
                        num={"7"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                      />
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={Card8}
                        num={"8"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                      />
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={Card9}
                        num={"9"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                      />
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={Card10}
                        num={"10"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                      />
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={CardJ}
                        num={"11"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                      />
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={CardQ}
                        num={"12"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                      />
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={CardK}
                        num={"13"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                      />
                    </div>

                  </div>
                </div>











                {betList && betList.length > 0 ?
                  <div className="space-y-[1px] bg-gray-200 pb-1 rounded">
                    <MyBetTabBmx
                      totalProfitLoss={totalProfitLoss} />
                    <BetListTableBmx betList={betList} />
                  </div>
                  : null}


                <div className="pb-36 bg-black/30">
                  <RoundedTabBmx />
                  <div className="flex space-x-1 justify-end items-center py-0.5 px-2">
                    {result && result.length > 0 ? result?.map((element, index) => (
                      <div onClick={() =>
                        this.handleResultModel(element)} className="bg-[#008000] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                        <p className="text-yellow-200 font-normal text-sm">{element && element.result === "1" ? <p className="text-[#FF4500] font-normal text-sm">A</p> : "B"}</p>
                      </div>
                    )) : null}
                  </div>
                </div>
              </div>


            </div>
          </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state;
  return {
    users,
  };
}

export default connect(mapStateToProps)(AndarBahar2theme2);
