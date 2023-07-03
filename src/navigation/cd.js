import path from 'path';
import { stat } from 'fs/promises';
import goUp from './goUp.js';
import getConsolePath from '../utils/getConsolePath.js';

const changeDir = async (consoleData, pathToHomeDir) => {
    try {
        const consolePath = getConsolePath(consoleData);

        const fullPathToDir = path.resolve(pathToHomeDir, consolePath);
        const isDirectory = (await stat(fullPathToDir)).isDirectory();
        
        if (isDirectory) {
            
            pathToHomeDir = fullPathToDir;
            console.log(`You are currently in ${pathToHomeDir}`);
            return pathToHomeDir;
        } else if (consolePath === '..') {
            await goUp();
        } else {
            throw Error();
        }
    } catch {
        console.error('Operation failed');
        return pathToHomeDir;
    }
};

export default changeDir;
