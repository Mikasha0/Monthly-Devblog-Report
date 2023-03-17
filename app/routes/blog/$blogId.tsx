// import type { LoaderArgs } from "@remix-run/node";
// import { json } from "@remix-run/node";
// import { Link, useLoaderData } from "@remix-run/react";
// import styles from '~/styles/newBlog.css';

// import { db } from "~/utils/db.server";

// export const loader = async ({ params }: LoaderArgs) => {
//   const blogs = await db.blog.findUnique({
//     where: { id: params.blogId },
//   });
//   if (!blogs) {
//     throw new Error("Joke not found");
//   }
//   return json({ blogs });
// };

// export default function BlogRoute() {
//   const data = useLoaderData<typeof loader>();

//   return (
//     // <div>
//     //   <p>{data.blogs.author_name}</p>
//     //   <p>{data.blogs.published_date}</p>
//     //   <Link to=".">{data.blogs.article_title}</Link>
//     // </div>
//     <ul id="note-list">
//       <li key={data.blogs.id} className="note">
//         <article>
//           <header>
//             <ul className="note-meta">
//               <li>
//                 {/* <time dateTime={data.blogs.id}>
//                   {new Date(data.blogs.id).toLocaleDateString('en-US', {
//                     day: 'numeric',
//                     month: 'short',
//                     year: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit',
//                   })}
//                 </time> */}
//                 <h2>{data.blogs.published_date?.slice(0.8)}</h2>
//               </li>
//             </ul>
//             <h2>{data.blogs.author_name}</h2>
//           </header>
//           <p>{data.blogs.article_title}</p>
//         </article>
//       </li>
//   </ul>
//   );
// }

// export function links() {
//   return [{ rel: 'stylesheet', href: styles }];
// }

import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import styles from '~/styles/newBlog.css';

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

export default function BlogRoute() {
  const data = useLoaderData<typeof loader>();

  const currentDate = new Date().toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <ul id="note-list">
      <li key={data.blogs.id} className="note">
        <article>
          <header>
            <ul className="note-meta">
              <li>
                <time dateTime={currentDate}>{currentDate}</time>
              </li>
            </ul>
            <h2>{data.blogs.author_name}</h2>
          </header>
          <p>{data.blogs.article_title}</p>
        </article>
      </li>
    </ul>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
