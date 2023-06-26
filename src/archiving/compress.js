import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';

const compressFile = async (consoleData, pathToHomeDir) => {
    try {
        let pathPart = consoleData
            .split(' ').slice(1).toString().replaceAll('"', '\'');

        let fileName;
        if (pathPart.startsWith('\'')) {
            fileName = pathPart.slice(1, pathPart.indexOf('\'', 1)).replaceAll(',', ' ');
        } else 
            fileName = consoleData.split(' ').splice(1, 1).toString();
        
        let pathToDir;
        if (pathPart.endsWith('\'')) {
            const reversion = pathPart.split('').reverse().join('');
            pathToDir = reversion
                .slice(1, reversion.indexOf('\'', 1))
                .split('').reverse().join('').replaceAll(',', ' ');
        } else {
            pathToDir = consoleData.split(' ').slice(-1).toString();
        }

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
