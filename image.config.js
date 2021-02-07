const fs = require('fs');
const sharp = require('sharp');
const chokidar = require('chokidar');

const IMAGES_FOLDER = './src/img/';

chokidar.watch(IMAGES_FOLDER).on('add', (event, path) => {
  optimizeImage(event);
});



chokidar.watch(IMAGES_FOLDER).on('unlink', (event, path) => {

  const file = event.substring(event.lastIndexOf('\\') + 1);
  const extension = file.substr(file.lastIndexOf('.') + 1);
  const filename_without_extension = file.split('.').slice(0, -1).join('.')

  // fs.unlinkSync('./assets/img/'+file);
  // fs.unlinkSync('./assets/img/'+filename_without_extension+'webp');

  fs.unlink('./assets/img/' + file, (err) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('Removed', file);
  })

  fs.unlink('./assets/img/' + filename_without_extension + '.webp', (err) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('Removed', file);
  })


});



function optimizeImage(path) {

  const file = path.substring(path.lastIndexOf('\\') + 1); // my_image.png
  const extension = file.substr(file.lastIndexOf('.') + 1);  // .png
  const filename_without_extension = file.split('.').slice(0, -1).join('.')  // my_image
  const file_without_extension = path.replace(/\\/g, "/").replace("src/img/", "").split('.').slice(0, -1).join('.') // subfolder\my_image
  const file_with_folder = path.replace(/\\/g, "/").replace("src/img/", "") // subfolder\my_image.png
  const folder = file_with_folder.split('/').slice(0,-1).join() // subfolder/

  // console.log('file', file)
  // console.log('path', path)
  // console.log('file_without_extension', file_without_extension)
  // console.log('file_with_folder', file_with_folder)
  // console.log('folder', folder)
  const i = sharp(fs.readFileSync(path));

  // create folder if dont exists
  if (!fs.existsSync('./assets/img/'+folder)) {
    fs.mkdirSync('./assets/img/'+folder);
  }

  
  // Convert to .webp
  i.toFormat('webp', { quality: 50 })
  i.toFile('./assets/img/' + file_without_extension + '.webp')
    .then(() => console.log('Converted', file, 'to WEBP'))
    .catch(e => console.log('Failed converting', file, e, 'skipping...'))


  // Optimize same format
  i.toFormat(extension, { quality: 50 })
  i.toFile('./assets/img/' + file_with_folder)
    .then(() => console.log('Optimized', file))
    .catch(e => console.log('Failed converting', file, e, 'skipping...'))



}