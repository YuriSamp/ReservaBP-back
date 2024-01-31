import "dotenv/config";

import { app } from "./config/koa";
import { mongooseConnect } from "./database/mongosse";

const mongo = process.env.DATABASE_URL || "";

mongooseConnect(mongo);

app.listen(8000, () => {
  console.log(`server init on port ${8000}`);
});
