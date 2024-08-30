import {
  MATCH_LIST_REQUEST,
  MATCH_LIST_SUCCESS,
  MATCH_LIST_FAILURE,

  DOMIAN_SETTING_BY_DOMAIN_NAME_REQUEST,
  DOMIAN_SETTING_BY_DOMAIN_NAME_SUCCESS,
  DOMIAN_SETTING_BY_DOMAIN_NAME_FAILURE,
  USER_STATEMENT_REQUEST,
  USER_STATEMENT_SUCCESS,
  USER_STATEMENT_FAILURE,


  MATCH_DETAIL_REQUEST,
  MATCH_DETAIL_SUCCESS,
  MATCH_DETAIL_FAILURE,
  USER_POSITION_BY_MARKETID_REQUEST,
  USER_POSITION_BY_MARKETID_SUCCESS,
  USER_POSITION_BY_MARKETID_FAILURE,
  COMPLATED_FANCY_BY_MARKET_ID_REQUEST,
  COMPLATED_FANCY_BY_MARKET_ID_SUCCESS,
  COMPLATED_FANCY_BY_MARKET_ID_FAILURE,
  SPORTS_BET_LIST_REQUEST,
  SPORTS_BET_LIST_SUCCESS,
  SPORTS_BET_LIST_FAILURE,

  USER_LEDGER_LIST_REQUEST,
  USER_LEDGER_LIST_SUCCESS,
  USER_LEDGER_LIST_FAILURE,
  complete_Ledger_Details_FAILURE,
  complete_Ledger_Details_SUCCESS,
  complete_Ledger_Details_REQUEST,


  USER_BALANCE_REQUEST,
  USER_BALANCE_SUCCESS,
  USER_BALANCE_FAILURE,

  UPDATE_RATE_REFFRENECE_REQUEST,
  UPDATE_RATE_REFFRENECE_SUCCESS,
  UPDATE_RATE_REFFRENECE_FAILURE,

  CASINO_TRANSACTION_REPORT_REQUEST,
  CASINO_TRANSACTION_REPORT_SUCCESS,
  CASINO_TRANSACTION_REPORT_FAILURE,

  DIAMOND_BETS_LIST_REQUEST,
  DIAMOND_BETS_LIST_SUCCESS,
  DIAMOND_BETS_LIST_FAILURE,
  BET_PLACE_REQUEST,
  BET_PLACE_SUCCESS,
  BET_PLACE_FAILURE,
  ODDS_BET_PLACE_REQUEST,
  ODDS_BET_PLACE_SUCCESS,
  ODDS_BET_PLACE_FAILURE,

  CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_REQUEST,
  CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_SUCCESS,
  CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_FAILURE,
  CASINO_CASINO_BET_PLACE_REQUEST,
  CASINO_CASINO_BET_PLACE_SUCCESS,
  CASINO_CASINO_BET_PLACE_FAILURE,
  CASINO_LOGIN_URL_REQUEST,
  CASINO_LOGIN_URL_SUCCESS,
  CASINO_LOGIN_URL_FAILURE,
  CLOSE_ERROR_MODAL_MATCH_DETAIL,
  GET_MATKA_LIST_REQUEST,
  GET_MATKA_LIST_SUCCESS,
  GET_MATKA_LIST_FAILURE,
  GET_MATKA_BY_MATKA_EVENT_ID_REQUEST,
  GET_MATKA_BY_MATKA_EVENT_ID_SUCCESS,
  GET_MATKA_BY_MATKA_EVENT_ID_FAILURE,
  MATKA_BET_LIST_REQUEST,
  MATKA_BET_LIST_SUCCESS,
  MATKA_BET_LIST_FAILURE,

  

} from "../../constants/ActionTypes";

export const getMatchList = (payload) => ({

  type: MATCH_LIST_REQUEST,
  payload: payload,
});

export const getMatchListSuccess = (payload) => (
  {
    type: MATCH_LIST_SUCCESS,
    payload: payload.data,
  });

export const getMatchListFailure = (error) => ({
  type: MATCH_LIST_FAILURE,
  payload: error,
});

// DOMAIN SETTING BAY DOMAIN NAME


export const domainSettingByDomain = (data) => ({
  type: DOMIAN_SETTING_BY_DOMAIN_NAME_REQUEST,
  payload: data,
});

export const domainSettingByDomainSuccess = (payload) => ({
  type: DOMIAN_SETTING_BY_DOMAIN_NAME_SUCCESS,
  payload
});

export const domainSettingByDomainFailure = (error) => ({
  type: DOMIAN_SETTING_BY_DOMAIN_NAME_FAILURE,
  payload: error,
});

export const getUserStatement = (payload) => ({
  type: USER_STATEMENT_REQUEST,
  payload,
});

export const getUserStatementSuccess = (payload) => ({
  type: USER_STATEMENT_SUCCESS,
  payload,
});

export const getUserStatementFailure = (error) => ({
  type: USER_STATEMENT_FAILURE,
  payload: error,
});

export const getMatchDetail = (payload) => ({

  type: MATCH_DETAIL_REQUEST,
  payload,
});

export const getMatchDetailSuccess = (payload) => (
  {
    type: MATCH_DETAIL_SUCCESS,
    payload,
  });

export const getMatchDetailFailure = (error) => ({
  type: MATCH_DETAIL_FAILURE,
  payload: error,
});


// USERPOSIITON BY MARKJET IFD

export const userPositionByMarketId = (data) => ({
  type: USER_POSITION_BY_MARKETID_REQUEST,
  payload: data,
});

export const userPositionByMarketIdSuccess = (payload) => ({
  type: USER_POSITION_BY_MARKETID_SUCCESS,
  payload
});

export const userPositionByMarketIdFailure = (error) => ({
  type: USER_POSITION_BY_MARKETID_FAILURE,
  payload: error,
});

//completedFancyByMarketId

export const getCompletedFancyByMarketId = (data) => ({
  type: COMPLATED_FANCY_BY_MARKET_ID_REQUEST,
  payload: data,
});

export const getCompletedFancyByMarketIdSuccess = (payload) => ({
  type: COMPLATED_FANCY_BY_MARKET_ID_SUCCESS,
  payload
});

export const getCompletedFancyByMarketIdFailure = (error) => ({
  type: COMPLATED_FANCY_BY_MARKET_ID_FAILURE,
  payload: error,
});

// sportsBetsList 

export const getSportsBetsList = (payload) => ({
  type: SPORTS_BET_LIST_REQUEST,
  payload,
});

export const getSportsBetsListSuccess = (payload) => ({
  type: SPORTS_BET_LIST_SUCCESS,
  payload,
});

export const getSportsBetsListFailure = (error) => ({
  type: SPORTS_BET_LIST_FAILURE,
  payload: error,
});
export const userLedgerList = (payload) => ({
  type: USER_LEDGER_LIST_REQUEST,
  payload,
});

export const userLedgerListSuccess = (payload) => ({
  type: USER_LEDGER_LIST_SUCCESS,
  payload,
});

export const userLedgerListFailure = (error) => ({
  type: USER_LEDGER_LIST_FAILURE,
  payload: error,
});

//.............
export const completeLedgerDetailsList = (payload) => ({
  type: complete_Ledger_Details_REQUEST,
  payload,
});

export const completeLedgerDetailsListSuccess = (payload) => ({
  type: complete_Ledger_Details_SUCCESS,
  payload,
});

export const completeLedgerDetailsListFailure = (error) => ({
  type: complete_Ledger_Details_FAILURE,
  payload: error,
});

//updateRateReffrenece

export const setupdateRateReffrenece = (payload) => ({
  type: UPDATE_RATE_REFFRENECE_REQUEST,
  payload,
});

export const setupdateRateReffreneceSuccess = (payload) => ({
  type: UPDATE_RATE_REFFRENECE_SUCCESS,
  payload,
});

export const setupdateRateReffreneceFailure = (error) => ({
  type: UPDATE_RATE_REFFRENECE_FAILURE,
  payload: error,
});

export const userBalance = (data) => ({
  type: USER_BALANCE_REQUEST,
  payload: data,
});

export const userBalanceSuccess = (balance) => ({
  type: USER_BALANCE_SUCCESS,
  payload: balance
});

export const userBalanceFailure = (error) => ({
  type: USER_BALANCE_FAILURE,
  payload: error,
});

// casinoTransactionReport

export const setcasinoTransactionReport = (payload) => ({
  type: CASINO_TRANSACTION_REPORT_REQUEST,
  payload,
});

export const setcasinoTransactionReportSuccess = (payload) => ({
  type: CASINO_TRANSACTION_REPORT_SUCCESS,
  payload,
});

export const setcasinoTransactionReportFailure = (error) => ({
  type: CASINO_TRANSACTION_REPORT_FAILURE,
  payload: error,
});


//casino/diamondBetsList
// DIAMOND_BETS_LIST_REQUEST,
// DIAMOND_BETS_LIST_SUCCESS,
// DIAMOND_BETS_LIST_FAILURE,


export const setDiamondBetsList = (payload) => ({
  type: DIAMOND_BETS_LIST_REQUEST,
  payload,
});

export const setDiamondBetsListSuccess = (payload) => ({
  type: DIAMOND_BETS_LIST_SUCCESS,
  payload,
});

export const setDiamondBetsListFailure = (error) => ({
  type: DIAMOND_BETS_LIST_FAILURE,
  payload: error,
});



//// Bet place

export const placeBets = (payload) => ({
  type: BET_PLACE_REQUEST,
  payload,
});

export const placeBetSuccess = (payload) => ({
  type: BET_PLACE_SUCCESS,
  payload,
});

export const placeBetFailure = (error) => ({
  type: BET_PLACE_FAILURE,
  payload: error,
});


//// Bet place

export const oddsPlaceBets = (payload) => ({
  type: ODDS_BET_PLACE_REQUEST,
  payload,
});

export const OddsPlaceBetSuccess = (payload) => ({
  type: ODDS_BET_PLACE_SUCCESS,
  payload,
});

export const oddsPlaceBetFailure = (error) => ({
  type: ODDS_BET_PLACE_FAILURE,
  payload: error,
});

// casino/getDiamondCasinoByEventId

export const getDiamondCasinoByEventId = (payload) => ({
  type: CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_REQUEST,
  payload,
});

export const getDiamondCasinoByEventIdSuccess = (payload) => ({
  type: CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_SUCCESS,
  payload,
});

export const getDiamondCasinoByEventIdFailure = (error) => ({
  type: CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_FAILURE,
  payload: error,
});

// casino/casinoBetPlace

export const casinoBetPlace = (payload) => ({
  type: CASINO_CASINO_BET_PLACE_REQUEST,
  payload,
});

export const casinoBetPlaceSuccess = (payload) => ({
  type: CASINO_CASINO_BET_PLACE_SUCCESS,
  payload,
});

export const casinoBetPlaceFailure = (error) => ({
  type: CASINO_CASINO_BET_PLACE_FAILURE,
  payload: error,
});

// CASINO lOGIN uRL

export const casinoLoginUrl = (payload) => ({
  type: CASINO_LOGIN_URL_REQUEST,
  payload,
});

export const casinoLoginUrlSuccess = (payload) => ({
  type: CASINO_LOGIN_URL_SUCCESS,
  payload,
});

export const casinoLoginUrlFailure = (error) => ({
  type: CASINO_LOGIN_URL_FAILURE,
  payload: error,
});

export const ErrorModalClose = () => ({
  type: CLOSE_ERROR_MODAL_MATCH_DETAIL,
});


//MATKA LIST

export const getMatkaList = (payload) => ({
  type: GET_MATKA_LIST_REQUEST,
  payload,
});

export const getMatkaListSuccess = (payload) => ({
  type: GET_MATKA_LIST_SUCCESS,
  payload,
});

export const getMatkaListFailure = (error) => ({
  type: GET_MATKA_LIST_FAILURE,
  payload: error,
});







export const getMatkaByMatkaEventId = (payload) => ({
  type: GET_MATKA_BY_MATKA_EVENT_ID_REQUEST,
  payload,
});

export const getMatkaByMatkaEventIdSuccess = (payload) => ({
  type: GET_MATKA_BY_MATKA_EVENT_ID_SUCCESS,
  payload,
});

export const getMatkaByMatkaEventIdFailure = (error) => ({
  type: GET_MATKA_BY_MATKA_EVENT_ID_FAILURE,
  payload: error,
});

//........
export const getMatkaBetList = (payload) => ({
  type: MATKA_BET_LIST_REQUEST,
  payload,
});

export const getMatkaBetListSuccess = (payload) => ({
  type: MATKA_BET_LIST_SUCCESS,
  payload,
});

export const getMatkaBetListFailure = (error) => ({
  type: MATKA_BET_LIST_FAILURE,
  payload: error,
});