'use strict';

import { createServer } from './createServer.js';

const PORT = process.env.PORT;
const HOST = process.env.CLIENT_HOST;

createServer().listen(PORT, HOST, () => {
  console.log('Server is running!');
});
