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
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  handleAuth () {
    this.props
      .fetchAndHandleAuthedUser()
      .then(() => this.context.router.replace("/feed"))
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
  state => ({
    isFetching: state.users.isFetching,
    error: state.users.error
  }),
  dispatch => bindActionCreators(userActionCreators, dispatch)
)(AuthenticateContainer)
