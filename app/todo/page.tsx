import { prisma } from "@/libs/prismadb"
import FormTodo from "./components/form.todo";
import ListTodo from "./components/ListTodo";

const TodoPage = async() => {

    const todos = await prisma.todo.findMany();

    return (
        <div className="space-y-8">
            <div className="text-center text-3xl my-10">ToDo List</div>
            <FormTodo />
            <ListTodo todos={todos}/>
            {/* <pre>
                {JSON.stringify(todos, null, 2)}
            </pre> */}
        </div>
    )
}

export default TodoPage