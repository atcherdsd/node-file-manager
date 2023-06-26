const getPaths = (consoleData) => {
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
    return { fileName, pathToDir };
};

export default getPaths;
