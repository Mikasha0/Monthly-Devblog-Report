import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const blogs = await db.blog.findUnique({
    where: { id: params.blogId },
  });
  if (!blogs) {
    throw new Error("Joke not found");
  }
  return json({ blogs });
};

export default function JokeRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Here's your todo:</p>
      <p>{data.blogs.author_name}</p>
      <Link to=".">{data.blogs.article_title} Permalink</Link>
    </div>
  );
}
