import path from 'path';
import { access, rename, stat } from 'fs/promises';

const renameFile = async (consoleData, pathToHomeDir) => {
    try {
        const pathToFileToRename = path.resolve(
            pathToHomeDir, 
            consoleData.split(' ').splice(1, 1).toString()
        );
        const pathToRenamedFile = path.resolve(
            pathToHomeDir, 
            consoleData.split(' ').splice(2).toString()
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
