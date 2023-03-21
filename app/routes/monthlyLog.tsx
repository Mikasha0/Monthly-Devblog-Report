import { db } from '~/utils/db.server';
import { useLoaderData } from '@remix-run/react';
import { json } from "@remix-run/node";

const DAYS_AGO = 28;

export const loader = async () => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - DAYS_AGO);

  return json({
    blogPosts: await db.blog.findMany({
      where: {
        published_date: {
          gte: cutoffDate
        }
      },
      select: {
        author_name: true,
        article_title: true,
        published_date: true
      },
      orderBy: {
        currentCycle: "desc"
      }
    })
  });
};

export default function MonthlyLog() {
  const data = useLoaderData<typeof loader>();
  
  return (
    <section className="monthly-log">
      <div className="container">
        <h1 style={{color:'white'}}>Below are the monthly log</h1>
        {data.blogPosts.map((post, index) => (
          <div key={index}>
            <h2 style={{color:'green'}}>{post.article_title}</h2>
            <p>{post.author_name}</p>
            {post.published_date ? (
              <p>{post.published_date.toLocaleString()}</p>
            ) : (
              <p>No published date available</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
