import express from "express"

const app = express()

const PORT = 4000;

app.get("/products", (req, res) => {
  res.send(Hello)
}
)

app.listen(PORT, () => {
  console.log("Server is working")
})