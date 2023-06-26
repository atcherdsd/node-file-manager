import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';
import getPaths from '../utils/getPaths.js';

const compressFile = async (consoleData, pathToHomeDir) => {
    try {
        const { fileName, pathToDir } = getPaths(consoleData);

        const pathToFile = path.resolve(
            pathToHomeDir, 
            fileName
        );
        const archiveName = fileName + '.br';
        const pathToDestination = path.resolve(
            pathToHomeDir, 
            pathToDir,
            archiveName
        );
        const readStream = createReadStream(pathToFile);
        const writeStream = createWriteStream(pathToDestination, { flags: 'wx' });
        const brotli = createBrotliCompress();
        await pipeline(readStream, brotli, writeStream);
        console.log(`You are currently in ${pathToHomeDir}`);
    } catch {
        console.error('Operation failed');
    }
};

export default compressFile;
