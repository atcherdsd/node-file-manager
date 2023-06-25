import { argv } from 'process';
import os from 'os';
import handleOs from './src/os/os.js';
import calculateHash from './src/hash/hash.js';
import compressFile from './src/archiving/compress.js';
import decompressFile from './src/archiving/decompress.js';
import goUp from './src/navigation/goUp.js';
import changeDir from './src/navigation/cd.js';
import list from './src/navigation/list.js';
import readFile from './src/fs/readFile.js';
import createFile from './src/fs/createFile.js';
import renameFile from './src/fs/renameFile.js';
import deleteFile from './src/fs/deleteFile.js';
import copyFile from './src/fs/copyFile.js';
import moveFile from './src/fs/moveFile.js';
import commandList from './src/utils/commandList.js';

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

    const echoInput = async (chunk) => {
        const chunkStringified = chunk.toString().trim();
        if (chunkStringified === commandList.exit)
            process.exit(0);
        else if (chunkStringified === commandList.up) {
            pathToHomeDirectory = await goUp(pathToHomeDirectory);
        } else if (chunkStringified === commandList.cd) {
            pathToHomeDirectory = os.homedir();
            console.log(`You are currently in ${pathToHomeDirectory}`);
        } else if (chunkStringified.startsWith(commandList.cdSpace)) {
            pathToHomeDirectory = await changeDir(chunkStringified, pathToHomeDirectory);
        } else if (chunkStringified === commandList.ls) {
            await list(pathToHomeDirectory);
        } else if (chunkStringified.startsWith(commandList.os)) {
            await handleOs(chunkStringified, pathToHomeDirectory);
        } else if (chunkStringified.startsWith(commandList.hash)) {
            await calculateHash(chunkStringified, pathToHomeDirectory);
        } else if (chunkStringified.startsWith(commandList.compress)) {
            await compressFile(chunkStringified, pathToHomeDirectory);
        } else if (chunkStringified.startsWith(commandList.decompress)) {
            await decompressFile(chunkStringified, pathToHomeDirectory);
        } else if (chunkStringified.startsWith(commandList.cat)) {
            await readFile(chunkStringified, pathToHomeDirectory);
        } else if (chunkStringified.startsWith(commandList.add)) {
            await createFile(chunkStringified, pathToHomeDirectory);
        } else if (chunkStringified.startsWith(commandList.rn)) {
            await renameFile(chunkStringified, pathToHomeDirectory);
        } else if (chunkStringified.startsWith(commandList.rm)) {
            await deleteFile(chunkStringified, pathToHomeDirectory);
        } else if (chunkStringified.startsWith(commandList.cp)) {
            await copyFile(chunkStringified, pathToHomeDirectory);
        } else if (chunkStringified.startsWith(commandList.mv)) {
            await moveFile(chunkStringified, pathToHomeDirectory);
        } else {
            console.log('Invalid input');
        }
    };
    readStream.on('data', echoInput);
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
