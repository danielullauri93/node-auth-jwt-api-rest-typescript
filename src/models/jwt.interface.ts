// Vamos a crear una estructura de usuario para que toda la aplicacion use el mismo modelo es realizado en Typescript
export interface JwtPayload{

  id: number,
  email: string,
}