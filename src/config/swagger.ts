import { readFileSync } from "fs";
//@ts-ignore i having a problem with index.d.ts i will fix this later
import { koaSwagger } from "koa2-swagger-ui";

const swagger = koaSwagger({
  routePrefix: "swagger",
  swaggerOptions: {
    spec: JSON.parse(readFileSync("./swagger.json", "utf8")),
  },
});

export { swagger };
