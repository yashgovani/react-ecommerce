import React from "react";
import { useForm, useFormState } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInUserAsyncThunk } from "../store/auth-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = useFormState({
    control,
  });

  const onLoginClick = (data) => {
    const { email, password } = data;
    dispatch(signInUserAsyncThunk({ email, password })).then(() => {
      if (location?.state?.from) {
        navigate(`/${location?.state?.from}`);
      } else {
        navigate("/");
      }
    });
  };

  return (
    <div className="ecom-container flex items-center justify-center">
      <div className="card w-96 bg-pale-lavender shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl text-dark-brown font-bold">
            Login
          </h2>
          <form onSubmit={handleSubmit(onLoginClick)}>
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
                  placeholder="Enter password"
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
                Login
              </button>
            </div>
          </form>
          <div className="text-center">
            <p>Don't have an account?</p>
            <Link to={"/signup"} className="link link-primary">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
