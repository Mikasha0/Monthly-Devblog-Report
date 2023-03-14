import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed(){
    await Promise.all(
        getJokes().map((todos)=>{
            return db.blog.create({data:todos});
        })
    )
}

seed();
function getJokes() {
    // shout-out to https://icanhazdadjoke.com/
  
    return [
      {
        author_name: "Road worker",
        blog_title: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
        published_date: new Date("2022-12-01").toISOString(),
      },
    ];
  }
  
