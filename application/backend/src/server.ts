import express, { Request, Response } from 'express';

const app = express();
const port = 5000;

// Middleware (optional)
app.use(express.json());

// Example route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the Express backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
