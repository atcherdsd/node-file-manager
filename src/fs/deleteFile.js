import path from 'path';
import { rm } from 'fs/promises';

const deleteFile = async (consoleData, pathToHomeDir) => {
    try {
        let consolePath = consoleData.split(' ').slice(1).toString();
        if ((consolePath.startsWith('\'') && consolePath.endsWith('\''))
            || (consolePath.startsWith('"') && consolePath.endsWith('"'))) {
            consolePath = consolePath.replace(',', ' ').slice(1, -1);
        }
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
