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

  fs.unlink('./assets/img/'+file, (err) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('Removed', file);
  })

  fs.unlink('./assets/img/'+filename_without_extension+'.webp', (err) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('Removed', file);
  })


});



function optimizeImage(path) {

  const file = path.substring(path.lastIndexOf('\\') + 1);
  const extension = file.substr(file.lastIndexOf('.') + 1);
  const filename_without_extension = file.split('.').slice(0, -1).join('.')


  const i = sharp(fs.readFileSync(IMAGES_FOLDER+file));
  // return i.toFile('./assets/img/' + name + '.webp')

  // Convert to .webp
  i.toFormat('webp', { quality: 50 })
  i.toFile('./assets/img/' + filename_without_extension + '.webp')
    .then(() => console.log('Converted', file, 'to WEBP'))
    .catch(e => console.log('Failed converting', file, e, 'skipping...'))


  // Optimize same format
  i.toFormat(extension, { quality: 50 })
  i.toFile('./assets/img/' + file)
    .then(() => console.log('Optimized', file))
    .catch(e => console.log('Failed converting', file, e, 'skipping...'))



}



// const files = fs.readdirSync('./src/img')
// const convert = (dir, name) => {
//   const fullname = dir + '/' + name
//   const extension = name.substr(name.lastIndexOf('.') + 1);
//   const fullname_without_extension = name.split('.').slice(0, -1).join('.')


//   const i = sharp(fs.readFileSync(fullname));
//   // return i.toFile('./assets/img/' + name + '.webp')

//   // Convert to .webp
//   i.toFormat('webp', { quality: 50 })
//   i.toFile('./assets/img/' + fullname_without_extension + '.webp')
//     .then(() => console.log('Converted', fullname, 'to WEBP'))
//     .catch(e => console.log('Failed converting', fullname, e, 'skipping...'))


//   // Optimize same format
//   i.toFormat(extension, { quality: 50 })
//   i.toFile('./assets/img/' + name)
//   .then(() => console.log('Optimized', fullname))
//   .catch(e => console.log('Failed converting', fullname, e, 'skipping...'))


// }



// const promises = files.map(name => convert('./src/img/', name))

// Promise.all(promises)
//   .then(() => console.log('Done'))
//   .catch(e => console.error(e));