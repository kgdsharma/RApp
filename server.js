import Path from 'path';
import express from 'express';
import webpack from 'webpack';
import RApp from './src/app';

const app = express();
let PORT ='';

if (process.env.NODE_ENV === 'development') {
  PORT=3000;
  const config = require('./webpack.config.dev');
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(express.static(Path.resolve(__dirname, 'src')));
}
else if (process.env.NODE_ENV === 'production') {
  PORT=5000;
  app.use(express.static(Path.resolve(__dirname, 'public')));
}

app.get('*', RApp);

app.listen(PORT, '0.0.0.0', (err) => {
  if(err) {
    console.error(err);
  } else {
    console.info('Listening at http://localhost:'+PORT);
  }
});
