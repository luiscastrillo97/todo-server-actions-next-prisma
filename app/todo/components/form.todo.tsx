"use client";

import { useRef } from "react";
import { createTodo } from "../actions/todo.action";
import ButtonForm from "./ButtonForm";
import toast from "react-hot-toast";
import { TodoZodZshema } from "../schema/todo.zod";
import { ZodError } from "zod";

const FormTodo = () => {

    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async(data: FormData) => {
        const title = data.get("title") as string

        try {
            // Validaciones
            TodoZodZshema.parse({title})

            const res = await createTodo(title)

            if(!res.success) {
                return toast.error(res?.message)
            } else {
                toast.success("Todo Created")
            }

        } catch (error) {
            if(error instanceof ZodError) {
                return error.issues.map((issue) => (toast.error(issue.message)));
            }
        } finally {
            formRef.current?.reset();
        }
    }
    return (
        <>
            <form ref={formRef} action={handleSubmit} className="flex">
                <input type="text" name="title" className="border rounded border-gray-400 mr-2 p-2 w-full" />
                <ButtonForm />
            </form>
        </>
    )
}

export default FormTodo