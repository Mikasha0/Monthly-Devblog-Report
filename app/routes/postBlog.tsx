import homeStyles from '~/styles/home.css';
import { json, } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { ActionArgs } from '@remix-run/node';

import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    todosItemLists: await db.todo.findMany({
      take: 5,
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    }
    )
  });
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const title = form.get("title");
  const todos = form.get("anything");
 
  if (
    typeof title !== "string" ||
    typeof todos !== "string"
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { title, todo:todos };

  
};


 


export default function PostBlog() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
    <form action="post" id="todos-form">
      <p>
        <input type="text" id="title" name="title" placeholder="Title here" required/>
      </p>
      <p>
        <input type="text" id="title" name="anything" placeholder="Write something here..." required/>
      </p>
      <div className="form-actions">
        <button>Add Todos</button>
      </div>
    </form>
    <div id="my-div">
    <ul>
      {data.todosItemLists.map((todos) => (
        <li key={todos.id}>{todos.title}</li>
      ))}
    </ul>
    </div>
    </>
  )
}


export function links(){
  return [{rel:'stylesheet', href: homeStyles}]
}