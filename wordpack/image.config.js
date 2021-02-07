const fs = require('fs');
const sharp = require('sharp');
const chokidar = require('chokidar');

const SRC_FOLDER = './src/img/';
const OUTPUT_FOLDER = './assets/img/';

// check if has --watch args
var IS_WATCH = false;
const args = process.argv;
if (args.includes('--watch')) {
  IS_WATCH = true;
}


if (IS_WATCH) {
  chokidar.watch(SRC_FOLDER).on('add', (event, path) => {
    optimizeImage(event);
  });

  chokidar.watch(SRC_FOLDER).on('unlink', (event, path) => {
    removeImage(event);
  });
}else{

  // process all images from src without chokidar

}



function optimizeImage(path) {

  const file = path.substring(path.lastIndexOf('\\') + 1); // my_image.png
  const extension = file.substr(file.lastIndexOf('.') + 1);  // .png
  const filename_without_extension = file.split('.').slice(0, -1).join('.')  // my_image
  const file_without_extension = path.replace(/\\/g, "/").replace("src/img/", "").split('.').slice(0, -1).join('.') // subfolder\my_image
  const file_with_folder = path.replace(/\\/g, "/").replace("src/img/", "") // subfolder\my_image.png
  const folder = file_with_folder.split('/').slice(0, -1).join() // subfolder/

  // console.log('file', file)
  // console.log('path', path)
  // console.log('file_without_extension', file_without_extension)
  // console.log('file_with_folder', file_with_folder)
  // console.log('folder', folder)




  const i = sharp(fs.readFileSync(path));

  // create folder if dont exists
  if (!fs.existsSync(OUTPUT_FOLDER + folder)) {
    fs.mkdirSync(OUTPUT_FOLDER + folder);
  }


  // Convert to .webp
  i.toFormat('webp', { quality: 50 })
  i.toFile(OUTPUT_FOLDER + file_without_extension + '.webp')
    .then(() => console.log('Converted', file, 'to WEBP'))
    .catch(e => console.log('Failed converting', file, e, 'skipping...'))


  // Optimize same format
  i.toFormat(extension, { quality: 50 })
  i.toFile(OUTPUT_FOLDER + file_with_folder)
    .then(() => console.log('Optimized', file))
    .catch(e => console.log('Failed converting', file, e, 'skipping...'))



}


function removeImage(path) {

  const file = path.substring(path.lastIndexOf('\\') + 1); // my_image.png
  const extension = file.substr(file.lastIndexOf('.') + 1);  // .png
  const filename_without_extension = file.split('.').slice(0, -1).join('.')  // my_image
  const file_without_extension = path.replace(/\\/g, "/").replace("src/img/", "").split('.').slice(0, -1).join('.') // subfolder\my_image
  const file_with_folder = path.replace(/\\/g, "/").replace("src/img/", "") // subfolder\my_image.png
  const folder = file_with_folder.split('/').slice(0, -1).join() // subfolder/

  // fs.unlinkSync('./assets/img/'+file);
  // fs.unlinkSync('./assets/img/'+filename_without_extension+'webp');

  fs.unlink(OUTPUT_FOLDER + file_with_folder, (err) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('Removed', file);
  })

  fs.unlink(OUTPUT_FOLDER + folder + '/' + filename_without_extension + '.webp', (err) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('Removed', filename_without_extension + '.webp');
  })

}