import path from 'path';
import { createReadStream } from 'fs';

const readFile = async (consoleData, pathToHomeDir) => {
    let consolePath = consoleData.split(' ').slice(1).toString();
    if ((consolePath.startsWith('\'') && consolePath.endsWith('\''))
        || (consolePath.startsWith('"') && consolePath.endsWith('"'))) {
        consolePath = consolePath.replace(',', ' ').slice(1, -1);
    }

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
