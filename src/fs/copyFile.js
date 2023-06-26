import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { access } from 'fs/promises';
import getPaths from '../utils/getPaths.js';

const copyFile = async (consoleData, pathToHomeDir) => {
    try {
        const { fileName, pathToDir } = getPaths(consoleData);

        const pathToFile = path.resolve(
            pathToHomeDir,
            fileName
        );

        if (!fileName) 
            throw Error();
        
        const pathToDestination = path.resolve(
            pathToHomeDir,
            pathToDir
        );
        const fullPathToDestination = path.resolve(
            pathToHomeDir,
            pathToDir,
            fileName
        );

        await access(pathToFile);
        await access(pathToDestination);
        const readStream = createReadStream(pathToFile);
        const writeStream = createWriteStream(
            fullPathToDestination,
            { flags: 'wx'}
        );

        let content = '';
        readStream.on('data', chunk => {
            content += chunk.toString();
        });

        let flag = true;
        readStream.on('end', () => {
            writeStream.write(content);
        });   
        readStream.on('error', () => {
            console.error('Operation failed');
            flag = false;
        });
        writeStream.on('error', () => {
            console.error('Operation failed');
            flag = false;
        });
        readStream.on('close', () => {
            if (flag)
                console.log(`You are currently in ${pathToHomeDir}`);
        });
    } catch {
        console.error('Operation failed');
    }
};

export default copyFile;
