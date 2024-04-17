const express = require("express");
const v1Router = require("./routes/v1");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Simple Todo List API server is running" });
});

app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
