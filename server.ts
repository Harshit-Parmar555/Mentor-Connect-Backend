import app from "./src/app";
import connect from "./src/configs/database";

const PORT = process.env.PORT || 8000;

// Start the server after connecting to the database
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });
