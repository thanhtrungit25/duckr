import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Feed } from "components"
import * as feedActionCreators from "redux/modules/feed"

const FeedContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    duckIds: PropTypes.array.isRequired,
    newDucksAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    resetNewDucksAvailable: PropTypes.func.isRequired
  },
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  },
  render () {
    return (
      <Feed
        isFetching={this.props.isFetching}
        duckIds={this.props.duckIds}
        newDucksAvailable={this.props.newDucksAvailable}
        error={this.props.error}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}/>
    )
  }
})

function mapStateToProps ({ feed }) {
  const { isFetching, error, newDucksAvailable, duckIds } = feed
  return {
    isFetching,
    error,
    newDucksAvailable,
    duckIds
  }
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(feedActionCreators, dispatch)
)(FeedContainer)
