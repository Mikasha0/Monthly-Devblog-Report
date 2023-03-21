import {db} from '~/utils/db.server';
import { useLoaderData } from '@remix-run/react';
import { json } from "@remix-run/node";


export const loader = async () => {
    return json({
      blogs: await db.blog.findMany({take: 5,
        select: { id: true,author_name:true },
        distinct: ["author_name"],
        orderBy: { author_name: "asc" },}),
    });
  };

export default function MonthlyLog() {
    const data = useLoaderData<typeof loader>();
  return (
    <section className="monthly-log">
        <div className="container">
            <h1 style={{color:'white'}}>Below are the monthly log</h1>
        </div>
    </section>
  )
}
