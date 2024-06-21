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

app.delete("/boards/:boardId", async (req, res) => {
  const boardId = parseInt(req.params.boardId);

  try {
    await prisma.card.deleteMany({ where: { boardId } });
    await prisma.board.delete({ where: { id: boardId } });
    res.json({ message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

app.get("/boards/:boardId", async (req, res) => {
  const boardId = parseInt(req.params.boardId);

  try {
    const board = await prisma.board.findUnique({
      where: { id: boardId },
      include: { cards: true }, // Include related cards if necessary
    });
    if (board) {
      res.json(board);
    } else {
      res.status(404).json({ err: "Board not found" });
    }
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

app.get("/boards/:boardId/cards", async (req, res) => {
  const boardId = parseInt(req.params.boardId);

  try {
    const cards = await prisma.card.findMany({
      where: { boardId },
    });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

// creates a card for an existing board
app.post("/boards/:boardId/cards", async (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const { message, author } = req.body;

  try {
    const selectedBoard = await prisma.board.findUnique({
      where: { id: boardId },
    });
    const image_url = await getGif(selectedBoard.category);
    const newCard = await prisma.card.create({
      data: {
        message,
        author,
        image_url,
        upVote: 0,
        board: { connect: { id: parseInt(boardId) } },
      },
    });
    res.json(newCard);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});
