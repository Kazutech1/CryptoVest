import app from './app.mjs';
import distributeProfits from './cronJobs/distributeProfits.mjs'; // Import cron job

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  distributeProfits(); // Initialize cron job
});