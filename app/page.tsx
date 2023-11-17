import { prisma } from "@/libs/prismadb"
import FormTodo from "@/app/todo/components/form.todo";
import ListTodo from "@/app/todo/components/ListTodo";
import { currentUser } from '@clerk/nextjs';
import type { User } from "@clerk/nextjs/api";
import { UserButton } from "@clerk/nextjs";

const TodoPage = async() => {

    const user: User | null = await currentUser();

    if(!user) {
        return <div>Loading...</div>
    }

    const todos = await prisma.todo.findMany({
        where: {
            userId: user?.id,
        },
    });

    return (
        <div className="space-y-8 mt-10">
            <UserButton afterSignOutUrl="/login"/>
            <div className="text-center text-3xl my-10">ToDo List by {user?.username}</div>
            <FormTodo />
            <ListTodo todos={todos}/>
            {/* <pre>
                {JSON.stringify(todos, null, 2)}
            </pre> */}
        </div>
    )
}

export default TodoPage