"use client";

import { useFormStatus } from "react-dom"
import { FaSpinner } from "react-icons/fa";

const ButtonForm = () => {

    const { pending } = useFormStatus()

  return (
    <button 
        type="submit"
        className="w-28 text-white border rounded border-gray-400 mr-2 p-2 bg-blue-600 hover:bg-blue-800 grid place-items-center"
    >
        {pending ? (
            <span className="block animate-spin">
                <FaSpinner className="transform rotate-90" />
            </span>
        ) : ("Add")}
    </button>
  )
}

export default ButtonForm