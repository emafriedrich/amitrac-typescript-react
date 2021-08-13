import express from 'express';

import expressLoader from './loaders/express';

let app = express();

expressLoader({ app });

export default app;
