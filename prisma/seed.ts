import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed(){
    await Promise.all(
        getBlogs().map((blogs)=>{
            return db.blog.create({data:blogs});
        })
    )
}

seed();
function getBlogs() {
  
    return [
      {
        author_name: "Road worker",
        blog_title: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
        published_date: new Date("2022-12-01").toISOString(),
      },
    ];
  }
  
