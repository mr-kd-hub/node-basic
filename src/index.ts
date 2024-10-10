import express, { Request, Response } from "express"

const app = express()

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Node.js!');
  });
app.listen(3000,()=>{
    console.log("server is running 3000")
})