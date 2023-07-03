import path from 'path';
import { rm } from 'fs/promises';
import getConsolePath from '../utils/getConsolePath.js';

const deleteFile = async (consoleData, pathToHomeDir) => {
    try {
        const consolePath = getConsolePath(consoleData);
        const pathToFile = path.resolve(
            pathToHomeDir, 
            consolePath
        );

        await rm(pathToFile, { recursive: true });
        console.log(`You are currently in ${pathToHomeDir}`);
    } catch {
        console.error('Operation failed');
    }
};

export default deleteFile;
