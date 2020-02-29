import React from "react";
import classes from "./ScheduledMessage.module.css";
import moment from "moment";

const ScheduledMessage = props => {
  // conditional classes for selected / unselected msg
  let selectedMsgClass = classes.Message;

  // console.log(`manual: ${props.manuallySelectedMsgID}`);
  // console.log(`auto: ${props.autoSelectedMsgID}`);

  if (props.manuallySelectedMsgID === null) {
    // console.log("yes manual is null");
    if (props.message.messageID === props.autoSelectedMsgID) {
      selectedMsgClass = [classes.Message, classes.SelectedMessage].join(" ");
    }
  } else {
    // console.log("yes manual is NOT null");
    if (props.message.messageID === props.manuallySelectedMsgID) {
      selectedMsgClass = [classes.Message, classes.SelectedMessage].join(" ");
    }
  }

  let status = null;

  if (props.sentStatus === "new") {
    status = <span style={{ color: "red" }}>{props.sentStatus}</span>;
  } else if (props.sentStatus === "pending") {
    status = <span style={{ color: "orange" }}>{props.sentStatus}</span>;
  } else if (props.sentStatus === "successful") {
    status = <span style={{ color: "green" }}>{props.sentStatus}</span>;
  }

  // if message is archived, show null
  if (props.isArchived) {
    return null;
  } else {
    return (
      <div className={selectedMsgClass}>
        <div className={classes.MessageBodyDiv}>
          {status}
          <p>{props.message.messageBody}</p>
          <p>
            {[
              moment(props.message.scheduledDate).format("DD MMM YYYY"),
              moment(props.message.scheduledTime).format("h:mm a")
            ].join(", ")}
          </p>
        </div>
        <div className={classes.ButtonDiv}>
          <button
            className={classes.Button}
            onClick={() => props.clickEdit(props.message.messageID)}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
};

export default ScheduledMessage;
