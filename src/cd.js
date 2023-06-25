import path from 'path';

const changeDir = async (consoleData, pathToHomeDir) => {
    try {
        let consolePath = consoleData.split(' ').slice(1).toString();
        if ((consolePath.startsWith('\'') && consolePath.endsWith('\''))
            || (consolePath.startsWith('"') && consolePath.endsWith('"'))) {
            consolePath = consolePath.replace(',', ' ').slice(1, -1);
        }

        pathToHomeDir = path.resolve(pathToHomeDir, consolePath);
        console.log(`You are currently in ${pathToHomeDir}`);
        return pathToHomeDir;
    } catch {
        console.error('Operation failed');
    }
};

export default changeDir;
