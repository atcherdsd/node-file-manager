import path from 'path';
import { createReadStream, createWriteStream } from 'fs';

const copyFile = async (consoleData, pathToHomeDir) => {
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
    let content = '';
    readStream.on('data', chunk => {
        content += chunk.toString();
    });
    readStream.on('end', () => {
        writeStream.write(content);
        console.log(`You are currently in ${pathToHomeDir}`);
    });   
    readStream.on('error', () => console.error('Operation failed'));
};

export default copyFile;
