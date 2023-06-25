import os from 'os';
import commandList from '../utils/commandList.js';

const handleOs = async (consoleData, pathToHomeDir) => {
    try {
        switch(consoleData) {
        case commandList.osEOL:
            if (os.EOL === '\r\n') {
                console.log('\\r\\n');
            } else if (os.EOL === '\n') {
                console.log('\\n');
            }
            console.log(`You are currently in ${pathToHomeDir}`);
            break;
        case commandList.osCPUs:
            const cpuAmount = os.cpus().length;
            const cpuInfo = os.cpus().map(elem => { 
                return {
                    'Model': elem.model, 
                    'Speed': Math.round(elem.speed / 100) / 10 + ' GHz'
                }
            });
            console.log('Amount of CPUs: ', cpuAmount);
            console.log('CPU Info: ', cpuInfo);
            console.log(`You are currently in ${pathToHomeDir}`);
            break;
        case commandList.osHomedir:
            console.log(os.homedir());
            console.log(`You are currently in ${pathToHomeDir}`);
            break;
        case commandList.osUserName:
            const userName = os.userInfo().username;
            console.log(userName);
            console.log(`You are currently in ${pathToHomeDir}`);
            break;
        case commandList.osArchitect:
            console.log(process.arch);
            console.log(`You are currently in ${pathToHomeDir}`);
            break;
        default:
            console.error('Invalid input');
        }
    } catch {
        console.error('Operation failed');
    }
};

export default handleOs;
