// const path = require('path');
// const imagemin = require( "imagemin" )
// const webp = require( "imagemin-webp" )
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');
const sharp = require('sharp');

// const files = fs.readdirSync('./src/img')

// imagemin( ['./src/img/*.{jpg,png,jpeg,svg}'], {
//     destination: path.resolve('./assets/img'),
//     plugins: [
//         webp( { quality: 60 } )
//     ]
// } )
// (async () => {
// 	const files = await imagemin(['./src/img/*.{jpg,png}'], {
// 		destination: './assets/img',
// 		plugins: [
// 			imageminJpegtran(),
// 			imageminPngquant({
// 				quality: [0.6, 0.8]
// 			})
// 		]
// 	});

// 	console.log(files);
// 	//=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
// })();


// sharp('./src/img/xps-kLfkVa_4aXM-unsplash.jpg')
//   .jpeg({
//     quality: 30,
//     progressive: true,
//   })
//   .toFile('./assets/img/output.jpg');


const files = fs.readdirSync('./src/img')
const convert = (dir, name) => {
  const fullname = dir + '/' + name
  const extension = name.substr(name.lastIndexOf('.') + 1);
  const fullname_without_extension = name.split('.').slice(0, -1).join('.')


  const i = sharp(fs.readFileSync(fullname));
  // return i.toFile('./assets/img/' + name + '.webp')

  // Convert to .webp
  i.toFormat('webp', { quality: 50 })
  i.toFile('./assets/img/' + fullname_without_extension + '.webp')
    .then(() => console.log('Converted', fullname, 'to WEBP'))
    .catch(e => console.log('Failed converting', fullname, e, 'skipping...'))


  // Optimize same format
  i.toFormat(extension, { quality: 50 })
  i.toFile('./assets/img/' + name)
  .then(() => console.log('Optimized', fullname))
  .catch(e => console.log('Failed converting', fullname, e, 'skipping...'))


}



const promises = files.map(name => convert('./src/img/', name))

Promise.all(promises)
  .then(() => console.log('Done'))
  .catch(e => console.error(e));