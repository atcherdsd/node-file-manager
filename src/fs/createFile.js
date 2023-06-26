import { writeFile } from 'fs/promises';
import path from 'path';

const createFile = async (consoleData, pathToHomeDir) => {
    try {
        let consolePath = consoleData.split(' ').slice(1).toString();
        const fileExtension = consolePath.slice(consolePath.lastIndexOf('.'));

        if ((consolePath.startsWith('\'') && consolePath.endsWith('\''))
            || (consolePath.startsWith('"') && consolePath.endsWith('"'))) {
            consolePath = consolePath.replace(',', ' ').slice(1, -1);
        }
        if ((!consolePath.includes('.') && consolePath.includes(','))
            || fileExtension.includes(','))
            throw Error();

        const pathToNewFile = path.resolve(pathToHomeDir, consolePath);

        await writeFile(pathToNewFile, '');
        console.log(`You are currently in ${pathToHomeDir}`);
    } catch {
        console.error('Operation failed');
    }
};

export default createFile;
