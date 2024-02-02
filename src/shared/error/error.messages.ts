export const ErrorMessages = {
  NOT_FOUND: "USER_NOT_FOUND",
  ALREADY_EXISTS : 'ALREADY_EXISTS',
  CANNOT_CREATE: (entity: string) => `${entity} cannot be created`,
  CANNOT_UPDATE: (entity: string) => `${entity} cannot be updated`,
  CANNOT_DELETE: (entity: string) => `${entity} cannot be deleted`,
  UNAUTHORIZED: "UNAUTHORIZED",
  INVALID_CREDENTIALS: "Invalid credentials",
};
