import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { staleUser, staleDucks } from "helpers/utils"
import * as usersDucksActionCreator from "redux/modules/usersDucks"
import * as usersActionCreator from "redux/modules/users"

const UserContainer = React.createClass({
  propTypes: {
    fetchAndHandleUsersDucks: PropTypes.func.isRequired,
    routeParams: PropTypes.shape({ uid: PropTypes.string.isRequired }),
    noUser: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    duckIds: PropTypes.array.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
    fetchAndHandleUser: PropTypes.func.isRequired
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  componentDidMount () {
    const uid = this.props.routeParams.uid

    if (this.props.noUser === true || staleUser(this.props.lastUpdated)) {
      this.props.fetchAndHandleUser(uid)
    }

    if (this.props.noUser === true || staleDucks(this.props.lastUpdated)) {
      this.props.fetchAndHandleUsersDucks(uid)
    }
  },
  render () {
    return <p>Users</p>
  }
})

function mapStateToProps ({ users, usersDucks }, props) {
  const specificUsersDucks = usersDucks[props.routeParams.uid]
  const user = users[props.routeParams.uid]
  const noUser = typeof user === "undefined"
  const name = noUser ? "" : user.info.name
  return {
    noUser,
    name,
    isFetching: users.isFetching || usersDucks.isFetching,
    error: users.error || usersDucks.error,
    lastUpdated: specificUsersDucks ? specificUsersDucks.lastUpdated : 0,
    duckIds: specificUsersDucks ? specificUsersDucks.duckIds : []
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    { ...usersActionCreator, ...usersDucksActionCreator },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer)
