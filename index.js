import { argv } from 'process';
import os from 'os';
import { sep } from 'path';
import { readdir } from 'fs/promises';
import handleOs from './src/os.js';

const startApp = async () => {
    const userName = String(argv.slice(2))
        .split('=')
        .slice(1)
        .toString();
    
    let pathToHomeDirectory;
    pathToHomeDirectory = os.homedir();

    console.log(`Welcome to the File Manager, ${userName}!`);
    console.log(`You are currently in ${pathToHomeDirectory}`);

    const readStream = process.stdin;

    const echoInput = async (chunk) => {
        const chunkStringified = chunk.toString().trim();
        if (chunkStringified === '.exit')
            process.exit(0);
        else if (chunkStringified === 'up') {
            if (pathToHomeDirectory.split(sep).length > 2)
                pathToHomeDirectory = pathToHomeDirectory.split(sep).slice(0, -1).join(sep);
            else if (pathToHomeDirectory.split(sep).length === 2)
                pathToHomeDirectory = pathToHomeDirectory.split(sep).slice(0, -1) + sep;
            else if (pathToHomeDirectory.split(sep).length === 1)
                pathToHomeDirectory = pathToHomeDirectory;
            console.log(`You are currently in ${pathToHomeDirectory}`);
        } else if (chunkStringified === 'cd') {
            pathToHomeDirectory = os.homedir();
            console.log(`You are currently in ${pathToHomeDirectory}`);
        } else if (chunkStringified === 'ls') {
            const filesArray = [];
            const dirArray = [];
            const direntObjectsArray = await readdir(
                pathToHomeDirectory, { withFileTypes: true }
            );
            for (const file of direntObjectsArray) {
                file.isFile() 
                    ? filesArray.push({ 'Name': file.name, 'Type': 'file' }) 
                    : dirArray.push({ 'Name': file.name, 'Type': 'directory' });
            }
            const output = (dirArray.sort()).concat(filesArray.sort());
            console.table(output);
            console.log(`You are currently in ${pathToHomeDirectory}`);
        } else if (chunkStringified.startsWith('os')) {
            handleOs(chunkStringified);
            console.log(`You are currently in ${pathToHomeDirectory}`);
        }
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
