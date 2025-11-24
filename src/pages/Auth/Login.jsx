import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/socialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state || "/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl mt-8 ml-8">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">email is required</p>
              )}
              {/* password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                className="input"
                placeholder="Password"
              />
              <div>
                {errors.password?.type === "required" && (
                  <p className="text-red-500">password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    password must be in 6 chaaracters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    Password must be at least 8 characters long and include
                    uppercase, lowercase, number, and special character.
                  </p>
                )}

                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">login</button>
            </fieldset>
            <p>
              New to Zap Shift{" "}
              <Link
                state={location.state}
                className="text-blue-400 underline"
                to="/register"
              >
                Register
              </Link>
            </p>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
