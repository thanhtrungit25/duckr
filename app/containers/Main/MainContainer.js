import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Navigation } from "components"
import { container, innerContainer } from "./styles.css"

const MainContainer = React.createClass({
  propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
  },
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>{this.props.children}</div>
      </div>
    )
  }
})

export default connect(state => ({ isAuthed: state.isAuthed }))(MainContainer)
