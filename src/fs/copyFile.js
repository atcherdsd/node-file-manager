import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { access } from 'fs/promises';

const copyFile = async (consoleData, pathToHomeDir) => {
    try {
        let pathPart = consoleData
            .split(' ').slice(1).toString().replaceAll('"', '\'');

        let fileName;
        if (pathPart.startsWith('\'')) {
            fileName = pathPart.slice(1, pathPart.indexOf('\'', 1)).replaceAll(',', ' ');
        } else 
            fileName = consoleData.split(' ').splice(1, 1).toString();

        let pathToDir;
        if (pathPart.endsWith('\'')) {
            const reversion = pathPart.split('').reverse().join('');
            pathToDir = reversion
                .slice(1, reversion.indexOf('\'', 1))
                .split('').reverse().join('').replaceAll(',', ' ');
        } else {
            pathToDir = consoleData.split(' ').slice(-1).toString();
        }

        const pathToFile = path.resolve(
            pathToHomeDir,
            fileName
        );

        if (!fileName) 
            throw Error();
        
        const pathToDestination = path.resolve(
            pathToHomeDir,
            pathToDir
        );
        const fullPathToDestination = path.resolve(
            pathToHomeDir,
            pathToDir,
            fileName
        );

        await access(pathToFile);
        await access(pathToDestination);
        const readStream = createReadStream(pathToFile);
        const writeStream = createWriteStream(
            fullPathToDestination,
            { flags: 'wx'}
        );

        let content = '';
        let flag = true;
        readStream.on('data', chunk => {
            content += chunk.toString();
        });
        readStream.on('end', () => {
            writeStream.write(content);
        });   
        readStream.on('error', () => {
            console.error('Operation failed');
            flag = false;
        });
        writeStream.on('error', () => {
            console.error('Operation failed');
            flag = false;
        });
        readStream.on('close', () => {
            if (flag)
                console.log(`You are currently in ${pathToHomeDir}`);
        });
    } catch {
        console.error('Operation failed');
    }
};

export default copyFile;
