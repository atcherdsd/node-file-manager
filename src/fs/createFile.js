import { open, writeFile } from 'fs/promises';
import path from 'path';

const createFile = async (consoleData, pathToHomeDir) => {
    let filehandle;
    try {
        let consolePath = consoleData.split(' ').slice(1).toString();
        if ((consolePath.startsWith('\'') && consolePath.endsWith('\''))
            || (consolePath.startsWith('"') && consolePath.endsWith('"'))) {
            consolePath = consolePath.replace(',', ' ').slice(1, -1);
        }
        console.log(consolePath);
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
