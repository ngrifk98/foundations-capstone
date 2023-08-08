const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 5000;

// Replace 'your-database-url' with your MySQL database URL
const sequelize = new Sequelize('mysql://username:password@localhost:3306/high_scores_db', {
  dialect: 'mysql',
});

// Define the HighScore model
const HighScore = sequelize.define('HighScore', {
  playerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sync the database
sequelize.sync().then(() => {
  console.log('Database and tables are synced!');
}).catch((err) => {
  console.error('Error syncing database:', err);
});

app.use(express.json());

// Get all high scores
app.get('/api/high-scores', async (req, res) => {
  try {
    const highScores = await HighScore.findAll({
      order: [['score', 'DESC']],
      attributes: ['playerName', 'score'],
    });
    res.json(highScores);
  } catch (err) {
    console.error('Error fetching high scores:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save a new high score
app.post('/api/high-scores', async (req, res) => {
  const { playerName, score } = req.body;
  try {
    const highScore = await HighScore.create({ playerName, score });
    res.json(highScore);
  } catch (err) {
    console.error('Error saving high score:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
