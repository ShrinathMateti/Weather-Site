import express from "express";
import render from "ejs";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const apiKey = "4ff0ca58a7b93466b89aa404c428f2b0";

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) => {
  const { city } = req.body;
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;
    res.render("index", { weather: weatherData, error: null });
  } catch (error) {
    res.render("index", {
      weather: null,
      error: "Error retrieving weather data ",
    });
  }
});

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
