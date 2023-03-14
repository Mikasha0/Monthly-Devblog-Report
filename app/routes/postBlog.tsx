import homeStyles from '~/styles/home.css';
import type { ActionArgs } from '@remix-run/node';
import bootstrapCSS from "bootstrap/dist/css/bootstrap.min.css";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const authorName = form.get("authorName");
  const blogTitle = form.get("blogTitle");
  const publishedDate = form.get("publishedDate");

  if (
    typeof authorName !== "string" ||
    typeof blogTitle !== "string" ||
    typeof publishedDate !== "string"
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  // TODO: Create a new blog post using the form data

  return {
    // TODO: Return a response indicating success or failure
  };
};

export default function PostBlog() {

  return (
    <>
    <form action="post" id="todos-form">
      <p>
        <input type="text" name="authorName" placeholder="Author Name" required/>
      </p>
      <p>
        <input type="text" name="blogTitle" placeholder="Title of the Article" required/>
      </p>
      <p>
        <input type="date" name="publishedDate" placeholder="Enter the submission date" required/>
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
