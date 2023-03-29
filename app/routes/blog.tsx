import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { Outlet, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import stylesUrl from "~/styles/blog.css";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async ({ request }: LoaderArgs) => {
  const blogListItems = await db.blog.findMany({
    take: 5,
    select: { id: true, author_name: true },
    distinct: ["author_name"],
    orderBy: { author_name: "asc" },
  });
  const user = await getUser(request);
  return json({
    blogListItems,
    user,
  });
};

export default function BlogsRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="todos-layout">
      <header className="todos-header">
        <div className="container">
          <h1 className="home-link">
            <Link to="/" title="Remix todos" aria-label="Remix todos">
              <span className="logo-medium">Monthly Devblog Reports</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="todos-main">
        <div className="container">
          <div className="todos-list">
            <h3>Authors At Yarsa Labs</h3>
            <ul>
              {data.blogListItems.map((blog) => (
                <li key={blog.id}>
                  <Link to={blog.id}>{blog.author_name}</Link>
                </li>
              ))}
            </ul>
            <Link to="postBlog" className="button">
              Add your own
            </Link>
          </div>
          <div className="todos-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
