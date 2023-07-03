import path from 'path';
import { access, rename } from 'fs/promises';
import getPaths from '../utils/getPaths.js';

const renameFile = async (consoleData, pathToHomeDir) => {
    try {
        const { fileName, pathToDir: newFileName } = getPaths(consoleData);

        const pathToFileToRename = path.resolve(
            pathToHomeDir, 
            fileName
        );
        const pathToRenamedFile = path.resolve(
            pathToHomeDir, 
            newFileName
        );
        let isNewFileName = true;

        try {
            await access(pathToRenamedFile);
        } catch {
            isNewFileName = false;
        }

        if(!isNewFileName) {
            await rename(pathToFileToRename, pathToRenamedFile);
            console.log(`You are currently in ${pathToHomeDir}`);        
        } else
            throw Error();
    } catch {
        console.error('Operation failed');
    }
};

export default renameFile;
