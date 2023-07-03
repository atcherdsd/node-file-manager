import { sep } from 'path';

const goUp = async (pathToHomeDir) => {
    try {
        if (pathToHomeDir.split(sep).length > 2) {
            pathToHomeDir = pathToHomeDir.split(sep).slice(0, -1).join(sep);
        } else if (pathToHomeDir.split(sep).length === 2) {
            pathToHomeDir = pathToHomeDir.split(sep).slice(0, -1) + sep;
        }
        console.log(`You are currently in ${pathToHomeDir}`);
        return pathToHomeDir;
    } catch {
        console.error('Operation failed');
    }
};

export default goUp;
