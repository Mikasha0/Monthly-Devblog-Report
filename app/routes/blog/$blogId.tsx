import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {  useLoaderData } from "@remix-run/react";
import styles from '~/styles/newBlog.css';

import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const blogs = await db.blog.findUnique({
    where: { id: params.blogId },
  });

  if (!blogs) {
    throw new Error("Blog not found");
  }

  // Fetch other blogs by the same author
  const otherBlogs = await db.blog.findMany({
    where: { author_name: blogs.author_name, id: { not: blogs.id } },
  });

  return json({ blogs, otherBlogs });
};

export default function BlogRoute() {
  const data = useLoaderData<typeof loader>();

  const currentDate = new Date().toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <ul id="note-list">
        <li key={data.blogs.id} className="note">
          <article>
            <header>
              <ul className="note-meta">
                <li>
                  <time dateTime={currentDate}>{currentDate}</time>
                </li>
              </ul>
              <h3>{data.blogs.article_title}</h3>
            </header>
            <p>Author: {data.blogs.author_name}</p>
            <p>Published Date: {data.blogs.published_date?.slice(0, 10)}</p>
          </article>
        </li>
      </ul>
      {data.otherBlogs.length > 0 && (
        <>
          <ul id="note-list">
            {data.otherBlogs.map((blog) => (
             
        <li key={blog.id} className="note">
          <article>
            <header>
              <ul className="note-meta">
                <li>
                  <time dateTime={currentDate}>{currentDate}</time>
                </li>
              </ul>
              <h3>{blog.article_title}</h3>
            </header>
            <p>Author: {blog.author_name}</p>
            <p>Published Date: {blog.published_date?.slice(0, 10)}</p>
            <p>bb</p>
          </article>
        </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
