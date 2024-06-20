import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import env from "dotenv";

const app = express();
const port = 3000;
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

app.get("/", async (req, res) => {
  res.send(`Hello World!`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
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
  const image_url = await getGif(category);
  try {
    const newBoard = await prisma.board.create({
      data: {
        title,
        category,
        author,
        image_url,
      },
    });

    res.json(newBoard);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});
