const getConsolePath = (consoleData) => {
    let consolePath = consoleData.split(' ').slice(1).toString();
    if ((consolePath.startsWith('\'') && consolePath.endsWith('\''))
        || (consolePath.startsWith('"') && consolePath.endsWith('"'))) {
        consolePath = consolePath.replace(',', ' ').slice(1, -1);
    }
    return consolePath;
}

export default getConsolePath;
