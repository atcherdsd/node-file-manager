import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';

const decompressFile = async (consoleData, pathToHomeDir) => {
    try {
        const pathToArchive = path.resolve(
            pathToHomeDir, 
            consoleData.split(' ').splice(1, 1).toString()
        );
        const pathToDestination = path.resolve(
            pathToHomeDir, 
            consoleData.split(' ').splice(2).toString()
        );
        const readStream = createReadStream(pathToArchive);
        const writeStream = createWriteStream(pathToDestination);
        const brotli = createBrotliDecompress();
        await pipeline(readStream, brotli, writeStream);
        console.log(`You are currently in ${pathToHomeDir}`);
    } catch {
        console.error('Operation failed');
    }
};

export default decompressFile;
