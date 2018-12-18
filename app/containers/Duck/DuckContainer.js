import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
// import { bindActionCreators } from "redux"
import { Duck } from "components"

const DuckContainer = React.createClass({
  propTypes: {
    duck: PropTypes.object.isRequired,
    // handleClick: PropTypes.func,
    hideLikeCount: PropTypes.bool,
    hideReplyBtn: PropTypes.bool
    // isLiked: PropTypes.bool.isRequired,
    // numberOfLikes: PropTypes.number
    // addAndHandleLike: PropTypes.func.isRequired,
    // handleDeleteLike: PropTypes.func.isRequired
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getDefaultProps () {
    return {
      hideReplyBtn: false,
      hideLikeCount: true
    }
  },
  goToProfile (e) {
    // Go to profile /uid of duck
    e.stopPropagation()
    // this.context.router.push("/" + this.props.duck.uid)
  },
  handleClick (e) {
    // Go to /duckDetail/duckId
    e.preventDefault()
    // this.context.router.push("/duckDetail/" + this.props.duck.uid)
  },
  render () {
    return <Duck goToProfile={this.goToProfile} onClick={this.handleClick} />
  }
})

function mapStateToProps ({ ducks }, props) {
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn
    // isLiked: usersLikes[props.duckId],
    // numberOfLikes: likeCount[props.duckId]
  }
}

export default connect(mapStateToProps)(DuckContainer)
