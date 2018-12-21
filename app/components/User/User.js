import React from "react"
import PropTypes from "prop-types"
import { userContainer, header } from "./styles.css"

User.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired
}
export default function User (props) {
  return <div className={userContainer}>{props.name}</div>
}
