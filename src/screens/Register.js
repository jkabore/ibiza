import React, { useEffect, useState } from "react";
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import * as EmailValidator from "email-validator";

import Swal from "sweetalert2";
const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  const [checkEmail, setcheckEmail] = useState(false);

  useEffect(() => {
    setcheckEmail(EmailValidator.validate(email));
  }, [email]);

  async function register() {
    if (checkEmail === false) {
      return Swal.fire("Please", "Enter a valid email", "error");
    }
    if (password !== cpassword) {
      return Swal.fire("Passwords", "not matched", "error");
    }
    if (checkEmail === true && password === cpassword) {
      const user = {
        name,
        email,
        password,
      };

      try {
        setloading(true);
        await axios.post(
          `${process.env.REACT_APP_PROD_API}/api/users/register`,
          user
        );
        setloading(false);
        setsuccess(true);
        setemail("");
        setname("");
        setcpassword("");
        setpassword("");
      } catch (error) {
        seterror(true);
        setloading(false);
        console.log(error);
      }
    }
  }

  return (
    <div className="register">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          {loading && <Loader />}
          {success && <Success success="User Registered Successfully" />}
          {error && <Error error="Email already registred" />}

          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Register
          </h2>
          <div>
            <input
              required
              type="text"
              placeholder="name"
              className="form-control mt-1"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              required
              type="text"
              placeholder="email"
              className="form-control mt-1"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="password"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="confirm password"
              className="form-control mt-1"
              value={cpassword}
              required
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />
            <button
              onClick={register}
              className="btn btn-primary rounded-pill mt-3 mb-3"
            >
              REGISTER
            </button>
            <br />
            <a style={{ color: "black" }} href="/login">
              Click Here To Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
