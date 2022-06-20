import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { cleanup } from "@testing-library/react";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect Summary
  // useEffect(() => {
  //   console.log("EFFECT RUNNING!");
  // });
  // It runs when the component first mounts (rendered for the first time)
  // But also for every state update
  // For every click inside email & password field
  // For evry keystrole
  // It runs everytime the component funtion reruns
  // the useEffect runs after every component re-render cycle (not before it , not during it but after it) including the first time the component was mounted.

  // useEffect(() => {
  //   console.log("EFFECT RUNNING!");
  // }, []);
  // Now the function inside useEffect runs only the first time the component was mounted nd rendered but not thereafter, not for any subsequent re-render cycle.

  // useEffect(() => {
  //   console.log("EFFECT RUNNING!");

  //   return () => {
  //     console.log("EFFECT CLEANUP!");
  //   };
  // }, [enteredPassword]);
  // Now the function runs whenever the component was re-evaluated and enteredPassword state changed.
  // the cleanup function runs before the state function (first argument for useEffect) as a whole runs but not before the first time it runs.
  // only runs when we start typing in the password field, we see "EFFECT CLEANUP!" in the console. So, "EFFECT CLEANUP!" is triggered and it triggers before the useEffect function runs.

  // No dependencies
  // useEffect(() => {
  //   console.log("EFFECT RUNNING!");

  //   return () => {
  //     console.log("EFFECT CLEANUP!");
  //   };
  // }, []);
  // "EFFECT RUNNING!" gets logged only once
  // "EFFECT CLEANUP!" / cleanup function runs only when the component is removed from the dom(we get Welcome back message after loggin in)

  useEffect(() => {
    // console.log("Checking form validity!");
    // setFormIsValid(
    //   enteredEmail.includes("@") && enteredPassword.trim().length > 6
    // );
    const identifier = setTimeout(() => {
      // console.log("Checking form validity!");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    // cleanup function
    // runs before every side-effect function execution
    // and before the component is removed
    // does not run before the first side-effect function execution
    return () => {
      // console.log("cleanup ran!");
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes("@")
    // );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
