import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;
const prisma = new PrismaClient();
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

async function getGif(category) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=${category}&rating=g`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const gifData = await response.json();
  const gifUrl = gifData.data.images.original.url;

  return gifUrl;
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/boards", async (req, res) => {
  try {
    const boards = await prisma.board.findMany();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

app.post("/boards", async (req, res) => {
  const { title, category, author } = req.body;
  const img_url = await getGif(category);
  try {
    const newBoard = await prisma.board.create({
      data: {
        title,
        category,
        author,
        img_url,
      },
    });

    res.json(newBoard);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

// app.delete("/boards/:boardId", async (req, res) => {
//   const boardId = parseInt(req.params.boardId);

//   try {
//   await prisma.card.deleteMany({ where: { boardId } });
//   await prisma.board.delete({ where: { id: boardId } });
//   res.json({ message: "Board deleted" });
//   } catch (err) {
//     res.status(500).json({ err: "Internal Server Error" });
//   }
// });
