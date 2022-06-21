import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";

// reducer fn outside the component function
// because we do not need any data/ interacted that was generated inside the component function
// React will automatically pass the required data to it when required.

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    inValid: null,
  });

  const authCtx = useContext(AuthContext);

  const { isValid: emailValid } = emailState;
  const { isValid: passwordValid } = passwordState;

  useEffect(() => {
    // console.log("Checking form validity!");
    // setFormIsValid(
    //   enteredEmail.includes("@") && enteredPassword.trim().length > 6
    // );
    const identifier = setTimeout(() => {
      // console.log("Checking form validity!");
      setFormIsValid(
        // enteredEmail.includes("@") && enteredPassword.trim().length > 6
        // emailState.isValid && passwordState.isValid
        emailValid && passwordValid
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
    // }, [enteredEmail, enteredPassword]);
    // }, [emailState, passwordState]); // the effect runs too often (whenever email and password change). this includes cases where only the value changes(value may already be valid). but we care about only emaiState.valid not emailState
  }, [emailValid, passwordValid]); // so now whenever the value changes and the validity does not change, this useEffect will not re-run

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // use-case for useReducer
    // we are updating some state based on other previous state
    // Not possible because function form for updating state is possible if the state update depends on the same previous state.
    // but here we depend on two other two snapshots of enteredEmail and enteredPassword
    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );

    // setFormIsValid(
    //   // event.target.value.includes("@") && enteredPassword.trim().length > 6
    //   event.target.value.includes("@") && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes("@")
    // );

    // use-case for useReducer
    // setFormIsValid(
    //   // event.target.value.trim().length > 6 && emailState.value.includes("@")
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };

  // use-case for useReducer (different state variables)
  // might not work because enteredEmail state update was not updated on time.
  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));

    // setEmailIsValid(emailState.value.includes("@"));
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  // use-case for useReducer (different state variables)
  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    // props.onLogin(emailState.value, enteredPassword);
    // props.onLogin(emailState.value, passwordState.value);
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ""
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            // value={enteredEmail}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            // passwordIsValid === false ? classes.invalid : ""
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            // value={enteredPassword}
            value={passwordState.value}
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
