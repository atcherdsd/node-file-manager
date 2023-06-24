import path from 'path';
import { readFile } from 'fs/promises';
import { createHash } from 'crypto';

const calculateHash = async (consoleData, pathToHomeDir) => {
    try {
        const pathToFile = path.resolve(
            pathToHomeDir, 
            consoleData.split(' ').slice(1).toString()
        );
        const data = await readFile(pathToFile, {
            encoding: 'utf8',
        });
        const hash = createHash('sha256').update(data).digest('hex');
        console.log(hash);
        console.log(`You are currently in ${pathToHomeDir}`);
    } catch {
        console.error('Operation failed');
    }
};

export default calculateHash;
