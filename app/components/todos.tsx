import styles from './todos.css';
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

type LoaderData = {
  todoListItems: {title:string; todos:string}[]
}

export const loader = async () => {
  const data:LoaderData ={
    todoListItems: await db.todo.findMany(),
  };
  return data;
};

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
    <div id="my-div">
      {/* <h1>Title Here</h1>
      <span>Write Your todos here</span> */}
      
    </div>
    </>
  )
}

export function links(){
  return [{rel:'stylesheet', href: styles}]
}