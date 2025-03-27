const figlet = require('figlet');
const chalk = require('chalk').default;

function displayBanner() {
    const banner = `
       █████╗ ██████╗ ██████╗     ███╗   ██╗ ██████╗ ██████╗ ███████╗
      ██╔══██╗██╔══██╗██╔══██╗    ████╗  ██║██╔═══██╗██╔══██╗██╔════╝
      ███████║██║  ██║██████╔╝    ██╔██╗ ██║██║   ██║██║  ██║█████╗  
      ██╔══██║██║  ██║██╔══██╗    ██║╚██╗██║██║   ██║██║  ██║██╔══╝  
      ██║  ██║██████╔╝██████╔╝    ██║ ╚████║╚██████╔╝██████╔╝███████╗
      ╚═╝  ╚═╝╚═════╝ ╚═════╝     ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝
    `;
    console.log(chalk.green(banner));
    console.log(chalk.yellow('========================================='));
    console.log(chalk.magenta('Telegram : https://t.me/airdropbombnode'));
    console.log(chalk.magenta('Youtube   : https://youtube.com/@airdropbombnode'));
    console.log(chalk.yellow('========================================='));
}
displayBanner();
