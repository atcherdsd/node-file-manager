import { readdir } from 'fs/promises';

const list = async (pathToHomeDir) => {
    const filesArray = [];
    const dirArray = [];
    const direntObjectsArray = await readdir(
        pathToHomeDir, { withFileTypes: true }
    );
    for (const file of direntObjectsArray) {
        file.isFile() 
            ? filesArray.push({ 'Name': file.name, 'Type': 'file' }) 
            : dirArray.push({ 'Name': file.name, 'Type': 'directory' });
    }
    const output = (dirArray.sort()).concat(filesArray.sort());
    console.table(output);
    console.log(`You are currently in ${pathToHomeDir}`);
};

export default list;
