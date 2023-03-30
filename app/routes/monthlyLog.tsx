import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import stylesUrl from "~/styles/monthlyLog.css";
import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async () => {
  const startDate = new Date("2023/03/19");
  let dateAfter28Days = new Date("2023/03/19");
  dateAfter28Days.setDate(startDate.getDate() + 28);

  return json({
    blogPosts: await db.blog.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: dateAfter28Days,
        },
      },
      select: {
        author_name: true,
        article_title: true,
        published_date: true,
      },
      orderBy: {
        currentIndexID: "asc",
      },
    }),
  });
};

export default function MonthlyLog() {
  const data = useLoaderData<typeof loader>();

  return (
    <section className="monthly-log">
      <div className="container">
        <h1>Below are the monthly log</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published Date</th>
            </tr>
          </thead>
          <tbody>
            {data.blogPosts.map((post, index) => (
              <tr key={index}>
                <td>{post.article_title}</td>
                <td>{post.author_name}</td>
                <td>
                  {post.published_date
                    ? post.published_date.toLocaleString().slice(0, 10)
                    : "No published date available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
