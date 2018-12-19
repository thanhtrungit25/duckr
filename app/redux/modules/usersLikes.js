import { saveToUsersLikes, incrementNumberOfLikes } from "helpers/api"
import {
  deleteFromUsersLikes,
  decrementNumbersOfLikes
} from "../../helpers/api"

export const ADD_LIKE = "ADD_LIKE"
export const REMOVE_LIKE = "REMOVE_LIKE"

const FETCHING_LIKES = "FETCHING_LIKES"
const FETCHING_LIKES_ERROR = "FETCHING_LIKES_ERROR"
const FETCHING_LIKES_SUCCESS = "FETCHING_LIKES_SUCCESS"

function addLike (duckId) {
  return {
    type: ADD_LIKE,
    duckId
  }
}

function removeLike (duckId) {
  return {
    type: REMOVE_LIKE,
    duckId
  }
}

function fetchingLikes () {
  return {
    type: FETCHING_LIKES
  }
}

function fetchLikesError (error) {
  console.warn(error)
  return {
    type: FETCHING_LIKES_ERROR,
    error: "Error fetching likes"
  }
}

function fetchingLikesSuccess (likes) {
  return {
    type: FETCHING_LIKES_SUCCESS,
    likes
  }
}

const initialState = {
  isFetching: false,
  error: ""
}

export function addAndHandleLike (duckId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(addLike(duckId))

    const uid = getState().users.authedId
    Promise.all([
      saveToUsersLikes(uid, duckId),
      incrementNumberOfLikes(duckId)
    ]).catch(error => {
      console.warn(error)
      dispatch(removeLike(duckId))
    })
  }
}

export function handleDeleteLike (duckId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(removeLike(duckId))

    const uid = getState().users.authedId
    Promise.all([
      deleteFromUsersLikes(uid, duckId),
      decrementNumbersOfLikes(duckId)
    ]).catch(error => {
      console.warn(error)
      dispatch(addLike(duckId))
    })
  }
}

export default function usersLikes (state = initialState, action) {
  const type = action.type
  switch (type) {
    case FETCHING_LIKES:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_LIKES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_LIKES_SUCCESS:
      return {
        ...state,
        ...action.likes,
        isFetching: false,
        error: ""
      }
    case REMOVE_LIKE:
      return Object.keys(state)
        .filter(duckId => action.duckId !== duckId)
        .reduce((prev, current) => {
          prev[current] = state[current]
          return prev
        }, {})
    default:
      return state
  }
}
