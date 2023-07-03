import os from 'os';
import commandList from './commandList.js';
import goUp from '../navigation/goUp.js';
import changeDir from '../navigation/cd.js';
import list from '../navigation/list.js';
import readFile from '../fs/readFile.js';
import createFile from '../fs/createFile.js';
import renameFile from '../fs/renameFile.js';
import deleteFile from '../fs/deleteFile.js';
import copyFile from '../fs/copyFile.js';
import moveFile from '../fs/moveFile.js';
import handleOs from '../os/os.js';
import calculateHash from '../hash/hash.js';
import compressFile from '../archiving/compress.js';
import decompressFile from '../archiving/decompress.js';

const echoInput = async (chunk, pathToHomeDirectory) => {
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
    return pathToHomeDirectory;
};

export default echoInput;
