import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';

const decompressFile = async (consoleData, pathToHomeDir) => {
    try {
        let pathPart = consoleData
            .split(' ').slice(1).toString().replaceAll('"', '\'');

        let archive;
        if (pathPart.startsWith('\'')) {
            archive = pathPart.slice(1, pathPart.indexOf('\'', 1)).replaceAll(',', ' ');
        } else 
            archive = consoleData.split(' ').splice(1, 1).toString();

        let pathToDir;
        if (pathPart.endsWith('\'')) {
            const reversion = pathPart.split('').reverse().join('');
            pathToDir = reversion
                .slice(1, reversion.indexOf('\'', 1))
                .split('').reverse().join('').replaceAll(',', ' ');
        } else {
            pathToDir = consoleData.split(' ').slice(-1).toString();
        }

        const pathToArchive = path.resolve(
            pathToHomeDir,
            archive
        );

        const fileName = archive.slice(0, archive.lastIndexOf('.'));
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
