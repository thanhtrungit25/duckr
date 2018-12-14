import React from "react"
import PropTypes from "prop-types"
import { Authenticate } from "components"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as userActionCreators from "redux/modules/users"

const AuthenticateContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
  },
  handleAuth () {
    this.props.fetchAndHandleAuthedUser()
  },
  render () {
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
