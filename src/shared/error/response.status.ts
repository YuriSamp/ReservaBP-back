export const RESPONSE_STATUS_CODES = {
  UNAUTHORIZED: { message: "Sem autorização", status: 401 },
  USER_NOT_FOUND: { message: "Usuário não encontrado", status: 404 },
  ALREADY_EXISTS: { message: "E-mail já cadastrado", status: 409 },
  CONSULTOR_NOT_FOUND: { message: "Consultor não encontrado", status: 404 },
  CLIENT_NOT_FOUND: { message: "Cliente não encontrado", status: 404 },
  TIME_NOT_AVAILABLE: {
    message: "Consultor não disponivel nesse horario",
    status: 409,
  },
  TIME_LESS_THAN_ZERO: {
    message: "Insira um tempo maior que 0 minutos",
    status: 400,
  },
  TIME_LESS_THAN_30_MINUTES: {
    message: "Insira um tempo maior que 30 minutos",
    status: 400,
  },
  TIME_GREATER_THAN_2_HOURS: {
    message: "insira um tempo menor que 2 horas",
    status: 400,
  },
  DEFAULT: { status: 500, message: "Erro desconhecido" },
  INVALID_CREDENTIALS: { status: 400, message: "Credenciais invalidas" },
};
