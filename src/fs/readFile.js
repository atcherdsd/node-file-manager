import path from 'path';
import { createReadStream } from 'fs';

const readFile = async (consoleData, pathToHomeDir) => {
    const pathToFile = path.resolve(
        pathToHomeDir, 
        consoleData.split(' ').slice(1).toString()
    );
    const readStream = createReadStream(pathToFile);
    let content = '';
    readStream.on('data', chunk => {
        content += chunk.toString();
    });
    readStream.on('end', () => {
        process.stdout.write(content);
        console.log(`You are currently in ${pathToHomeDir}`);
    });   
    readStream.on('error', () => console.error('Operation failed'));
};

export default readFile;
