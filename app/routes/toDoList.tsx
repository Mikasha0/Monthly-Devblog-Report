import homeStyles from '~/styles/home.css';

export default function toDoList() {
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
    <div id="my-div">
      <h1>Title</h1>
      <span>Your Todos here</span>
    </div>
    </>
  )
}

export function action(){
  
}

export function links(){
  return [{rel:'stylesheet', href: homeStyles}]
}