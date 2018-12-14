import React from "react"
import PropTypes from "prop-types"
import { Authenticate } from "components"
import auth from "helpers/auth"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as userActionCreators from "redux/modules/users"

const AuthenticateContainer = React.createClass({
  propTypes: {
    fetchingUser: PropTypes.func.isRequired,
    fetchingUserFailure: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
  },
  handleAuth () {
    this.props.fetchingUser()
    auth()
      .then(user => {
        this.props.fetchingUserSuccess(user.uid, user, Date.now())
        this.props.authUser(user.uid)
      })
      .catch(error => this.props.fetchingUserFailure(error))
  },
  render () {
    console.log(this.props)
    return (
      <Authenticate
        onAuth={this.handleAuth}
        isFetching={this.props.isFetching}
        error={this.props.error}/>
    )
  }
})

export default connect(
  state => ({ isFetching: state.isFetching, error: state.error }),
  dispatch => bindActionCreators(userActionCreators, dispatch)
)(AuthenticateContainer)
