import { argv } from 'process';
import os from 'os';

const startApp = async () => {
    const userName = String(argv.slice(2))
        .split('=')
        .slice(1)
        .toString();
    const pathToHomeDirectory = os.homedir();

    console.log(`Welcome to the File Manager, ${userName}!`);
    console.log(`You are currently in ${pathToHomeDirectory}`);

    const readStream = process.stdin;

    const echoInput = (chunk) => {
        const chunkStringified = chunk.toString().trim();
        if (chunkStringified === '.exit')
            process.exit(0);
    };
    readStream.on('data', echoInput);
    process.on('SIGINT', () => {
        process.exit();
    })
    process.on('exit', code => {
        if (code === 0)
            console.log(
                `Thank you for using File Manager, ${userName}, goodbye!`
            );
        else
            throw Error(`App exited with code ${code}\n`);
    })
};

await startApp();
