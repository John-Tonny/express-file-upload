# Node.js Express Upload/Download file Rest API

For more detail, please visit:
> [Node.js Express File Upload Rest API example](https://www.bezkoder.com/node-js-express-file-upload/)

> [Node.js Express Download File Rest API example](https://www.bezkoder.com/node-js-express-download-file/)

> [Node.js Express Delete File Rest API example](https://www.bezkoder.com/node-js-delete-file/)

> [Node.js Express File Upload with Google Cloud Storage example](https://www.bezkoder.com/google-cloud-storage-nodejs-upload-file/)

> [Node Express File Upload to MongoDB example](https://www.bezkoder.com/node-js-upload-store-images-mongodb/)

Front-end Apps to work with this Node.js Server:
- [Angular 8](https://www.bezkoder.com/angular-multiple-files-upload/) / [Angular 10](https://www.bezkoder.com/angular-10-file-upload/) / [Angular 11](https://www.bezkoder.com/angular-11-file-upload/) / [Angular 12](https://www.bezkoder.com/angular-12-file-upload/) / [Angular 13](https://www.bezkoder.com/angular-13-file-upload/) / [Angular 14](https://www.bezkoder.com/angular-14-file-upload/) / [Angular 15](https://www.bezkoder.com/angular-15-file-upload/) / [Angular 16 Client](https://www.bezkoder.com/angular-16-file-upload/)

- [Angular Material 12](https://www.bezkoder.com/angular-material-12-file-upload/) / [Angular Material 14](https://www.bezkoder.com/angular-material-14-file-upload/) / [Angular Material 15](https://www.bezkoder.com/angular-material-15-file-upload/) / [Angular Material 16](https://www.bezkoder.com/angular-material-16-file-upload/)

- [Vue Client](https://www.bezkoder.com/vue-axios-file-upload/) / [Vuetify Client](https://www.bezkoder.com/vuetify-file-upload/)

- [React Client](https://www.bezkoder.com/react-file-upload-axios/) / [React Hooks Client](https://www.bezkoder.com/react-hooks-file-upload/)

- [Material UI Client](https://www.bezkoder.com/material-ui-file-upload/)

More Practice:
> [Node.js: Upload/Import Excel file data into Database](https://www.bezkoder.com/node-js-upload-excel-file-database/)

> [Node.js: Upload/Import CSV file data into Database](https://www.bezkoder.com/node-js-upload-csv-file-database/)

> [Node.js Rest APIs example with Express & MySQL](https://www.bezkoder.com/node-js-express-sequelize-mysql/)

> [Node.js Rest APIs example with Express & PostgreSQL](https://www.bezkoder.com/node-express-sequelize-postgresql/)

> [Node.js Rest APIs example with Express & MongoDB](https://www.bezkoder.com/node-express-mongodb-crud-rest-api/)

> [Node.js JWT Authentication & Authorization example](https://www.bezkoder.com/node-js-jwt-authentication-mysql/)

> [Deploying/Hosting Node.js app on Heroku with MySQL database](https://www.bezkoder.com/deploy-node-js-app-heroku-cleardb-mysql/)

Integration (run back-end & front-end on same server/port)
> [Integrate React with Node.js Restful Services](https://www.bezkoder.com/integrate-react-express-same-server-port/)

> [Integrate Angular with Node.js Restful Services](https://www.bezkoder.com/integrate-angular-12-node-js/)

> [Integrate Vue with Node.js Restful Services](https://www.bezkoder.com/serve-vue-app-express/)

## Project setup
```
npm install
```

### Run
```
node server.js


### update
node 16.18.0
修改node_modules/multer/storage/disk.js

DiskStorage.prototype._handleFile = function _handleFile (req, file, cb) {
  var that = this

  that.getDestination(req, file, function (err, destination) {
    if (err) return cb(err)

    that.getFilename(req, file, function (err, filename) {
      if (err) return cb(err)

      var fsHash = crypto.createHash('sha256')
      var finalPath = path.join(destination, filename)
      var outStream = fs.createWriteStream(finalPath)
      file.stream.pipe(outStream)
      outStream.on('error', cb)
      file.stream.on('data', function (data) {
        fsHash.update(data)
      })
      outStream.on('finish', function () {
        var newfilename = fsHash.digest('hex') + path.extname(filename)
        if(fs.existsSync(path.join(destination, newfilename))){
          fs.unlinkSync(finalPath)
        }else{
          fs.renameSync(finalPath, path.join(destination, newfilename))
        }
        return cb(null, {
          destination: destination,
          filename: newfilename,
          path: finalPath,
          size: outStream.bytesWritten
        })
      })
    })
  })
}

`
