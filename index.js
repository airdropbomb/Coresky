const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk').default;
const banner = require('./config/banner');

const checkIn_url = 'https://www.coresky.com/api/taskwall/meme/sign';

// Fungsi untuk membaca token dari file
function getToken() {
    try {
        const token = fs.readFileSync('token.txt', 'utf8').trim();
        if (!token) throw new Error('Token is empty');
        return token;
    } catch (error) {
        console.log(chalk.red('Error: Token is empty or file not found.'));
        process.exit(1);
    }
}

// Header untuk request API
const headers = {
    Token: getToken(),
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
};

// Fungsi untuk melakukan check-in
const dailyCheckIn = async () => {
    try {
        const response = await axios.post(checkIn_url, {}, { headers });

        // Pastikan API merespons dengan sukses
        if (response.data.code === 200) {
            const debug = response.data.debug || {};
            const reward = debug.task?.rewardPoint || 0;

            if (reward > 0) {
                console.log(chalk.green(`✅ Check-in successful! Reward: ${reward} points`));
            } else {
                console.log(chalk.yellow('⚠️ Already checked in today!'));
            }
        } else {
            console.log(chalk.red(`❌ Check-in failed! Message: ${response.data.message}`));
        }
    } catch (error) {
        console.log(chalk.red('Error during daily check-in: ' + error.message));
    }
};

// Fungsi utama untuk check-in otomatis setiap hari
const autoCheckIn = async () => {
    while (true) {
        console.log(chalk.yellow('🚀 Starting daily auto check-in...'));

        await dailyCheckIn();

        console.log(chalk.blue('⏳ Waiting 24 hours for the next check-in...'));
        await new Promise(resolve => setTimeout(resolve, 24 * 60 * 60 * 1000));
    }
};

// Jalankan bot check-in otomatis
autoCheckIn();
