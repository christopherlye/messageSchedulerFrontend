import React from "react";
import classes from "./NewMessage.module.css";

const NewMessage = props => {
  let msgCounter = (
    <p
      style={{
        position: "relative",
        color: "rgb(177, 177, 177)"
      }}
    >
      {props.currentText.length} / 160
    </p>
  );

  if (props.currentText.length > 160) {
    msgCounter = (
      <p
        style={{
          position: "relative",
          color: "red"
        }}
      >
        {props.currentText.length} / 160
      </p>
    );
  }

  return (
    <div className={classes.NewMessageDiv}>
      <div className={classes.Message}>
        <h2>New Message</h2>
        <form className={classes.NewMessage} onSubmit={props.submitted}>
          <p>Message Body</p>
          {msgCounter}
          <input
            className={classes.InputBox}
            type="text"
            onChange={props.changed}
            value={props.currentText}
          />
          {/* <p>Scheduled Date</p>
          <input className={classes.InputBox} type="date" />
          <p>Scheduled Time</p>
          <input className={classes.InputBox} type="time" /> */}
          <br />
          <br />
          <button className={classes.Button} type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewMessage;
