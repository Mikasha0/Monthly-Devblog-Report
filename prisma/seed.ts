import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed(){
    const aniket = await db.user.create({
        data: {
          username: "aniket",
          // this is a hashed version of "twixron"
          passwordHash:
            "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
        },
      });
    await Promise.all(
        gettoDoList().map((todos)=>{
            const data = { blogId: aniket.id, ...todos };
      return db.blog.create({ data });
        })
    )
}

seed();

function gettoDoList(){
    return[
        {
            author_name:"Aniket Tamrakar",
            article_title:'Git Aliasing',
            published_date: new Date("2022-12-01").toISOString(),
            currentIndexID: 1,
        }
    ]
}