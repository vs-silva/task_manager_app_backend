import express from 'express';

// @ts-ignore
import cors from "cors";

import Settings from "./settings";
import Controllers from "./controllers";

const app = express();
const port = Settings.SERVER_PORT;
app.use(cors());

Controllers(app);

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
