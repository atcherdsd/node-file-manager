import { argv } from 'process';
import os from 'os';
import echoInput from './src/utils/echoInput.js';

const startApp = async () => {
    const userName = String(argv.slice(2))
        .split('=')
        .slice(1)
        .toString();
    
    let pathToHomeDirectory;
    pathToHomeDirectory = os.homedir();

    if (userName) console.log(`Welcome to the File Manager, ${userName}!`);
    else console.log(`Welcome to the File Manager, Anonymous!`);
    console.log(`You are currently in ${pathToHomeDirectory}`);

    const readStream = process.stdin;

    readStream.on('data', async (chunk) => {
        pathToHomeDirectory = await echoInput(chunk, pathToHomeDirectory);
    });
    process.on('SIGINT', () => {
        process.exit();
    })
    process.on('exit', code => {
        if (code === 0 && userName)
            console.log(
                `Thank you for using File Manager, ${userName}, goodbye!`
            );
        else if (code === 0)
            console.log(
                `Thank you for using File Manager, Anonymous, goodbye!`
            );  
        else
            throw Error(`App exited with code ${code}\n`);
    })
};

await startApp();
