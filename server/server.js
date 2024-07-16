import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import AuthRoute from "./routes/authRoute.js";

dotenv.config();

// mongoose
// 	.connect(process.env.MONGO)
// 	.then(() => {
// 		console.log("Db has conected");
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
	console.log("Server has contected at port 3000");
});

app.use("/api/user", userRoute);
app.use("/api/auth", AuthRoute);
app.use((error, req, res, next) => {
	const statusCode = error.statusCode || 500;
	const message = error.message || "internal server error";
	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});
