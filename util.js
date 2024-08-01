// utils.js

const Config = require("./config"); // Import your Config model

async function getTotalTimeFromDatabase() {
  try {
    const config = await Config.findOne();

    if (config) {
      return config.totalTimeInSeconds;
    } else {
      // Handle the case where no config document is found
      console.error("No config document found in the database");
      return 300; // Default to 5 minutes if no config is found
    }
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.error("Error fetching config from the database:", error.message);
    throw error;
  }
}

module.exports = {
  getTotalTimeFromDatabase,
};
