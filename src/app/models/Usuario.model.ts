export interface CadastrarUsuarioRequest{
  nome  : string;
  email : string;
  senha : string;
}

export interface CadastrarUsuarioResponse{
  menssagem       : string;
  usuarioId       : string;
  nome            : string;
  email           : string;
  dataHoraCriacao : string;
  perfil          : string;
}

export interface AutenticarUsuarioRequest{
  email : string;
  senha : string;
}

export interface AutenticarUsuarioResponse{
  menssagem      : string;
  usuarioId      : string;
  nome           : string;
  email          : string;
  perfil         : string;
  dataHoraAcesso : string;
  accessToken     : string;
}

export interface DadosUsuarioResponse{
  usuarioId       : string;
  nome            : string;
  email           : string;
  perfil          : string;
  dataHoraCriacao : string;
}