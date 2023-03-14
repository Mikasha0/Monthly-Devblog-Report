import homeStyles from '~/styles/home.css';
import type { ActionArgs } from '@remix-run/node';
import { db } from "~/utils/db.server";

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

  const fields = {author_name:authorName,blog_title: blogTitle, published_date:publishedDate};

  const blogs = await db.blog.create({data:fields});
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
