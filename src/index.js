'use strict';

import { createServer } from './createServer.js';

const PORT = process.env.PORT;

createServer().listen(PORT, () => {
  console.log('Server is running!');
});
