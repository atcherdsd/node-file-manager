import os from 'os';

const handleOs = async (data) => {
    switch(data) {
        case 'os --EOL':
            if (os.EOL === '\r\n') {
                console.log('\\r\\n');
            } else if (os.EOL === '\n') {
                console.log('\\n');
            }
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
            break;
        case 'os --homedir':
            console.log(os.homedir());
            break;
        case 'os --username':
            const userName = os.userInfo().username;
            console.log(userName);
            break;
        case 'os --architecture':
            console.log(process.arch);
            break;
    }
};

export default handleOs;
