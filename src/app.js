import { match } from 'react-router';

export default (req, res) => {
  match({ location: req.url }, (error, redirectLocation) => {
    if (error) {
      res.status(500).send(error.message);
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    else if (true) {
      if (process.env.NODE_ENV === 'development') {
        res.status(200).send(`
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width">
            </head>
            <body>
              <div id='app'></div>
              <script src='/bundle.js'></script>
            </body>
          </html>
        `);
      }
      else if (process.env.NODE_ENV === 'production') {
        res.status(200).send(`
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width">
            </head>
            <body>
              <div id='app'></div>
              <script src='/bundle.js'></script>
            </body>
          </html>
        `);
      }
      else {
        res.status(404).send('Not found');
      }
    } });
};
