export interface IauthResponse {
  ok: boolean;
  uid?: string;
  name?: string;
  email?:string;
  token?: string;
  msg?: string;
}

export interface iUsuario{
  uid:string;
  name: string;
  email: string;
}
