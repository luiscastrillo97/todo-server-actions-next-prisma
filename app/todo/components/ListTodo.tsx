import { TodoInterface } from "../interfaces/todo"
import ItemTodo from "./ItemTodo"

interface Props {
    todos: TodoInterface[]
}

const ListTodo = ({todos}: Props) => {

    if(!todos.length) {
        return (
            <div className="text-center text-2xl">There is nothing to do</div>
        )
    }

  return (
    <div>
        {todos.map((todo) => (
            <ItemTodo key={todo.id} todo={todo}/>
        ))}
    </div>
  )
}

export default ListTodo