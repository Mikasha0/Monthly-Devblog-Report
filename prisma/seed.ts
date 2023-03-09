import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed(){
    await Promise.all(
        gettoDoList().map((todos)=>{
            return db.todo.create({data:todos});
        })
    )
}

seed();

function gettoDoList(){
    return[
        {
            title:"Hero",
            todos:'i am a hero',
            completed: false
        },
        {
            title:"Don",
            todos:'i am Don',
            completed: false
        },
        {
            title:"Anime",
            todos:"My Hero Academia",
            completed: false
        }
    ]
}