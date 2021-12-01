import { CometChat } from "@cometchat-pro/chat";
import React, { useState } from "react";

export default function Register(props) {
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const setUser = props.setUser;

  const handleSubmit = (e) => {
      e.preventDefault();
   let authKey = "591e1b9b6eb5d93b7bc95b76b600da068dd276a3";
var uid = phone;
var name = userName + " (" + phone + ")";

var user = new CometChat.User(uid);

user.setName(name);

CometChat.createUser(user, authKey).then(
    user => {
        console.log("user created", user);
    },error => {
        console.log("error", error);
    }
)
  };

  return (
    <div id="register">
      <form onSubmit={handleSubmit}>
        <legend>Register</legend>
        {/* phone */}
        <label>Phone Number</label> <br />
        <input
          type="tel"
          required
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />{" "}
        <br />
        {/* user name */}
        <label>User Name</label> <br />
        <input
          type="name"
          required
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />{" "}
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}