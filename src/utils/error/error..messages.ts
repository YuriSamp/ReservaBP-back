export const ErrorMessages = {
  NOT_FOUND: (entity: string) => `${entity} not found`,

  // ALREADY_EXISTS: (entity: string) =>
  //   `${entity} already exists in the database`,

  CANNOT_CREATE: (entity: string) => `${entity} cannot be created`,

  // CANNOT_UPDATE: (entity: string) => `${entity} cannot be updated`,

  // CANNOT_DELETE: (entity: string) => `${entity} cannot be deleted`,

  // INVALID_ID: (entity: string) => `${entity} id is invalid`,

  UNAUTHORIZED: "UNAUTHORIZED",
  INVALID_CREDENTIALS: "Invalid credentials",
};
