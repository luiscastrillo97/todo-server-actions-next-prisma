"use client";

import { FaSpinner, FaTrash } from "react-icons/fa";
import { TodoInterface } from "../interfaces/todo"
import { useTransition } from "react";
import { deleteTodo } from "../actions/todo.action";
import toast from "react-hot-toast";

interface Props {
    todo: TodoInterface;
}

const ItemTodo = ({todo}: Props) => {

  const [isPending, startTransition] = useTransition()

  const handleClickDelete = async(id: string) => { 
      const res = await deleteTodo(id);
      if(!res.success) {
          toast.error(res.message);
      } else {
        toast.success("Todo deleted successfully");
      }
   }

  return (
    <div className="flex justify-between items-center border border-gray-400 rounded mb-2 p-2">
      <span>{todo.title}</span>
      <button
        onClick={() => startTransition(() => handleClickDelete(todo.id))}
      >
        {
          isPending ? (
            <span className="block animate-spin">
                <FaSpinner className="transform rotate-90" />
            </span>
          ) : (
            <span>
              <FaTrash />
            </span>
            )
        }
        
      </button>
    </div>
  )
}

export default ItemTodo