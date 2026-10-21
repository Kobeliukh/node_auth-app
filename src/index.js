'use strict';

import { createServer } from './createServer.js';

const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_HOST;

createServer().listen(PORT, HOST, () => {
  console.log('Server is running!');
});
