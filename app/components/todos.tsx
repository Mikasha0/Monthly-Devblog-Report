import styles from './todos.css';
export default function Todos() {
  return (
    <>
    <form action="post" id="todos-form">
      <p>
        <input type="text" id="title" name="title" placeholder="Title here" required/>
      </p>
      <p>
        <input type="text" id="title" name="title" placeholder="Write something here..." required/>
      </p>
      <div className="form-actions">
        <button>Add Todos</button>
      </div>
    </form>
    <div id="my-div"><h1>My Todos</h1></div>
    </>
  )
}

export function links(){
  return [{rel:'stylesheet', href: styles}]
}