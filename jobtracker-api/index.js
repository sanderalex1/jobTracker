import app from "./app.js";
const PORT = 3000;

app.listen(PORT, () => {
  // starts it on port 3000
  console.log(`Server is currently running on port ${PORT}`);
});
