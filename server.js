// Hostinger Node.js App deployment proxy
// Hostinger looks for server.js at the root folder by default.
// This file simply forwards the execution to the compiled TypeScript server.

require('./dist/server.js');
