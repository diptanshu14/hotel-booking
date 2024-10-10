import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { Link, useLocation, useNavigate } from "react-router-dom"
import * as userApiClient from "../api/user-api-client"
import { useAppContext } from "../context/AppContext"

export type LoginFormData = {
    email: string
    password: string
}

const Login = () => {
    const { showToast } = useAppContext()
    const navigate = useNavigate()
    const location = useLocation()

    const { register, formState: { errors }, handleSubmit, } = useForm<LoginFormData>()

    const mutation = useMutation(userApiClient.login, {
        onSuccess: async () => {
            showToast({ message: "Sign in Successful!", type: "SUCCESS" })
            navigate(location.state?.from?.pathname || "/")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })

    const onSubmit = handleSubmit((data) => {
       mutation.mutate(data);
    })

    return (
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Sign In</h2>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "This field is required" })}
          ></input>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          ></input>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <span className="flex items-center justify-between">
          <button type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Login
          </button>
          <span>Don't have an Account?{" "} <Link className="text-blue-600 hover:text-blue-800" to="/register">Register</Link></span>
        </span>
      </form>  
    )
}

export default Login