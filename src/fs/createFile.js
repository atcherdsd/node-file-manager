import { open, writeFile } from 'fs/promises';
import path from 'path';
import getConsolePath from '../utils/getConsolePath.js';

const createFile = async (consoleData, pathToHomeDir) => {
    let filehandle;
    try {
        const consolePath = getConsolePath(consoleData);

        const fileExtension = consolePath.slice(consolePath.lastIndexOf('.'));
        if ((!consolePath.includes('.') && consolePath.includes(','))
            || fileExtension.includes(','))
            throw Error();

        const pathToNewFile = path.resolve(
            pathToHomeDir, 
            consolePath
        );

        filehandle = await open(pathToNewFile, 'wx');
        await writeFile(pathToNewFile, '');
        console.log(`You are currently in ${pathToHomeDir}`);
    } catch {
        console.error('Operation failed');
    } finally {
        await filehandle?.close();
    }
};

export default createFile;
