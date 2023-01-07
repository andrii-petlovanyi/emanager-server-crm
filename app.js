import express from "express"
import logger from "morgan"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const typeLogger = app.get("env") === "development" ? "dev" : "short"
const PORT = process.env.PORT || 5005

app.use(logger(typeLogger))
app.use(cors())
app.use(express.json())

app.use((req, res)=>{
    res.status(404).json({message: 'Sorry, this resource not found'})
})

app.listen(PORT, (error) => {
      if (error) console.error("Error at server launch: ", error);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
