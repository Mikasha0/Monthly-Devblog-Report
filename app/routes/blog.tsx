import type { LinksFunction } from "@remix-run/node";
import { Outlet, Link } from "@remix-run/react";
// import { json } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
import stylesUrl from "~/styles/blog.css";
// import { db } from "~/utils/db.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};



export default function BlogsRoute() {

  return (
    <div className="todos-layout">
      <header className="todos-header">
        <div className="container">
          <h1 className="home-link">
            <Link
              to="/"
              title="Remix todos"
              aria-label="Remix todos"
            >
              <span className="logo-medium">Monthly Devblog Reports</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="todos-main">
        <div className="container">
          <div className="todos-list">
            <p>Here are a few more todos to check out:</p>
            {/* <ul>
      {data.todos.map((todo) => (
        <li key={todo.id}>
          <Link to={todo.id}>{todo.title}</Link>
        </li>
      ))}
    </ul> */}
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
