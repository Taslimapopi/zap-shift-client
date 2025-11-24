import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../../components/socialLogin/SocialLogin";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

const Register = () => {
  const { registerUser ,updataUserProfile} = useAuth();
  const location = useLocation();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    // console.log("after submit", data.photo[0]);
    const profileImage = data.photo[0]
    registerUser(data.email, data.password)
      .then((res) => {
        
        // store the image and get the photourl
        const formData =  new FormData();
        formData.append('image',profileImage)
        const img_Api_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`
        axios.post(img_Api_Url,formData)
        .then(res=>{
            console.log('after image upload',res.data.data.url)
            const userProfile = {
                displayName: data.name,
                photoURL: res.data.data.url
            }
            updataUserProfile(userProfile)
            .then(()=>{
                console.log('userProfile updated')
                navigate(location?.state || '/')
            })
            .catch(err=>console.log(err))
        })
        


      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-8 ml-8">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleRegistration)}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Name"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">email is required</p>
              )}
              {/* photo */}
              <label className="label">Photo</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input "
                placeholder="Photo"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">email is required</p>
              )}
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
              <button className="btn btn-neutral mt-4">register</button>
            </fieldset>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
