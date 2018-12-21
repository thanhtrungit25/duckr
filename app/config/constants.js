import firebase from "firebase"
const config = {
  apiKey: "AIzaSyASIWbxsSPLXbfs3fGo8rebs4HqB_uiOXI",
  authDomain: "reduckr-6d97b.firebaseapp.com",
  databaseURL: "https://reduckr-6d97b.firebaseio.com"
}
firebase.initializeApp(config)
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const usersDucksExpirationLength = 100000
export const userExpirationLength = 100000
