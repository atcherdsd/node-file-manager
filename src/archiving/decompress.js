import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';
import getPaths from '../utils/getPaths.js';

const decompressFile = async (consoleData, pathToHomeDir) => {
    try {
        const { fileName: archive, pathToDir } = getPaths(consoleData);

        const pathToArchive = path.resolve(
            pathToHomeDir,
            archive
        );

        const fileName = archive.slice(0, archive.lastIndexOf('.'));
        console.log('fileName: ', fileName);

        const pathToDestination = path.resolve(
            pathToHomeDir, 
            pathToDir,
            fileName
        );
        const readStream = createReadStream(pathToArchive);
        const writeStream = createWriteStream(pathToDestination, { flags: 'wx' });
        const brotli = createBrotliDecompress();
        await pipeline(readStream, brotli, writeStream);
        console.log(`You are currently in ${pathToHomeDir}`);
    } catch {
        console.error('Operation failed');
    }
};

export default decompressFile;
