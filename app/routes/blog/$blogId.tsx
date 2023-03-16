import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const todo = await db.blog.findUnique({
    where: { id: params.blogId },
  });
  if (!todo) {
    throw new Error("Joke not found");
  }
  return json({ todo });
};

export default function JokeRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Here's your todo:</p>
      <p>{data.todo.author_name}</p>
      <p>{data.todo.published_date}</p>
      <Link to=".">{data.todo.article_title} Permalink</Link>
    </div>
  );
}
