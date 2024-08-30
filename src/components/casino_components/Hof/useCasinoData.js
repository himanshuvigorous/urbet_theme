import { useCallback, useEffect, useRef, useState } from "react";
import { httpPost } from "../../../http/http";
import { io } from "socket.io-client";
import axios from "axios";


const useCasinoData = ( eventId) => {
    const [state, setState] = useState({
        backBetModal: false,
        offset: 0,
        betSlipData: {},
        fieldsbet: {},
        errorsbet: {},
        count: 0,
        time: 7,
        casinoData: [],
        ResultModel: false,
        backBetModalMobile: false,
        showLoader: false,
        resultData: {},
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
        shortName: "teen20",
        betList: [],
        betresponse: [],
        setting: {},
        posArray: {},
        currentRoundId: 0,
        oddsDifference: 0,
        totalProfitLoss: 0,
        betChipsData: [],
        message: "",
        isFatch: false,
        error: false,
        socketPerm: "",
        domainSettingByDomainName: null,
        alertStatus: {
          status: false,
          type: "",
          message: "",
        },
        declaredBetList: [],
        DeclaredTotalProfitLoss: "",
        decalaredListModal: false,
      });
    
      const socket = useRef(null);
      const section1Ref = useRef(null);
      const inputRef = useRef(null);
      const scrollTimeout = useRef(null);
    
      const checkWindowWidth = useCallback(() => {
        const isMobile = window.matchMedia("(max-width: 100vw)").matches;
        if (isMobile && inputRef.current) {
          setTimeout(() => {
            inputRef.current.focus();
          }, 0);
        }
      }, []);
    
      const increaseCount = () => {
        const increasedCount = (parseFloat(state.count) + 0.01).toFixed(2);
        setState((prevState) => ({
          ...prevState,
          count: parseFloat(increasedCount),
        }));
      };
    
      const decreaseCount = () => {
        const decreasedCount = (parseFloat(state.count) - 0.01).toFixed(2);
        setState((prevState) => ({
          ...prevState,
          count: parseFloat(decreasedCount),
        }));
      };
    
      const handleAlertModal = () => {
        setState((prevState) => ({
          ...prevState,
          alertStatus: {
            status: false,
            type: "",
            message: "",
          },
        }));
      };
    
      const closeDeclaredModal = () => {
        setState((prevState) => ({
          ...prevState,
          declaredBetList: [],
          DeclaredTotalProfitLoss: "",
          decalaredListModal: false,
        }));
      };
    
      const handleBackOpen = (data, sectionRef) => {
        try {
          setState((prevState) => ({
            ...prevState,
            backBetModal: false,
          }));
    
          if (scrollTimeout.current) {
            clearInterval(scrollTimeout.current);
          }
    
          setState((prevState) => ({
            ...prevState,
            backBetModal: true,
            betSlipData: { ...data, stake: "0" },
            count: data.odds,
            teamname: data.name,
            time: 7,
          }));
    
          scrollTimeout.current = setInterval(() => {
            setState((prevState) => {
              const newTime = prevState.time - 1;
              if (newTime === 0) {
                clearInterval(scrollTimeout.current);
                return { ...prevState, backBetModal: false, time: 0 };
              }
              return { ...prevState, time: newTime };
            });
          }, 1000);
    
          setTimeout(() => {
            if (sectionRef && sectionRef.current) {
              sectionRef.current.scrollIntoView({ behavior: "smooth" });
    
              if (window.innerWidth <= 768 && inputRef.current) {
                sectionRef.current.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                  inputRef.current.focus();
                }, 0);
              }
            }
          }, 0);
        } catch (error) {
          console.error("Error handling back open:", error);
        }
      };
    
      useEffect(() => {
        getDomainSettingByDomainName();
        document.addEventListener("visibilitychange", handleVisibilityChange);
        let requestData = {
          eventId: eventId,
        };
        getDidMountData(requestData);
        betChipData();
    

    
        if (window.innerWidth <= 768 && inputRef.current) {
          inputRef.current.focus();
          inputRef.current.dispatchEvent(new Event("touchstart"));
        }
    
        return () => {
          clearInterval(scrollTimeout.current);

          cleanupWebSocket();
          document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
      }, []);
    
      const getDomainSettingByDomainName = () => {
        try {
          let domainSetting = localStorage.getItem("domainSettingByDomainName");
          if (domainSetting) {
            const parsedDomainSetting = JSON.parse(domainSetting);
            setState((prevState) => ({
              ...prevState,
              domainSettingByDomainName: parsedDomainSetting,
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              domainSettingByDomainName: null,
            }));
          }
        } catch {
          console.error("Error parsing domainSettingByDomainName:");
          setState((prevState) => ({
            ...prevState,
            domainSettingByDomainName: null,
          }));
        }
      };
    
      const getDidMountData = async (requestData) => {
        setState((prevState) => ({ ...prevState, showLoader: true }));
    
        try {
          let getCasinoDetails = await httpPost(
            `casino/getDiamondCasinoByEventId`,
            requestData
          );
          if (!getCasinoDetails.error) {
            let casinoDetails = getCasinoDetails.data;
            let videoUrlType = casinoDetails?.videoUrlType;
            let selectedVideoUrl = casinoDetails?.[`videoUrl${videoUrlType}`];
    
            setState((prevState) => ({
              ...prevState,
              casinoDetails: casinoDetails,
              fetchData:
                casinoDetails && casinoDetails.fetchData
                  ? casinoDetails.fetchData
                  : {},
              socketURL:
                casinoDetails && casinoDetails.socketURL
                  ? casinoDetails.socketURL
                  : {},
              tvUrl: selectedVideoUrl || "",
              cacheURL:
                casinoDetails && casinoDetails.cacheURL
                  ? casinoDetails.cacheURL
                  : {},
              socketPerm:
                casinoDetails && casinoDetails.fetchData
                  ? casinoDetails.fetchData
                  : "",
              betStatus:
                casinoDetails && casinoDetails.betStatus
                  ? casinoDetails.betStatus
                  : "",
              cashinoStatus:
                casinoDetails && casinoDetails.cashinoStatus
                  ? casinoDetails.cashinoStatus
                  : "",
              eventId:
                casinoDetails && casinoDetails.eventId
                  ? casinoDetails.eventId
                  : "",
              minStake:
                casinoDetails && casinoDetails.minStake
                  ? casinoDetails.minStake
                  : "",
              maxStake:
                casinoDetails && casinoDetails.maxStake
                  ? casinoDetails.maxStake
                  : "",
              name: casinoDetails && casinoDetails.name ? casinoDetails.name : "",
              shortName:
                casinoDetails && casinoDetails.shortName
                  ? casinoDetails.shortName
                  : "teen20",
              setting:
                casinoDetails && casinoDetails.setting ? casinoDetails.setting : {},
              oddsDifference:
                casinoDetails?.setting?.oddsDifference || 0,
            }));
    
            if (casinoDetails.eventId) {
              betList(casinoDetails.eventId);
            }
    
            let socketPerm = "";
            let socketUrl = "";
            let cacheUrl = "";
    
            if (casinoDetails.fetchData) {
              socketPerm = casinoDetails.fetchData;
            }
            if (casinoDetails.socketURL) {
              socketUrl = casinoDetails.socketURL;
            }
            if (casinoDetails.cacheURL) {
              cacheUrl = casinoDetails.cacheURL;
            }
    
            if (socketPerm === "socket") {
              await connectSocket(socketUrl, socketPerm, casinoDetails.shortName);
            } else {
              await callCache(cacheUrl);
            }
          }
        } catch (error) {
          console.error("Error fetching did mount data:", error);
        }
    
        setState((prevState) => ({ ...prevState, showLoader: false }));
      };
    
      const connectSocket = useCallback(async (socketUrl, socketPerm, shortName) => {
        if (!socketUrl) {
          socketUrl = state.socketURL;
        }
        if (!socketPerm) {
          socketPerm = state.socketPerm;
        }
        if (!shortName) {
          shortName = state.shortName;
        }
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
          return;
        }
    
        if (socketPerm === "socket") {
          socket.current = io.connect(socketUrl, {
            transports: ["websocket"],
            reconnection: false,
            reconnectionDelay: 10000,
            timeout: 2000,
          });
    
          socket.current.on("connect", () => {
            console.log("Socket connected");
          });
    
          socket.current.on(shortName, async (data) => {
            if (data.data) {
              let message = JSON.parse(data.data);
    
              if (message && message.betStatus === "off") {
                setState((prevState) => ({
                  ...prevState,
                  alertStatus: {
                    status: true,
                    type: "success",
                    message: message.result,
                  },
                }));
              }
              let { posArray } = state;
    
              let { totalProfitLoss } = await betList(state.eventId);
              if (message) {
                for (let i in message) {
                  let id = message[i].marketId;
    
                  posArray = {
                    ...posArray,
                    [id]: {
                      ...message[i],
                      totalProfitLoss: totalProfitLoss,
                    },
                  };
                }
              }
              setState((prevState) => ({
                ...prevState,
                posArray: posArray,
              }));
            }
          });
    
          socket.current.on("disconnect", (reason) => {
            console.log("Socket disconnected due to: ", reason);
          });
        }
      }, []);
    
      const callCache = useCallback(async (cacheUrl) => {
        let url = cacheUrl || state.cacheURL;
        try {
          setInterval(async () => {
            let res = await getMarketCacheUrl(url);
            setState((prevState) => ({
              ...prevState,
              posArray: {
                ...prevState.posArray,
                ...res,
              },
            }));
          }, 1000);
        } catch (error) {
          console.error("Error in callCache:", error);
          setState((prevState) => ({
            ...prevState,
            posArray: null,
          }));
        }
      }, []);
    
      const getMarketCacheUrl = async (url) => {
        try {
          let response = await axios.get(url);
          return response.data;
        } catch (error) {
          console.error("Error fetching market cache:", error);
          return null;
        }
      };
    
      const updateStackOnclick = (amount) => {
        setState((prevState) => ({
          ...prevState,
          betSlipData: {
            ...prevState.betSlipData,
            stake: amount,
          },
        }));
      };
    
      const updateStake = (e) => {
        let value = e.target.value;
        setState((prevState) => ({
          ...prevState,
          betSlipData: {
            ...prevState.betSlipData,
            stake: value,
          },
        }));
      };
    
      const updatePos = async () => {
        let { posArray, currentRoundId, eventId } = state;
        let { totalProfitLoss } = await betList(eventId);
        if (posArray[currentRoundId]) {
          posArray[currentRoundId] = {
            ...posArray[currentRoundId],
            totalProfitLoss: totalProfitLoss,
          };
        }
        setState((prevState) => ({
          ...prevState,
          posArray: posArray,
        }));
      };
    
      const betList = async (eventId) => {
        try {
          const response = await axios.get(
            `casino/getDeclaredBetListByEventId/${eventId}`
          );
          const { betList, totalProfitLoss } = response.data;
          setState((prevState) => ({
            ...prevState,
            betList: betList,
            totalProfitLoss: totalProfitLoss,
          }));
          return { totalProfitLoss };
        } catch (error) {
          console.error("Error fetching bet list:", error);
        }
      };
    
      const cleanupWebSocket = () => {
        if (socket.current) {
          socket.current.close();
        }
      };
    
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          connectSocket(state.socketURL, state.socketPerm, state.shortName);
        } else {
          cleanupWebSocket();
        }
      };
    
      const handleResultModel = (resultData) => {
        setState((prevState) => ({
          ...prevState,
          ResultModel: true,
          resultData,
        }));
      };
    
      const betChipData = () => {
        try {
          let betChipsData = JSON.parse(localStorage.getItem("betChipsData"));
          if (betChipsData) {
            setState((prevState) => ({
              ...prevState,
              betChipsData,
            }));
          }
        } catch (error) {
          console.error("Error fetching bet chips data:", error);
        }
      };

  return {
    state,updateStake ,handleResultModel,updatePos , handleBackOpen , checkWindowWidth , section1Ref , inputRef ,increaseCount , decreaseCount , handleAlertModal , closeDeclaredModal , scrollTimeout
  };
};

export { useCasinoData };
