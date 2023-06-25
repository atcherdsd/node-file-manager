import path from 'path';
import { rm } from 'fs/promises';

const deleteFile = async (consoleData, pathToHomeDir) => {
    try {
        const pathToFile = path.resolve(
            pathToHomeDir, 
            consoleData.split(' ').slice(1).toString()
        );
    
        await rm(pathToFile, { recursive: true });
        console.log(`You are currently in ${pathToHomeDir}`);
    } catch {
        console.error('Operation failed');
    }
};

export default deleteFile;
