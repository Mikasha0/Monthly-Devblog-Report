import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

const DAYS_AGO = 28;

export const loader = async () => {
  const cutoffDate = new Date("2023/03/19");
  cutoffDate.setDate(cutoffDate.getDate() - DAYS_AGO);
  const endDate = new Date(cutoffDate);
  endDate.setDate(endDate.getDate() + DAYS_AGO);

  return json({
    blogPosts: await db.blog.findMany({
      where: {
        createdAt: {
          gte: cutoffDate,
          lt: endDate,
        },
      },
      select: {
        author_name: true,
        article_title: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    }),
  });
};

export default function MonthlyLog() {
  const data = useLoaderData<typeof loader>();

  return (
    <section className="monthly-log">
      <div className="container">
        <h1 style={{ color: "white" }}>Below are the monthly log</h1>
        {data.blogPosts.map((post, index) => (
          <div key={index}>
            <h2 style={{ color: "green" }}>{post.article_title}</h2>
            <p>{post.author_name}</p>
            {post.createdAt ? (
              <p>{post.createdAt.toLocaleString().slice(0, 10)}</p>
            ) : (
              <p>No creation date available</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
