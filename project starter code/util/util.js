import fs from "fs";
import axios from 'axios';
import path from 'path';

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL) {
  try {
    // Path to the tmp directory
    const tmpDir = path.resolve('./', 'tmp');

    // Create the tmp directory if it does not exist
    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true }); // 'recursive' creates parent directories
        console.log('Created tmp directory:', tmpDir);
    } else {
        console.log('tmp directory already exists:', tmpDir);
    }
    // Fetch the image data
    const response = await axios.get(inputURL, { responseType: 'arraybuffer' });
    
    // Write the image data to a local temporary file
    const outpath = path.join('./tmp', 'filtered-' + Math.floor(Math.random() * 2000) + '.jpg');
    fs.writeFileSync(outpath, Buffer.from(response.data, 'binary'));
    
    // Return the path to the modified image
    return path.resolve(outpath);
  } catch (error) {
    console.error('An error occurred while processing the image:', error);
    throw error;
  }
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
 export async function deleteLocalFiles(files) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
