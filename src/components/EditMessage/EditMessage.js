import React from "react";
import "../../index.css";
import classes from "./EditMessage.module.css";
import moment from "moment";

const EditMessage = props => {
  let buttonIsDisabled = false;
  if (props.editMsg.messageID && props.msg) {
    let [filteredMsg] = props.msg.filter(
      msg => msg.messageID === props.editMsg.messageID
    );
    if (
      filteredMsg.messageBody === props.editMsg.messageBody &&
      moment(filteredMsg.scheduledDate).format("D MMM YYYY") ===
        moment(props.editMsg.scheduledDate).format("D MMM YYYY") &&
      moment(filteredMsg.scheduledTime).format("HH:mm") ===
        props.editMsg.scheduledTime &&
      filteredMsg.recipientMobile === props.editMsg.recipientMobile
    ) {
      buttonIsDisabled = true;
    }
  }
  const errorMessage = {
    emptyFields: <p style={{ color: "red" }}>Please fill in empty fields</p>,
    msgBodyTooLong: <p style={{ color: "red" }}>Your message exceeds 1 SMS</p>,
    mobileNoPrefix: <p style={{ color: "red" }}>Please add a "+65" prefix</p>,
    mobileLengthError: (
      <p style={{ color: "red" }}>Please ensure mobile is correct</p>
    ),
    notAllDigits: (
      <p style={{ color: "red" }}>Please ensure mobile are all digits</p>
    ),
    notSGNum: <p style={{ color: "red" }}>Please use an SG number</p>,
    dateInPast: <p style={{ color: "red" }}>Please set a future date</p>
  };

  let msgCounter = (
    <p
      style={{
        position: "relative",
        color: "rgb(177, 177, 177)"
      }}
    >
      {props.editMsg.messageBody.length} / 160
    </p>
  );

  if (props.editMsg.messageBody.length > 160) {
    msgCounter = (
      <p
        style={{
          position: "relative",
          color: "red"
        }}
      >
        {props.editMsg.messageBody.length} / 160
      </p>
    );
  }

  return (
    <div className={classes.EditMessageDiv}>
      <div className={classes.Message}>
        <h2>Edit Message</h2>
        <p>Message Body</p>
        {msgCounter}
        <input
          className="inputBox"
          type="text"
          value={props.editMsg.messageBody}
          onChange={props.msgBodyChanged}
        />

        <p>Scheduled Date</p>
        <input
          className="inputBox"
          type="date"
          value={props.editMsg.scheduledDate}
          onChange={props.dateChanged}
        />
        <p>Scheduled Time</p>
        <input
          className="inputBox"
          type="time"
          value={props.editMsg.scheduledTime}
          onChange={props.timeChanged}
        />
        <p>Recipient Mobile</p>
        <input
          className="inputBox"
          type="text"
          value={props.editMsg.recipientMobile}
          onChange={props.recipientMobileChanged}
        />
        <br />
        {props.errors.emptyFields ? errorMessage.emptyFields : null}
        {props.errors.msgBodyTooLong ? errorMessage.msgBodyTooLong : null}
        {props.errors.mobileNoPrefix ? errorMessage.mobileNoPrefix : null}
        {props.errors.mobileLengthError ? errorMessage.mobileLengthError : null}
        {props.errors.notAllDigits ? errorMessage.notAllDigits : null}
        {props.errors.notSGNum ? errorMessage.notSGNum : null}
        {props.errors.dateInPast ? errorMessage.dateInPast : null}
        <br />
        {props.editMsg.messageID ? (
          <button
            className={classes.ArchiveButton}
            type="submit"
            onClick={() => props.clickArchive(props.editMsg.messageID)}
          >
            Archive
          </button>
        ) : null}

        <button
          disabled={buttonIsDisabled}
          className={classes.UpdateButton}
          type="submit"
          onClick={() => props.clickUpdate(props.editMsg.messageID)}
        >
          Update
        </button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default EditMessage;
