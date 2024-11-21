import React from "react";
import { useForm, useFormState } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInUserAsyncThunk,
  signUpUserAsyncThunk,
} from "../store/auth-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faKey } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
    },
  });

  const { errors } = useFormState({
    control,
  });

  const onLoginClick = (data) => {
    const { displayName, email, password } = data;
    dispatch(signUpUserAsyncThunk({ displayName, email, password })).then(
      () => {
        navigate("/");
      }
    );
  };

  return (
    <div className="ecom-container flex items-center justify-center">
      <div className="card w-96 bg-pale-lavender shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onLoginClick)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 opacity-70" />
                <input
                  type="text"
                  className="grow"
                  placeholder="User Name"
                  {...register("displayName", {
                    required: "User name is Required",
                  })}
                />
              </label>
              {errors.displayName && (
                <p className="text-deep-red text-xs mt-1">
                  {errors.displayName.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="w-4 h-4 opacity-70"
                />
                <input
                  type="email"
                  className="grow"
                  placeholder="email@example.com"
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email",
                    },
                  })}
                />
              </label>
              {errors.email && (
                <p className="text-deep-red text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FontAwesomeIcon icon={faKey} className="w-4 h-4 opacity-70" />
                <input
                  type="password"
                  className="grow"
                  placeholder="*************"
                  {...register("password", {
                    required: "Password is Required",
                  })}
                />
              </label>
              {errors.password && (
                <p className="text-deep-red text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="form-control mt-3">
              <button className="btn ecommerce-btn" type="submit">
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center">
            <p>Already have an account?</p>
            <Link to={"/login"} className="link link-primary">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
