import Logger from "../logger/winston_logger.js";
import User from "../models/User.js";


// update user score and highestscore
export const updateScore = async (req, res) => {
  const { score } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.scores.push(score);
    if (score > user.highestscore) {
      user.highestscore = score;
    }

    await user.save();
    res.json({ highScore: user.highestscore, scores: user.scores });
  } catch (err) {
    Logger.error(err?.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get leaderboard (top 10 users by high score)
export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({}, 'username highestscore')
      .sort({ highestscore: -1 })
      .limit(10);

    res.json(users);
  } catch (err) {
    Logger.error(err?.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
