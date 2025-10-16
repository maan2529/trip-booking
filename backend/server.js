import app from "./src/app.js"
import config from './src/config/environment.js'
const { PORT } = config;
import { connectDB } from "./src/config/database.js";


connectDB();


app.listen(PORT, async () => {
    console.log("server is running on port", PORT);
})