import path from 'path';
import { readFile } from 'fs/promises';
import { createHash } from 'crypto';
import getConsolePath from '../utils/getConsolePath.js';

const calculateHash = async (consoleData, pathToHomeDir) => {
    try {
        const consolePath = getConsolePath(consoleData);

        const pathToFile = path.resolve(
            pathToHomeDir, 
            consolePath
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
