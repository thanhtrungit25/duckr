const FETCHING_USERS_DUCKS = "FETCHING_USERS_DUCKS"
const FETCHING_USERS_DUCKS_ERROR = "FETCHING_USERS_DUCKS_ERROR"
const FETCHING_USERS_DUCKS_SUCCESS = "FETCHING_USERS_DUCKS_SUCCESS"
const ADD_SINGLE_USERS_DUCK = "ADD_SINGLE_USERS_DUCK"

function fetchingUsersDucks (uid) {
  return {
    type: FETCHING_USERS_DUCKS,
    uid
  }
}

function fetchingUsersDucksError (error) {
  console.warn(error)
  return {
    type: FETCHING_USERS_DUCKS_ERROR,
    error: error | "Error fetching Users Duck Ids"
  }
}

function fetchingUsersDucksSuccess (uid, duckIds, lastUpdated) {
  return {
    type: FETCHING_USERS_DUCKS_SUCCESS,
    uid,
    duckIds,
    lastUpdated
  }
}

export function addSingleUsersDuck (uid, duckId) {
  return {
    type: ADD_SINGLE_USERS_DUCK,
    uid,
    duckId
  }
}

const initialUsersDuck = {
  lastUpdated: 0,
  duckIds: []
}

function usersDuck (state = initialUsersDuck, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_DUCK:
      return {
        ...state,
        duckIds: state.duckIds.concat([action.duckId])
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: false,
  error: ""
}

export default function usersDucks (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS_DUCKS:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_USERS_DUCKS_ERROR:
      return {
        ...state,
        error: action.error,
        isFetching: false
      }
    case FETCHING_USERS_DUCKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          duckIds: action.duckIds
        }
      }
    case ADD_SINGLE_USERS_DUCK:
      console.log(state[action.uid])
      return typeof state[action.uid] === "undefined"
        ? state
        : {
          ...state,
          isFetching: false,
          error: "",
          [action.uid]: usersDuck(state[action.uid], action)
        }
    default:
      return state
  }
}
