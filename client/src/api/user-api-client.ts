import { LoginFormData } from "../pages/Login"
import { RegisterFormData } from "../pages/Register"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })

    const responseBody = await response.json()

    if (!response.ok) {
        throw new Error(responseBody.message)
    }
}

export const login = async (formData: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })

    const body = await response.json()

    if (!response.ok) {
        throw new Error(body.message)
    }

    return body
}

export const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
        credentials: "include",
        method: "POST",
    })
    
    if (!response.ok) {
        throw new Error("Error during sign out")
    }
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/validate-token`, {
        credentials: "include",
      })
    
      if (!response.ok) {
        throw new Error("Token invalid")
      }
    
      return response.json()
}