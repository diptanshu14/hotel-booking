import { useMutation, useQueryClient } from "react-query"
import { useAppContext } from "../context/AppContext"
import * as userApiClient from "../api/user-api-client"

const LogoutButton = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()

  const mutation = useMutation(userApiClient.logout, {
    onSuccess: async () => {
        await queryClient.invalidateQueries("validateToken")
        showToast({ message: "Logged Out!", type: "SUCCESS" })
    },
    onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" })
    }
  })

  const handleClick = () => {
    mutation.mutate()
  }
  return (
    <button 
      onClick={handleClick}
      className="flex items-center text-white px-3 font-bold hover:bg-white hover:text-blue-800"
    >
        Logout
    </button>
  )
}

export default LogoutButton