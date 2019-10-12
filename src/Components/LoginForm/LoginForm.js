import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./LoginForm.css";

export default function LoginForm(props) {
  const [userName, setEmail] = useState("");
  const [pass, setPassword] = useState("");

  function validateForm() {
    return userName.length > 0 && pass.length > 0;
  }

  function handleSubmit(event) {
      
    event.preventDefault();

    let headers = new Headers();
    headers.set( 'Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin',"*");
    fetch(new Request("http://localhost:8083/authenticate"),
      {
        headers:headers,
         method: 'POST', // or 'PUT'
         //mode:"no-cors",
         body: JSON.stringify({username:userName,password:pass}) // data can be `string` or {object}!

      }
         )
    .then((res)=>res.json())
    .then(data=>{
     
      
      console.log('Token is :::: '+data.token);
      localStorage.setItem("jwtToken","Bearer "+data.token);

      //this.setState({
        // startMenuOption:data['start-menu-list'],
        // contextMenuOption:data['context-menu-list'],
        // desktopItems:data['desktop-items'],
        // desktopItemViews:data['desktop-item-views']
     // });
    });
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={userName}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={pass}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
