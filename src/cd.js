import path from 'path';
import { stat } from 'fs/promises';

const changeDir = async (consoleData, pathToHomeDir) => {
    try {
        let consolePath = consoleData.split(' ').slice(1).toString();
        if ((consolePath.startsWith('\'') && consolePath.endsWith('\''))
            || (consolePath.startsWith('"') && consolePath.endsWith('"'))) {
            consolePath = consolePath.replace(',', ' ').slice(1, -1);
        }

        const fullPathToDir = path.resolve(pathToHomeDir, consolePath);
        const isDirectory = (await stat(fullPathToDir)).isDirectory();
        
        if (isDirectory) {
            
            pathToHomeDir = fullPathToDir;
            console.log(`You are currently in ${pathToHomeDir}`);
            return pathToHomeDir;
        } else {
            throw Error();
        }
    } catch {
        console.error('Operation failed');
        return pathToHomeDir;
    }
};

export default changeDir;
