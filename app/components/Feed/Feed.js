import React from "react"
import PropTypes from "prop-types"
import { errorMsg } from "sharedStyles/styles.css"
import { header, newDuckContainer } from "./style.css"
import { DuckContainer } from "containers"

NewDucksAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired
}

function NewDucksAvailable({ handleClick }) {
  return (
    <div className={newDuckContainer} onClick={handleClick}>
      {"New Ducks Available"}
    </div>
  )
}

Feed.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  duckIds: PropTypes.array.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired
}

function Feed(props) {
  return props.isFetching === true ? (
    <div className={header}>{"Fetching"}</div>
  ) : (
    <div>
      {props.newDucksAvailable ? (
        <NewDucksAvailable handleClick={props.resetNewDucksAvailable} />
      ) : null}
      {props.duckIds.length === 0 ? (
        <p className={header}>
          {"This is unfortunate."} <br />{" "}
          {"It appears there are no ducks yet 😞"}
        </p>
      ) : null}
      {props.duckIds.map(id => (
        <DuckContainer key={id} duckId={id} />
      ))}
      {props.error ? <p className={errorMsg}>{props.error}</p> : null}
    </div>
  )
}

export default Feed
