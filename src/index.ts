import "dotenv/config";

import { app } from "./config/koa";

app.listen(8000, () => {
  console.log(`server init on port ${8000}`);
});
