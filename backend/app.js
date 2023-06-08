const dotenv = require("dotenv");
// configurations
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cookieParser = require("cookie-parser");
// middleware import
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// routes import
const clientRoutes = require("./routes/clientRoute");
const generalRoutes = require("./routes/generalRoute");
const managementRoutes = require("./routes/managementRoute");
const salesRoutes = require("./routes/salesRoute");
const userRoutes = require("./routes/userRoute");

// db import
const connectDB = require("./config/db");
// connect to DB
connectDB();

const upload = multer({ dest: "public/assets/images/" });

// create express instance
const app = express();

// app settings
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(cookieParser());

// root routes 
app.use("/api/client", clientRoutes);
app.use("/api/general", generalRoutes); 
app.use("/api/management", managementRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/users", userRoutes);

app.post("/api/upload-picture-evidence", upload.single("file"), (req, res) => {
    const imageName = req.file.filename;

    res.status(200).json({
        imageName
    });
});

// error handling middlewares
app.use(notFound);
app.use(errorHandler);

// app listen
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));