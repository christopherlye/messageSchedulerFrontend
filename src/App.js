import React, { Component } from "react";
import classes from "./App.module.css";
import ScheduledMessages from "./components/ScheduledMessages/ScheduledMessages";
import NewMessage from "./components/NewMessage/NewMessage";
import axios from "axios";
import EditMessage from "./components/EditMessage/EditMessage";
import moment from "moment";
import lodash from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      enteredText: "",
      messageCount: 0,
      editMsg: {
        messageID: null,
        messageBody: "",
        scheduledDate: "",
        scheduledTime: "",
        recipientMobile: "",
        updatedAt: null
      },
      clickedUpdateStatus: false,
      clickedArchiveStatus: false,
      autoSelectedMsgID: null,
      errors: {},
      isLoggedIn: false
    };
  }

  componentDidMount = () => {
    axios
      .put(`https://mssched-backend.herokuapp.com/login/${this.props.token}`, {
        isLoggedIn: true
      })
      .then(response => {
        console.log("Fulfilled: ", response);
      })
      .catch(error => {
        console.log("Rejected: ", error);
      });

    console.log(this.props.token);
    axios
      .get(`https://mssched-backend.herokuapp.com/messages/${this.props.token}`)
      .then(response => {
        // get the ID of latest message that is not isArchived
        let [autoSelectedMsgID] = response.data
          .filter(message => {
            return !message.isArchived;
          })
          .sort((a, b) => b.messageID - a.messageID);

        this.setState(
          {
            data: response.data,
            messageCount: response.data.length,
            autoSelectedMsgID: autoSelectedMsgID.messageID,
            isLoggedIn: true
          },
          () => {
            const currentData = lodash.cloneDeep(this.state.data);
            const autoSelectedMsg = {
              messageID: null,
              messageBody: "",
              scheduledDate: "",
              scheduledTime: "",
              recipientMobile: "",
              updatedAt: null
            };
            for (let data of currentData) {
              if (data.messageID === this.state.autoSelectedMsgID) {
                autoSelectedMsg.messageID = this.state.autoSelectedMsgID;
                autoSelectedMsg.messageBody = data.messageBody;
                autoSelectedMsg.scheduledDate = moment(
                  data.scheduledDate
                ).format("YYYY-MM-DD");
                autoSelectedMsg.scheduledTime = moment(
                  data.scheduledTime
                ).format("HH:mm");
                autoSelectedMsg.recipientMobile = data.recipientMobile;
                autoSelectedMsg.updatedAt = data.updatedAt;
              }
            }

            this.setState({ editMsg: autoSelectedMsg });
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  newMsgInputChangedHandler = event => {
    this.setState({ enteredText: event.target.value });
  };

  newMsgSubmitInputHandler = event => {
    event.preventDefault();
    // prevent empty submissions
    if (this.state.enteredText === "") {
      return;
    }
    let updatedMsgCount = this.state.messageCount;
    updatedMsgCount += 1;
    const newItem = {
      messageID: updatedMsgCount,
      messageBody: this.state.enteredText.slice(),
      scheduledDate: new Date().getTime() + 24 * 60 * 60 * 1000, // default one day later
      scheduledTime: new Date(),
      isArchived: false,
      sentStatus: "new",
      recipientMobile: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    axios
      .post(
        `https://mssched-backend.herokuapp.com/messages/${this.props.token}/new`,
        newItem
      )
      .then(response => {
        console.log(response);
        const updatedList = lodash.cloneDeep(
          this.state.data.concat(response.data)
        );
        this.setState({
          data: updatedList,
          enteredText: "",
          messageCount: updatedMsgCount
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  clickEditHandler = msgID => {
    const msgList = lodash.cloneDeep(this.state.data);
    let selectedMsg = {
      messageID: null,
      messageBody: "",
      scheduledDate: "",
      scheduledTime: "",
      recipientMobile: "",
      updatedAt: null
    };
    let filteredMsg = msgList.filter(message => {
      return message.messageID === msgID;
    });
    selectedMsg.messageID = filteredMsg[0].messageID;
    selectedMsg.messageBody = filteredMsg[0].messageBody;
    selectedMsg.scheduledDate = moment(filteredMsg[0].scheduledDate).format(
      "YYYY-MM-DD"
    );
    selectedMsg.scheduledTime = moment(filteredMsg[0].scheduledTime).format(
      "HH:mm"
    );
    selectedMsg.recipientMobile = filteredMsg[0].recipientMobile;
    selectedMsg.updatedAt = filteredMsg[0].updatedAt;

    this.setState({ editMsg: selectedMsg });
  };

  editMsgBodyInputChangedHandler = event => {
    const updatedMsg = lodash.cloneDeep(this.state.editMsg);
    updatedMsg.messageBody = event.target.value;
    this.setState({ editMsg: updatedMsg });
  };

  editMsgDateChangedHandler = event => {
    let updatedDate = lodash.cloneDeep(this.state.editMsg);
    updatedDate.scheduledDate = event.target.value;
    this.setState({ editMsg: updatedDate });
  };

  editMsgTimeChangedHandler = event => {
    // let updatedTime = { ...this.state.editMsg }; // shallow copy
    let updatedTime = lodash.cloneDeep(this.state.editMsg);
    updatedTime.scheduledTime = event.target.value;
    this.setState({ editMsg: updatedTime });
  };

  editMsgRecipientMobileChangedHandler = event => {
    let updatedRecipientMobile = lodash.cloneDeep(this.state.editMsg);
    updatedRecipientMobile.recipientMobile = event.target.value;
    this.setState({ editMsg: updatedRecipientMobile });
  };

  clickUpdateValidationHandler = msgID => {
    const errors = {
      emptyFields:
        this.state.editMsg.messageBody === "" ||
        this.state.editMsg.recipientMobile === "" ||
        this.state.editMsg.scheduledDate === "" ||
        this.state.editMsg.scheduledDate === "Invalid date" ||
        this.state.editMsg.scheduledTime === "" ||
        this.state.editMsg.scheduledTime === "Invalid time",
      msgBodyTooLong: this.state.editMsg.messageBody.length > 160,
      mobileNoPrefix:
        this.state.editMsg.recipientMobile.substring(0, 3) !== "+65",
      mobileLengthError: this.state.editMsg.recipientMobile.length !== 11,
      notAllDigits: isNaN(this.state.editMsg.recipientMobile.substring(1)),
      notSGNum:
        this.state.editMsg.recipientMobile.substring(3, 4) !== "6" &&
        this.state.editMsg.recipientMobile.substring(3, 4) !== "8" &&
        this.state.editMsg.recipientMobile.substring(3, 4) !== "9",
      dateInPast:
        moment(this.state.editMsg.scheduledDate).format("YYMMDD") +
          this.state.editMsg.scheduledTime.split(":").join("") <
        moment().format("YYMMDDHHmm")
    };
    const errList = Object.keys(errors).filter(err => errors[err]);

    if (errList.length > 0) {
      this.setState({ clickedUpdateStatus: true, errors: errors });
      return console.log(`[error]: ${errList}`);
    }

    this.setState(
      { clickedUpdateStatus: true, errors: errors },
      this.clickUpdateHandler(msgID)
    );
  };

  clickUpdateHandler = msgID => {
    let currentEditMsg = lodash.cloneDeep(this.state.editMsg);
    let updatedMessage = {
      messageBody: currentEditMsg.messageBody,
      scheduledDate: currentEditMsg.scheduledDate,
      scheduledTime: moment(currentEditMsg.scheduledTime, "HH:mm"), // somehow cannot use .format()?
      sentStatus: "pending",
      recipientMobile: currentEditMsg.recipientMobile,
      updatedAt: moment().format()
    };
    axios
      .put(
        `https://mssched-backend.herokuapp.com/messages/${this.props.token}/edit/${msgID}`,
        updatedMessage
      )
      .then(response => {
        console.log("Fulfilled: ", response);
      })
      .catch(error => {
        console.log("Rejected: ", error);
      });

    let currentData = lodash.cloneDeep(this.state.data);

    for (let data of currentData) {
      if (data.messageID === msgID) {
        data.messageBody = updatedMessage.messageBody;
        data.scheduledDate = updatedMessage.scheduledDate;
        data.scheduledTime = updatedMessage.scheduledTime;
        data.sentStatus = updatedMessage.sentStatus;
        data.recipientMobile = updatedMessage.recipientMobile;
        data.updatedAt = updatedMessage.updatedAt;
      }
    }

    this.setState({
      data: currentData,
      clickedUpdateStatus: false
    });
  };

  clickArchiveValidationHandler = msgID => {
    if (!msgID) {
      this.setState({ clickedArchiveStatus: true });
      return console.log("msgID not available for delete");
    }
    this.setState(
      { clickedArchiveStatus: true },
      this.clickArchiveHandler(msgID)
    );
  };

  clickArchiveHandler = msgID => {
    // let currentData = [...this.state.data]; // shallow copy
    let currentData = lodash.cloneDeep(this.state.data);
    let dataToArchive = null;
    [dataToArchive] = currentData.filter(data => {
      return data.messageID === msgID;
    });
    dataToArchive.isArchived = true;
    dataToArchive.updatedAt = moment().format();

    axios
      .put(
        `https://mssched-backend.herokuapp.com/messages/${this.props.token}/edit/${msgID}`,
        dataToArchive
      )
      .then(response => {
        console.log("Fulfilled: ", response);
      })
      .catch(error => {
        console.log("Rejected: ", error);
      });

    // update state data
    for (let data of currentData) {
      if (data.messageID === msgID) {
        data.isArchived = dataToArchive.isArchived;
        data.updatedAt = dataToArchive.updatedAt;
      }
    }

    this.setState({ data: currentData, clickedArchiveStatus: false });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.data !== this.state.data) {
      let [largestMsgID] = lodash
        .cloneDeep(this.state.data) // array destructuring
        .filter(message => {
          return !message.isArchived;
        })
        .sort((a, b) => b.messageID - a.messageID);

      this.setState(
        {
          autoSelectedMsgID: largestMsgID.messageID
        },
        () => {
          const currentData = lodash.cloneDeep(this.state.data);
          const autoSelectedMsg = {
            messageID: null,
            messageBody: "",
            scheduledDate: "",
            scheduledTime: "",
            recipientMobile: "",
            updatedAt: null
          };
          for (let data of currentData) {
            if (data.messageID === this.state.autoSelectedMsgID) {
              autoSelectedMsg.messageID = this.state.autoSelectedMsgID;
              autoSelectedMsg.messageBody = data.messageBody;
              autoSelectedMsg.scheduledDate = moment(data.scheduledDate).format(
                "YYYY-MM-DD"
              );
              autoSelectedMsg.scheduledTime = moment(data.scheduledTime).format(
                "HH:mm"
              );
              autoSelectedMsg.recipientMobile = data.recipientMobile;
              autoSelectedMsg.updatedAt = data.updatedAt;
            }
          }

          this.setState({ editMsg: autoSelectedMsg });
        }
      );
    }
  };

  render = () => {
    let messageList = <p>Loading...</p>;
    if (this.state.data) {
      // console.log(this.state.data);
      messageList = (
        <ScheduledMessages
          msg={this.state.data}
          clickEdit={this.clickEditHandler}
          manuallySelectedMsgID={this.state.editMsg.messageID}
          autoSelectedMsgID={this.state.autoSelectedMsgID}
        />
      );
    }
    return (
      <div className={classes.App}>
        <h1>Message Scheduler</h1>
        <p>by Christopher Lye</p>
        <NewMessage
          changed={this.newMsgInputChangedHandler}
          currentText={this.state.enteredText}
          submitted={this.newMsgSubmitInputHandler}
        />
        <hr />
        <EditMessage
          msg={this.state.data}
          editMsg={this.state.editMsg}
          msgBodyChanged={this.editMsgBodyInputChangedHandler}
          dateChanged={this.editMsgDateChangedHandler}
          timeChanged={this.editMsgTimeChangedHandler}
          recipientMobileChanged={this.editMsgRecipientMobileChangedHandler}
          clickUpdate={this.clickUpdateValidationHandler}
          clickedUpdateStatus={this.state.clickedUpdateStatus}
          clickArchive={this.clickArchiveValidationHandler}
          errors={this.state.errors}
        />
        <hr />
        {messageList}
      </div>
    );
  };
}

export default App;
