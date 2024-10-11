import app from "./app.js";
import { connection } from "./config/db.js";
const port = process.env.PORT
app.listen(port, () => {
     connection()
    console.log(`Express App Listening on ${port}`)
})