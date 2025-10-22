const path = require("path");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { engine } = require("express-handlebars");

const connectDB = require("./config/db");
const { setUserLocals } = require("./middlware/auth");
const { notFound, errorHandler } = require("./middlware/errorHandler");

require("dotenv").config({ path: "../blog.env" });

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

// Sessions (store in Mongo)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "devsecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

// Public assets
app.use(express.static(path.join(__dirname, "public")));

// Set res.locals.currentUser
app.use(setUserLocals);

// Handlebars view engine with formatDate helper
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    helpers: {
      eq: (a, b) => a === b,
      year: () => new Date().getFullYear(),
      formatDate: (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        });
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", require("./routes/web/authRoutes"));
app.use("/", require("./routes/web/pageRouters"));
app.use("/api/blogs", require("./routes/api/blogRoutes"));

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server after DB connection
const PORT = process.env.PORT || 3000;
connectDB(process.env.MONGODB_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`🚀 Server running http://localhost:${PORT}`)
    )
  )
  .catch((err) => {
    console.error("DB connection failed", err);
    process.exit(1);
  });
