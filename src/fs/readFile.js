import path from 'path';
import { createReadStream } from 'fs';
import getConsolePath from '../utils/getConsolePath.js';

const readFile = async (consoleData, pathToHomeDir) => {
    const consolePath = getConsolePath(consoleData);

    const pathToFile = path.resolve(
        pathToHomeDir, 
        consolePath
    );
    const readStream = createReadStream(pathToFile);
    let content = '';
    readStream.on('data', chunk => {
        content += chunk.toString();
    });
    readStream.on('end', () => {
        process.stdout.write(content + '\n');
        console.log(`You are currently in ${pathToHomeDir}`);
    });   
    readStream.on('error', () => console.error('Operation failed'));
};

export default readFile;
