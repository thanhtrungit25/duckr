import React from "react"
import PropTypes from "prop-types"
import ReactModal from "react-modal"
import {
  darkBtn,
  newDuckTop,
  pointer,
  newDuckInputContainer,
  newDuckInput,
  submitDuckBtn
} from "./styles.css"
import { formatDuck } from "helpers/utils"

const modalStyle = {
  width: 350,
  margin: "0px auto",
  height: 220,
  borderRadius: 5,
  background: "#EBEBEB",
  padding: 0
}

function Modal(props) {
  function submitDuck() {
    // console.log("Duck", props.duckText)
    // console.log("user", props.user)
    return props.duckFanout(formatDuck(props.duckText, props.user))
  }

  return (
    <span className={darkBtn} onClick={props.openModal}>
      {"Duck"}
      <ReactModal
        style={modalStyle}
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        contentLabel="Modal"
      >
        <div className={newDuckTop}>
          <span>{"Compose New Duck"}</span>
          <span className={pointer} onClick={props.closeModal}>
            {"X"}
          </span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            value={props.duckText}
            onChange={e => props.updateDuckText(e.target.value)}
            maxLength={140}
            type="text"
            className={newDuckInput}
            placeholder="What's on your mind?"
          />
          <button
            className={submitDuckBtn}
            disabled={props.isSubmitDisabled}
            onClick={submitDuck}
          >
            {"Duck"}
          </button>
        </div>
      </ReactModal>
    </span>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  duckText: PropTypes.string.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateDuckText: PropTypes.func.isRequired,
  duckFanout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Modal
