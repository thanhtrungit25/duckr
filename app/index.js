import React from "react"
import ReactDOM from "react-dom"
import routes from "config/routes"
import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import users from "redux/modules/users"

const store = createStore(
  users,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

ReactDOM.render(
  <Provider store={store}>{routes}</Provider>,
  document.getElementById("app")
)
