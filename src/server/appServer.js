const app = require('./server');

const port = 8088;
const server = app.listen(port, () =>
  console.log(`Server successfully running on localhost:${port}`)
);