import homeStyles from "~/styles/home.css";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { useState, useEffect } from "react";

import bootstrapCSS from "bootstrap/dist/css/bootstrap.min.css";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const authorName = form.get("authorName");
  const blogTitle = form.get("blogTitle");
  const publishDate = form.get("publishedDate");
  const currentID = form.get("currentID");

  if (
    typeof authorName !== "string" ||
    typeof blogTitle !== "string" ||
    typeof publishDate !== "string" ||
    typeof currentID !== "string"
  ) {
    throw new Error(
      `The form was not submitted correctly. Please make sure that you have filled out all fields with the correct type of value, and try again.`
    );
  }

  const date = new Date(publishDate);
  const formattedDate = date.toISOString();

  const fields = {
    author_name: authorName,
    article_title: blogTitle,
    published_date: formattedDate,
    currentIndexID: parseInt(currentID),
  };

  const blog = await db.blog.create({ data: fields });
  return redirect(`/blog/${blog.id}`);
};

export default function PostBlog() {
  const [cycleCounter, setCycleCounter] = useState(0);

  useEffect(() => {
    const cycleDuration = 14 * 24 * 60 * 60 * 1000;
    const fixedDate = new Date("2023-03-19");
    const timerId = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - fixedDate.getTime();
      setCycleCounter(Math.floor(elapsedTime / cycleDuration));
    }, 100);

    return () => clearInterval(timerId);
  }, []);
  return (
    <>
      <form method="post" id="todos-form">
        <p>
          <input
            type="text"
            name="authorName"
            placeholder="Author Name"
            required
          />
        </p>
        <p>
          <input
            type="text"
            name="blogTitle"
            placeholder="Title of the Article"
            required
          />
        </p>
        <p>
          <input
            type="date"
            name="publishedDate"
            placeholder="Enter the submission date"
            required
          />
        </p>
        <p>
          <input
            type="text"
            name="currentID"
            placeholder="Enter the submission date"
            value={cycleCounter}
            readOnly
            required
          />
        </p>
        <div className="form-actions">
          <button>Add Info</button>
        </div>
      </form>
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: homeStyles }];
}
export const link = () => [{ rel: "stylesheet", href: bootstrapCSS }];
