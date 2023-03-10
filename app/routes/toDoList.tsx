import homeStyles from '~/styles/home.css';
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Todo } from "@prisma/client";

import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    sandwiches: await db.todo.findMany(),
  });
};
export default function ToDoList() {
  const data = useLoaderData<typeof loader>();

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
    <ul>
      {data.sandwiches.map((sandwich) => (
        <li key={sandwich.id}>{sandwich.title}</li>
      ))}
    </ul>
    </div>
    </>
  )
}

export function action(){
  
}

export function links(){
  return [{rel:'stylesheet', href: homeStyles}]
}