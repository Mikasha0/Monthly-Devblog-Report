import Todos, {links as newTodoLinks} from "~/components/todos";
export default function toDoList() {
  return (
    <main>
      <Todos />
    </main>
  )
}

export function links(){
 return [...newTodoLinks()];
}