<h1 align="center">The Message Scheduler ©</h1>
<p align="center">The Message Scheduler © : An SMS reminder app that sends messages on schedule</p>
<br>
<p align="center"><a href="https://mssched-frontend.herokuapp.com/"><img src="https://github.com/christopherlye/messageSchedulerFrontend/blob/master/assets/messageScheduler%20banner.jpg" alt="The Message Scheduler ©" width="100%"></a></p>

---

## Inspiration

<p align="justify">I have always believed in automation. Doing something menial over and over again is tedious and time-consuming. Why not apply the DRY (Don't Repeat Yourself) principle to real-life?</p>

<p align="justify">Having worked on my previous wedding RSVP app, I wanted to also figure out how the integration with SMSes worked. So I made the decision to build a message scheduler app which can help with reminding my wedding guests about the important date.</p>

<p align="justify">I also saw that this prototype has the potential to scale further as I could also schedule messages for other events.</p>

<p align="justify">Usually forgetting about upcoming family and friends' birthdays / planning an event? Consider putting these messages on schedule while you sit back, relax, and watch your code do the work for you!</p>

---

## Approach

<a href="https://mssched-frontend.herokuapp.com/"><img src="https://github.com/christopherlye/messageSchedulerFrontend/blob/master/assets/trello%20planning.jpg" alt="Trello planning" width="100%"></a>

In summary:

1. Wireframe how the app should look like
   - Map out on pen and paper
   - Plan out tasks on Trello
2. Create backend using MVC framework
   - Model
     - message: list of messages
     - auth: authentication of user
   - View
     - edit / new / scheduled message components
   - Controller
     - messages: CRUD functionality
3. Create frontend
   - Integrate with Twilio service
   - Come up with my own SMS OTP authentication
4. Add styles to the app

---

## Installation

### Pre-requisites

- A working browser
- A laptop / tablet / desktop

### Steps

These are the installation steps if you would like to view the project locally:

<details>
<summary>Running Locally:</summary>

Step 1: Clone the repository

```
git clone https://github.com/christopherlye/messageSchedulerFrontend.git
```

Step 2: Install npm dependencies

```
npm i
```

Step 3: Start the React app

```
npm start
```

</details>

#

Viewing Online:

[Click to view!](https://mssched-frontend.herokuapp.com/)

---

## Roadmap

### Ideas

- Extend the app to multi-users
- Integrate with JSON web tokens for login
- Create the other backend models
- Style the entire layout using CSS grid
- Integrate with Gmail
- Integrate with Google Calendar

---

## TechStack

- HTML
- CSS
- JavaScript
- ReactJS
- expressJS
- mongoDB
- mongoose
- Twilio
- node cron
- moment

---

## Support

### Known Issues / Feedback

- Currently the app is only usable by me as I have yet to extend it to multiple users
- The backend architecture is not available for viewing right now (feel free to drop me a note on LinkedIn if you have any questions)

---

## Authors

- Christopher Lye

---

## Acknowledgements

A shout-out to all my instructors, Henry, Herda, and Bryan at GA, the Facebook 2.0 team, and my fellow classmates - all of whom have been an inspiration to me - either in their perserverance overcoming their own coding challenges, or simply sharing a bit of what they have learnt along the way.

---

## License

| S/N | License                                         |
| --- | ----------------------------------------------- |
| 1   | [MIT](https://choosealicense.com/licenses/mit/) |
