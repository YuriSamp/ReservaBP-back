import { readFileSync } from "fs";
import { koaSwagger } from "koa2-swagger-ui";

const swagger = koaSwagger({
  routePrefix: "swagger",
  swaggerOptions: {
    spec: JSON.parse(readFileSync("./swagger.json", "utf8")),
  },
});

export { swagger };
