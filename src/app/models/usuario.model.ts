export class Usuario {

    constructor(
        public nombre: string,
        public apellidos: string,
        public email: string,
        public password: string,
        public verificado: boolean,
        public telefono?: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public ultimaConexion?: string,
        public _id?: string
    ) { }
}


