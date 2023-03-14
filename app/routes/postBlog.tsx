import homeStyles from '~/styles/home.css';
import type { ActionArgs } from '@remix-run/node';
import bootstrapCSS from "bootstrap/dist/css/bootstrap.min.css";





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
