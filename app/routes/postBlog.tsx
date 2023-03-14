import homeStyles from '~/styles/home.css';
import { json, } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { ActionArgs } from '@remix-run/node';
import bootstrapCSS from "bootstrap/dist/css/bootstrap.min.css";


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
  
};

export default function PostBlog() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
    <form action="post" id="todos-form">
      <p>
        <input type="text" id="title" name="title" placeholder="Author Name" required/>
      </p>
      <p>
        <input type="text" id="title" name="title" placeholder="Title of the Article" required/>
      </p>
      <p>
        <input type="date" id="title" name="sub-date" placeholder="Enter the submission date" required/>
      </p>
      <div className="form-actions">
        <button>Add Todos</button>
      </div>
    </form>
  
    </>
  )
}


export function links(){
  return [{rel:'stylesheet', href: homeStyles}]
}
export const link = () => [{ rel: "stylesheet", href: bootstrapCSS }];
