"use server"; 

import { prisma } from "@/libs/prismadb";
import { revalidatePath } from "next/cache";
import { TodoZodZshema } from "../schema/todo.zod";
import { ZodError } from "zod";
import { auth } from '@clerk/nextjs';

interface TodoCreateResponse {
    success: boolean;
    message: string;
}

export const getUserId = () => {
    const { userId } : { userId: string | null } = auth();
    return userId;
}

export const createTodo = async(title: string): Promise <TodoCreateResponse> => { 

    const userId = getUserId()

    if(!userId) {
        return {
            success: false,
            message: "userId not found",        
        }
    }
    
    try {

        TodoZodZshema.parse({title})

        await prisma.todo.create({
            data: {
                title,
                userId: userId,
            }
        })

        revalidatePath("/todo")

        return {
            success: true,
            message: "Todo Created (backend)"
        }
    } catch (error) {
        if(error instanceof ZodError) {
            return {
                success: false,
                message: error.issues[0].message,        
            }
        }
        return {
            success: false,
            message: "Error creating todo (backend)",        
        }
    }
}

export const deleteTodo = async(id: string) => {

    if(!id || !id.trim()) {
        return {
            success: false,
            message: "Id no valid",        
        }
    }

    try {

        await prisma.todo.delete({
            where: {
                id: id,
            },
        })
        revalidatePath("/todo")
        return {
            success: true,
            message: "Todo deleted",
        }
    } catch (error) {
        return {
            success: false,
            message: "Error deleting todo (backend)",      
        }
    }
}