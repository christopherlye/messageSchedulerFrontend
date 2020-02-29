import React from "react";
import classes from "./ScheduledMessages.module.css";
import ScheduledMessage from "./ScheduledMessage/ScheduledMessage";

const ScheduledMessages = props => {
  let reverseMsg = [...props.msg].sort((a, b) => b.messageID - a.messageID); // shallow copy

  return (
    <div className={classes.MessagesDiv}>
      <h2 className={classes.MessagesTitle}>Scheduled Messages</h2>
      <div style={{ height: "400px", overflow: "scroll" }}>
        <div className={classes.Messages}>
          {reverseMsg.map(message => (
            <ScheduledMessage
              key={message.messageID}
              message={message}
              clickEdit={props.clickEdit}
              isArchived={message.isArchived}
              manuallySelectedMsgID={props.manuallySelectedMsgID}
              autoSelectedMsgID={props.autoSelectedMsgID}
              sentStatus={message.sentStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduledMessages;
