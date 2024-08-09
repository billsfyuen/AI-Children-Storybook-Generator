import express from "express";
import dotenv from "dotenv";
import path from 'path';
import expressSession from "express-session";
import { Request, Response } from "express";
import { router } from "./router";
import { error } from "console";
import { isLoggedIn } from "./utils/guards";

const app = express();
const PORT = 8080;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

dotenv.config();

if (!process.env.SECRET) {
  throw error("SECRET missing in .env");
}

app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
)

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

app.use("/uploads", express.static("uploads"))
app.use("/", router)
app.use("/", express.static("public"))
app.use("/member", isLoggedIn, express.static("private/member"))

app.get('/', (req, res) => {
  res.redirect('/main')
})

app.use((req: Request, res: Response) => {
  res.status(404).json({ "Message": "404 NOT FOUND" })
})

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});