import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';

const compressFile = async (consoleData, pathToHomeDir) => {
    try {
        const pathToFile = path.resolve(
            pathToHomeDir, 
            consoleData.split(' ').splice(1, 1).toString()
        );
        const pathToDestination = path.resolve(
            pathToHomeDir, 
            consoleData.split(' ').splice(2).toString()
        );
        const readStream = createReadStream(pathToFile);
        const writeStream = createWriteStream(pathToDestination);
        const brotli = createBrotliCompress();
        await pipeline(readStream, brotli, writeStream);
        console.log(`You are currently in ${pathToHomeDir}`);
    } catch {
        console.error('Operation failed');
    }
};

export default compressFile;
