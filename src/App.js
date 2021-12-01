
import { useState } from "react";

import "./App.css";
import Register from "./Register";
import Login from "./Login";
 import { CometChat } from "@cometchat-pro/chat";
import { CometChatUserList } from "./cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import { CometChatUI } from "./cometchat-pro-react-ui-kit/CometChatWorkspace/src";
function App() {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");

  // logout
  const logout = () => {CometChat.logout().then(
      () => {
        //Logout completed successfully
        console.log("Logout completed successfully");
        setUser(null);
      },
      (error) => {
        //Logout failed with exception
        console.log("Logout failed with exception:", { error });
      }
    );};

  // add friend
  const addFriend = (e) => {
    e.preventDefault();
     const options = {
      method: "POST",
      headers: {
        appId: "appId",
        apiKey: "apiKey",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ accepted: [phone] }),
    };

    fetch(`https://api-us.cometchat.io/v2.0/users/${user.uid}/friends`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        alert("Friend Added Successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Adding Friend Failed!");
      });
  };

  return (
    <main>
      <h1>Welcome to KareWise</h1>
      {user ? (
        <section id="chat_body">
          {/* logout button */}
          <button onClick={() => logout()}>Logout</button>

          {/* add friend form */}
          <div>
            <input
              type="tel"
              required
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />{" "}
            <button onClick={(e) => addFriend(e)}>Add Friend</button>
            
          </div>

          {/* chat body */}
          <div style={{ width: "95vw", height: "500px" }}>
            {/* chat will go here... */}
            <CometChatUserList friendsOnly={true} />
    
              <CometChatUI chatWithUser="Somyakk" />
              
          </div>
        </section>
      ) : (
        <section id="auth_forms">
          {/* authentication forms */}
          <Register setUser={setUser} />
          <Login setUser={setUser} />
           
        </section>
      )}
    </main>
  );
}

export default App;