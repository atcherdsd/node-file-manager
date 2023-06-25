import os from 'os';

const handleOs = async (consoleData, pathToHomeDir) => {
    try {
        switch(consoleData) {
        case 'os --EOL':
            if (os.EOL === '\r\n') {
                console.log('\\r\\n');
            } else if (os.EOL === '\n') {
                console.log('\\n');
            }
            console.log(`You are currently in ${pathToHomeDir}`);
            break;
        case 'os --cpus':
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
        case 'os --homedir':
            console.log(os.homedir());
            console.log(`You are currently in ${pathToHomeDir}`);
            break;
        case 'os --username':
            const userName = os.userInfo().username;
            console.log(userName);
            console.log(`You are currently in ${pathToHomeDir}`);
            break;
        case 'os --architecture':
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
