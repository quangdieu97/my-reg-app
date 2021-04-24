import React, { useState } from "react";
import styled from "@emotion/styled";
//import { Route, Link } from "react-router-dom";
import "./App.css";
import { useForm } from "react-hook-form";
import Welcome from "./Welcome";

let userData = [];

function App() {
  const [data, setData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    userData.push(data);
    localStorage.setItem("userData", JSON.stringify(userData));
    setData(data);
    setSubmitted(true);
  };

  if (!submitted) {
    return (
      <div>
        {/*<Route path="/reg">*/}
          <div className="contact-us">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Full Name:</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  {...register("fullname", { required: "Name required" })}
                />
                {errors.fullname && (
                  <ErrorMessage>{errors.fullname.message}</ErrorMessage>
                )}
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  {...register("email", {
                    required: "Must enter email",
                    pattern: {
                      /* Unnecessary as HTML input of type email already has its built-in validation, but included here for consistency */
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
              </div>
              <div>
                <label>Phone Number:</label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  {...register("phone", {
                    required: "Must enter a phone number",
                    minLength: {
                      value: 8,
                      message: "Singaporean number must be of 8 digits.",
                    },
                    maxLength: {
                      value: 8,
                      message: "Singaporean number must be of 8 digits.",
                    },
                  })}
                />
                {errors.phone && (
                  <ErrorMessage>{errors.phone.message}</ErrorMessage>
                )}
              </div>
              <div>
                <label>Address:</label>
                <textarea
                  rows="4"
                  placeholder="Address"
                  name="address"
                  {...register("address")}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  {...register("password", { required: "Must enter password" })}
                />
                {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
              </div>
              <div>
                  <input className="button" type="submit">
                    {/*<Link to="/welcome"></Link>*/}
                  </input>
              </div>
            </form>
          </div>
          
        {/*</Route>
        <Route path="/welcome">
          <Welcome></Welcome>
        </Route>*/}
      </div>
    );
  } else {
    return <Welcome data={data} />;
  }
}

export default App;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
`;

ErrorMessage.defaultProps = { role: "alert" };
