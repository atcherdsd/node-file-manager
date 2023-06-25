import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { access, rm } from 'fs/promises';

const moveFile = async (consoleData, pathToHomeDir) => {
    try {
        const fileName = consoleData.split(' ').splice(1, 1).toString();

        const pathToFile = path.resolve(
            pathToHomeDir, 
            fileName
        );
        const consolePathToDir = consoleData.split(' ').slice(2).toString();
        if (!consolePathToDir) 
            throw Error();

        const pathToDestination = path.resolve(
            pathToHomeDir, 
            consoleData.split(' ').splice(2).toString(),
            fileName
        );

        await access(pathToFile);
        const readStream = createReadStream(pathToFile);
        const writeStream = createWriteStream(pathToDestination);

        let content = '';
        readStream.on('data', chunk => {
            content += chunk.toString();
        });
        readStream.on('end', () => {
            writeStream.write(content);
        });
        readStream.on('error', () => console.error('Operation failed'));
        writeStream.on('error', () => console.error('Operation failed'));

        readStream.on('close', async () => {
            try {
                await rm(pathToFile, { recursive: true });
            } catch {
                console.error('Operation failed');
            }
        })
        console.log(`You are currently in ${pathToHomeDir}`);
    } catch {
        console.error('Operation failed');
    }
};

export default moveFile;
