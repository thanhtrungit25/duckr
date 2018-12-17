import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Navigation } from "components"
import { firebaseAuth } from "config/constants"
import { formatUserInfo } from "helpers/utils"
import { container, innerContainer } from "./styles.css"
import * as userActionCreators from "redux/modules/users"

const MainContainer = React.createClass({
  propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  componentDidMount () {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(
          userData.displayName,
          userData.photoURL,
          user.uid
        )
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        if (this.props.location.pathname === "/") {
          this.context.router.replace("/feed")
        }
      } else {
        this.props.removeFetchingUser()
      }
    })
  },
  render () {
    return this.props.isFetching === true ? null : (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>{this.props.children}</div>
      </div>
    )
  }
})

export default connect(
  state => ({
    isAuthed: state.users.isAuthed,
    isFetching: state.users.isFetching
  }),
  dispatch => bindActionCreators(userActionCreators, dispatch)
)(MainContainer)
