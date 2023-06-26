import path from 'path';
import { access, rename } from 'fs/promises';

const renameFile = async (consoleData, pathToHomeDir) => {
    try {
        let pathPart = consoleData
            .split(' ').slice(1).toString().replaceAll('"', '\'');

        let fileName;
        if (pathPart.startsWith('\'')) {
            fileName = pathPart.slice(1, pathPart.indexOf('\'', 1)).replaceAll(',', ' ');
        } else 
            fileName = consoleData.split(' ').splice(1, 1).toString();
        
        let newFileName;
        if (pathPart.endsWith('\'')) {
            const reversion = pathPart.split('').reverse().join('');
            newFileName = reversion
                .slice(1, reversion.indexOf('\'', 1))
                .split('').reverse().join('').replaceAll(',', ' ');
        } else {
            newFileName = consoleData.split(' ').slice(-1).toString();
        }

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
