import React, { useState, useContext } from "react";
import Input from "../../../../shared/components/FormElements/Input/Input";
import { useForm } from "../../../../shared/form-hook/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../../shared/util/validators";
import Button from "../../../../shared/components/FormElements/Button/Button";
import Card from "../../../../shared/components/UIElements/Card/Card";
import { UserContext } from "../../../../shared/user-context/user-context";


const LoginSignup = () => {

  const user = useContext(UserContext);
  const [userExists, setUserExists] = useState(true);

  const handleUserSignUp = () => {
   setUserExists((exists) => !exists);
  };


  const [formState, inputHandler] = useForm(
    /** initial inputs param from useForm */
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    /** initial validity from useForm() */
    false
  );

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); /** send this to backend */
    user.login();
  };

  return (
    <Card className="log-in-form-card">
    <form className="log-in-form" onSubmit={loginSubmitHandler}>
    {userExists ? <h2>Login</h2> : <h2>Sign Up</h2>}
      {/* only displays the name field if the user does not have an account */}
      {!userExists && 
        <Input 
          id="name"  
          element="input" 
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="A name is required to create an account"
          onInput={inputHandler}
        />
      }
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="The email you entered is not valid"
          onInput={inputHandler}
        />

        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(10)]}
          errorText="Password must be a minimum of 5 characters"
          onInput={inputHandler}
        />

        <div className="log-in-button">
          {/* redirects user to home page if they are logged in successfully */}
          <div>
          <Button type="submit" disabled={!formState.isValid}>
            {userExists ? "Log In" : "Sign Up"}
          </Button>
          </div>

       <div>
       <Button onClick={handleUserSignUp}>
       {userExists ? "Sign Up" : "Log in"}
        </Button>  
       </div>
        </div>   
    </form>
    </Card>
  );
};

export default LoginSignup;