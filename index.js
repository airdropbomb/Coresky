const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk').default;
const banner = require('./config/banner');

const checkIn_url = 'https://www.coresky.com/api/taskwall/meme/sign';

// Function to read tokens from file
function getTokens() {
    try {
        const tokens = fs.readFileSync('token.txt', 'utf8')
            .split('\n') // Split by line
            .map(token => token.replace(/[\r\n]+/g, '').trim()) // Remove extra spaces and newlines
            .filter(token => token); // Filter out empty lines
        if (tokens.length === 0) throw new Error('No tokens found');
        console.log(chalk.blue(`Found ${tokens.length} accounts:`), tokens);
        return tokens;
    } catch (error) {
        console.log(chalk.red('Error: No tokens found in file or file not found.'));
        process.exit(1);
    }
}

// Function to perform check-in for a single account
const dailyCheckIn = async (token, accountIndex) => {
    try {
        const headers = {
            Token: token,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        };
        const response = await axios.post(checkIn_url, {}, { headers });

        if (response.data.code === 200) {
            const debug = response.data.debug || {};
            const reward = debug.task?.rewardPoint || 0;

            if (reward > 0) {
                console.log(chalk.green(`✅ Account ${accountIndex}: Check-in successful! Reward: ${reward} points`));
            } else {
                console.log(chalk.yellow(`⚠️ Account ${accountIndex}: Already checked in today!`));
            }
        } else {
            console.log(chalk.red(`❌ Account ${accountIndex}: Check-in failed! Message: ${response.data.message}`));
        }
    } catch (error) {
        console.log(chalk.red(`Error for Account ${accountIndex}: ` + error.message));
    }
};

// Function to check-in all accounts and wait for the next day
const autoCheckIn = async () => {
    const tokens = getTokens(); // Get all tokens

    while (true) {
        console.log(chalk.yellow('🚀 Starting daily auto check-in...'));

        // Check-in for each account one by one
        for (let i = 0; i < tokens.length; i++) {
            console.log(chalk.cyan(`Checking Account ${i + 1}...`));
            await dailyCheckIn(tokens[i], i + 1);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds between accounts
        }

        console.log(chalk.blue('⏳ Waiting 24 hours for the next check-in...'));
        await new Promise(resolve => setTimeout(resolve, 24 * 60 * 60 * 1000)); // Wait 24 hours
    }
};

// Start the bot
autoCheckIn();
