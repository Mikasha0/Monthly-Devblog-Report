import homeStyles from "~/styles/home.css";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { useState, useEffect } from "react";
import { useActionData } from "@remix-run/react";
import { badRequest } from "~/utils/request.server";
import { requireUserId } from "~/utils/session.server";

function validateAuthorName(authorName: string) {
  if (authorName.length < 10) {
    return `Name is too short.`;
  }
}

function validateBlogTitle(blogTitle: string) {
  if (blogTitle.length < 10) {
    return `Title too short.`;
  }
}

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
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
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }

  const fieldErrors = {
    author_name: validateAuthorName(authorName),
    article_title: validateBlogTitle(blogTitle),
  };

  const date = new Date(publishDate);
  const formattedDate = date.toISOString();

  const fields = {
    author_name: authorName,
    article_title: blogTitle,
    published_date: formattedDate,
    currentIndexID: parseInt(currentID),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const blog = await db.blog.create({ data: { ...fields, blogId: userId } });
  return redirect(`/blog/${blog.id}`);
};

export default function PostBlog() {
  const [cycleCounter, setCycleCounter] = useState(1);

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

  const actionData = useActionData<typeof action>();
  return (
    <>
      <form method="post" id="todos-form">
        <p>
          <input
            type="text"
            defaultValue={actionData?.fields?.author_name}
            name="authorName"
            aria-invalid={
              Boolean(actionData?.fieldErrors?.author_name) || undefined
            }
            aria-errormessage={
              actionData?.fieldErrors?.author_name ? "name-error" : undefined
            }
            placeholder="Author Name"
            required
          />
        </p>
        {actionData?.fieldErrors?.author_name ? (
          <p
            className="form-validation-error"
            style={{ color: "red" }}
            role="alert"
            id="name-error"
          >
            {actionData.fieldErrors.author_name}
          </p>
        ) : null}
        <p>
          <input
            type="text"
            defaultValue={actionData?.fields?.article_title}
            name="blogTitle"
            aria-invalid={
              Boolean(actionData?.fieldErrors?.article_title) || undefined
            }
            placeholder="Title of the Article"
            required
          />
        </p>
        {actionData?.fieldErrors?.article_title ? (
          <p
            className="form-validation-error"
            style={{ color: "red" }}
            role="alert"
            id="name-error"
          >
            {actionData.fieldErrors.article_title}
          </p>
        ) : null}
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
