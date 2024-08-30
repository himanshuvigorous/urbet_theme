import { all, call, delay, fork, put, takeEvery } from "redux-saga/effects";

import {
  MATCH_LIST_REQUEST,
  DOMIAN_SETTING_BY_DOMAIN_NAME_REQUEST,
  USER_STATEMENT_REQUEST,
  MATCH_DETAIL_REQUEST,
  USER_POSITION_BY_MARKETID_REQUEST,
  COMPLATED_FANCY_BY_MARKET_ID_REQUEST,
  SPORTS_BET_LIST_REQUEST,
  USER_LEDGER_LIST_REQUEST,
  complete_Ledger_Details_REQUEST,
  USER_BALANCE_REQUEST,
  UPDATE_RATE_REFFRENECE_REQUEST,
  CASINO_TRANSACTION_REPORT_REQUEST,
  DIAMOND_BETS_LIST_REQUEST,
  ODDS_BET_PLACE_REQUEST,
  BET_PLACE_REQUEST,
  CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_REQUEST,
  CASINO_CASINO_BET_PLACE_REQUEST,
  CASINO_LOGIN_URL_REQUEST,
  GET_MATKA_LIST_REQUEST,
  MATKA_BET_LIST_REQUEST

} from "../../constants/ActionTypes";
import {

  getMatchListFailure,
  getMatchListSuccess,
  domainSettingByDomainSuccess,
  domainSettingByDomainFailure,
  getUserStatementFailure,
  getUserStatementSuccess,
  getMatchDetailSuccess,
  getMatchDetailFailure,
  userPositionByMarketIdSuccess,
  userPositionByMarketIdFailure,
  getCompletedFancyByMarketIdSuccess,
  getCompletedFancyByMarketIdFailure,
  getSportsBetsListSuccess,
  getSportsBetsListFailure,
  userLedgerListSuccess,
  userLedgerListFailure,
  completeLedgerDetailsListFailure,
  completeLedgerDetailsListSuccess,
  userBalanceSuccess,
  userBalanceFailure,
  setupdateRateReffreneceSuccess,
  setupdateRateReffreneceFailure,
  setcasinoTransactionReportSuccess,
  setcasinoTransactionReportFailure,
  setDiamondBetsListSuccess,
  setDiamondBetsListFailure,
  placeBetSuccess,
  placeBetFailure,
  OddsPlaceBetSuccess,
  oddsPlaceBetFailure,
  getDiamondCasinoByEventIdSuccess,
  getDiamondCasinoByEventIdFailure,
  casinoBetPlaceSuccess,
  casinoBetPlaceFailure,
  casinoLoginUrlSuccess,
  casinoLoginUrlFailure,
  getMatkaListSuccess,
  getMatkaListFailure,
  getMatkaBetListSuccess,
  getMatkaBetListFailure,
  getMatkaByMatkaEventIdSuccess,
  getMatkaByMatkaEventIdFailure,

} from "../actions/User";

import { apiCall } from "./HTTP";
import { NotificationManager } from "react-notifications";

import { message } from "antd";





function* getMatchListSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'sports/matchList', payload);
    if (response.data) {
      localStorage.removeItem('matchList');
      yield put(getMatchListSuccess(response?.data));
      localStorage.setItem('matchList', JSON.stringify(response?.data?.data));
    } else {
      yield put(getMatchListFailure(response.data.message));
    }
  } catch (error) {
    yield put(getMatchListFailure(error));
  }
}


function* domainSettingByDomainSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'website/domainSettingByDomainName', payload);
    if (response.status === 200) {

      localStorage.removeItem("notification")
      yield put(domainSettingByDomainSuccess(response?.data));

      if (response?.data?.data !== null) {
        localStorage.setItem('notification', response.data?.data.clientNotification);
      }
    } else {
      yield put(domainSettingByDomainFailure(response?.data?.message));
    }
  } catch (error) {
    yield put(domainSettingByDomainFailure(error?.data?.message));
    NotificationManager.error(error?.data?.message, 'Error', 1000, () => {
      alert('callback');
    });
  }
}

function* getUserStatementSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/userStatement', payload);
    if (response.status === 200) {
      yield put(getUserStatementSuccess(response.data));
    } else {
      yield put(getUserStatementFailure(response.data.message));
    }
  } catch (error) {
    yield put(getUserStatementFailure(error.message));
  }
}

// get match list
function* getMatchDetailSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'sports/sportByMarketId', payload);
    if (response) {
      yield put(getMatchDetailSuccess(response.data));
    } else {
      yield put(getMatchDetailFailure(response.data.message));
    }
  } catch (error) {
    yield put(getMatchDetailFailure(error));
  }
}
function* userPositionByMarketIdSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'sports/userPositionByMarketId', payload);
    if (response.status === 200) {

      yield put(userPositionByMarketIdSuccess(response.data));

    } else {
      yield put(userPositionByMarketIdFailure(response.data.message));
    }
  } catch (error) {
    yield put(userPositionByMarketIdFailure(error.data.message));
  }
}
function* getCompletedFancyByMarketIdSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'sports/completedFancyByMarketId', payload);
    if (response.status === 200) {
      yield put(getCompletedFancyByMarketIdSuccess(response.data));
    } else {
      yield put(getCompletedFancyByMarketIdFailure(response.data.message));
    }
  } catch (error) {
    yield put(getCompletedFancyByMarketIdFailure(error.data.message));

  }
}

//sportsBetsList

function* getSportsBetsListSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'sports/betsList', payload);
    if (response.status === 200) {
      yield put(getSportsBetsListSuccess(response.data));
    } else {
      yield put(getSportsBetsListFailure(response.data.message));
    }
  } catch (error) {
    yield put(getSportsBetsListFailure(error.message));
  }
}






function* userLedgerListSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'user/userLedger', payload)
    if (response) {
      yield put(userLedgerListSuccess(response.data));
    } else {
      yield put(userLedgerListFailure(response.data.message));
    }
  } catch (error) {
    yield put(userLedgerListFailure(error));
  }
}

function* completedLedgerListSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'user/completeLedgerDetails', payload)
    if (response) {
      yield put(completeLedgerDetailsListSuccess(response.data));
    } else {
      yield put(completeLedgerDetailsListFailure(response.data.message));
    }
  } catch (error) {
    yield put(completeLedgerDetailsListFailure(error));
  }
}


//updateRateReffrenece
function* setUpdateRateReffreneceSaga({ payload }) {
  try {
    const response = yield call(apiCall, "PATCH", 'user/updateRateReffrenece', payload)
    if (response) {
      NotificationManager.success(response?.data?.message, "Success", 1000, () => {
        alert('callback');
      });
      localStorage.setItem("rateReffrenec", response?.data?.data?.rateReffrenec);
      yield put(setupdateRateReffreneceSuccess(response.data));
     
    } else {
      yield put(setupdateRateReffreneceFailure(response.data.message));

    }
  } catch (error) {
    yield put(setupdateRateReffreneceFailure(error));
    NotificationManager.error(error?.data?.message, "Wrong", 1000, () => {
      alert('callback');
    });
  }
}


function* userBalanceSaga() {
  try {
    const response = yield call(apiCall, "POST", 'user/userBalance')

    if (response) {
      yield put(userBalanceSuccess(response.data));
      localStorage.setItem('client-wallet-balance', JSON.stringify(response.data.data.coins));
      localStorage.setItem('client-wallet-exposure', JSON.stringify(response.data.data.exposure));
    } else {
      yield put(userBalanceFailure(response.data.message));
    }
  } catch (error) {
    yield put(userBalanceFailure(error));
  }
}


function* setcasinoTransactionReportSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'reports/casinoTransactionReport', payload)
    if (response) {
      yield put(setcasinoTransactionReportSuccess(response.data));
    } else {
      yield put(setcasinoTransactionReportFailure(response.data.message));
    }
  } catch (error) {
    yield put(setcasinoTransactionReportFailure(error));
  }
}

// casino/diamondBetsList

function* setDiamondBetsListSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'casino/diamondBetsList', payload)
    if (response) {
      yield put(setDiamondBetsListSuccess(response.data));
    } else {
      yield put(setDiamondBetsListFailure(response.data.message));
    }
  } catch (error) {
    yield put(setDiamondBetsListFailure(error));
  }
}


/// place bet

function* placeBetSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'sports/sessionBetPlaced', payload);
    if (response.status === 200) {
      yield put(placeBetSuccess(response.data));
    } else {
      yield put(placeBetFailure(response.data.message));
    }
  } catch (error) {
    yield put(placeBetFailure(error.data.message));
  }
}
/// place bet

function* oddsPlaceBetSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'sports/oddBetPlaced', payload);
    if (response.status === 200) {
      yield put(OddsPlaceBetSuccess(response.data));
    } else {
      yield put(oddsPlaceBetFailure(response.data.message));
    }
  } catch (error) {
    yield put(oddsPlaceBetFailure(error.data.message));
  }
}



// Casino Details By Event ID Saga

function* getDiamondCasinoByEventIdSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'casino/getDiamondCasinoByEventId', payload);
    if (response.status === 200) {
      yield put(getDiamondCasinoByEventIdSuccess(response.data));
    } else {
      yield put(getDiamondCasinoByEventIdFailure(response.data.message));
    }
  } catch (error) {
    yield put(getDiamondCasinoByEventIdFailure(error.message));
  }
}


// casino BetPalce

function* casinoBetPlaceSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'casino/casinoBetPlace', payload);
    if (response.status === 200) {
      yield put(casinoBetPlaceSuccess(response.data));
    } else {
      yield put(casinoBetPlaceFailure(response.data.message));
    }
  } catch (error) {
    yield put(casinoBetPlaceFailure(error.message));
  }
}

//casino login url

function* casinoLoginUrlSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/casinoLoginUrl', payload);
    if (response.status === 200) {
      yield put(casinoLoginUrlSuccess(response.data));
    } else {
      yield put(casinoLoginUrlFailure(response.data.message));
    }
  } catch (error) {
    yield put(casinoLoginUrlFailure(error.message));
  }
}

// getMatka List

function* getMatkaListSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'matka/getMatkaList', payload);
    if (response.status === 200) {
      yield put(getMatkaListSuccess(response.data));
    } else {
      yield put(getMatkaListFailure(response.data.message));
    }
  } catch (error) {
    yield put(getMatkaListFailure(error.message));
  }
}


//.........matka/matkaBetList


function* getMatkaBetListSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'matka/matkaBetList', payload);
    if (response.status === 200) {
      yield put(getMatkaBetListSuccess(response.data));
    } else {
      yield put(getMatkaBetListFailure(response.data.message));
    }
  } catch (error) {
    yield put(getMatkaBetListFailure(error.message));
  }
}



//..............matka event byb event id



function* getMatkaByMatkaEventIdSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'matka/getMatkaByMatkaEventId', payload);
    if (response.status === 200) {
      yield put(getMatkaByMatkaEventIdSuccess(response.data));
    } else {
      yield put(getMatkaByMatkaEventIdFailure(response.data.message));
    }
  } catch (error) {
    yield put(getMatkaByMatkaEventIdFailure(error.message));
  }
}


export function* watchGetMatkaByMatkaEventId() {
  yield takeEvery(MATKA_BET_LIST_REQUEST, getMatkaByMatkaEventIdSaga);
}




export function* watchGetMatkaBetList() {
  yield takeEvery(MATKA_BET_LIST_REQUEST, getMatkaBetListSaga);
}



export function* watchGetMatkaList() {
  yield takeEvery(GET_MATKA_LIST_REQUEST, getMatkaListSaga);
}

export function* watchCasinoLoginUrl() {
  yield takeEvery(CASINO_LOGIN_URL_REQUEST, casinoLoginUrlSaga);
}


export function* watchcasinoBetPlace() {
  yield takeEvery(CASINO_CASINO_BET_PLACE_REQUEST, casinoBetPlaceSaga);
}

export function* watchgetDiamondCasinoByEventId() {
  yield takeEvery(CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_REQUEST, getDiamondCasinoByEventIdSaga);
}

export function* watchgetMatchList() {
  yield takeEvery(MATCH_LIST_REQUEST, getMatchListSaga);
}
export function* watchUserDomainSettingByDomainSaga() {
  yield takeEvery(DOMIAN_SETTING_BY_DOMAIN_NAME_REQUEST, domainSettingByDomainSaga);
}

export function* watchgetUserStatement() {
  yield takeEvery(USER_STATEMENT_REQUEST, getUserStatementSaga);
}
export function* watchgetMatchDetail() {
  yield takeEvery(MATCH_DETAIL_REQUEST, getMatchDetailSaga);
}

export function* watchuserPositionByMarketIdSaga() {
  yield takeEvery(USER_POSITION_BY_MARKETID_REQUEST, userPositionByMarketIdSaga);
}
export function* watchgetSportsBetsList() {
  yield takeEvery(SPORTS_BET_LIST_REQUEST, getSportsBetsListSaga);
}

//getCompletedFancyByMarketIdSaga

export function* watchGetCompletedFancyByMarketId() {
  yield takeEvery(COMPLATED_FANCY_BY_MARKET_ID_REQUEST, getCompletedFancyByMarketIdSaga);
}
export function* watchUserLedgerList() {
  yield takeEvery(USER_LEDGER_LIST_REQUEST, userLedgerListSaga);
}

export function* watchCompletedLedgerList() {
  yield takeEvery(complete_Ledger_Details_REQUEST, completedLedgerListSaga);
}

export function* watchUserBalance() {
  yield takeEvery(USER_BALANCE_REQUEST, userBalanceSaga);
}

export function* watchUpdateRateReffreneceList() {
  yield takeEvery(UPDATE_RATE_REFFRENECE_REQUEST, setUpdateRateReffreneceSaga);
}


export function* watchsetcasinoTransactionReportSaga() {
  yield takeEvery(CASINO_TRANSACTION_REPORT_REQUEST, setcasinoTransactionReportSaga);
}

//casino/diamondBetsList
// DIAMOND_BETS_LIST_REQUEST,setDiamondBetsListSaga

export function* watchDiamondBetsListSagaSaga() {
  yield takeEvery(DIAMOND_BETS_LIST_REQUEST, setDiamondBetsListSaga);
}

export function* watchOddsPlaceBet() {
  yield takeEvery(ODDS_BET_PLACE_REQUEST, oddsPlaceBetSaga);
}
export function* watchPlaceBet() {
  yield takeEvery(BET_PLACE_REQUEST, placeBetSaga);
}

export default function* rootSaga() {
  yield all(
    [
      fork(watchgetMatchList),
      fork(watchUserDomainSettingByDomainSaga),
      fork(watchgetUserStatement),
      fork(watchgetMatchDetail),
      fork(watchuserPositionByMarketIdSaga),
      fork(watchGetCompletedFancyByMarketId),
      fork(watchgetSportsBetsList),
      fork(watchUserLedgerList),
      fork(watchCompletedLedgerList),
      fork(watchUserBalance),
      fork(watchUpdateRateReffreneceList),
      fork(watchsetcasinoTransactionReportSaga),
      fork(watchDiamondBetsListSagaSaga),
      fork(watchPlaceBet),
      fork(watchOddsPlaceBet),
      fork(watchgetDiamondCasinoByEventId),
      fork(watchcasinoBetPlace),
      fork(watchCasinoLoginUrl),
      fork(watchGetMatkaList),
      fork(watchGetMatkaByMatkaEventId),
      fork(watchGetMatkaBetList),
    ]
  );
}


