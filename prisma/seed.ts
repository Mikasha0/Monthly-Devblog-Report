import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed(){
    await Promise.all(
        gettoDoList().map((todos)=>{
            return db.blog.create({data:todos});
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
        }
    ]
}