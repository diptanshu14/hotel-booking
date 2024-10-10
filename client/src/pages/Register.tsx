import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as userApiClient from "../api/user-api-client"
import { Link, useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

export type RegisterFormData = {
    firstName: string
    lastName: string
    email: string
    password: string
    confrimPassword: string
}

const Register = () => {
    const navigate = useNavigate()
    const { showToast } = useAppContext()
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>()

    const mutation = useMutation(userApiClient.register, {
        onSuccess: () => {
            showToast({message: "Registration Successful!", type: "SUCCESS"})
            navigate("/")
        },
        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"})
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })

    return (
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input type="text"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("firstName", { required: "This field is required" })} 
            ></input>
            {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input type="text"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("lastName", { required: "This field is required" })} 
            ></input>
            {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </label>
        </div>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input type="email"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "This field is required" })} 
          ></input>
          {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", { 
                required: "This field is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" } 
            })} 
          ></input>
          {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Confirm Password
          <input type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("confrimPassword", {
                validate: (val) => {
                    if (!val) {
                        return "This field is required"
                    } else if (watch("password") !== val) {
                        return "Your passwords do not match"
                    }
                }
            })} 
          ></input>
          {errors.confrimPassword && (
              <span className="text-red-500">{errors.confrimPassword.message}</span>
          )}
        </label>
        <span className="flex items-center justify-between">
          <button type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Create Account
          </button>
          <span>Already have an Account?{" "} <Link className="text-blue-600 hover:text-blue-800" to="/login">Login</Link></span>
        </span>
      </form>
    )
}

export default Register