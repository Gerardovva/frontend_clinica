export interface MedicoActualizarI {
    id:           string;
    nombre:       string;
    telefono:     string;
    especialidad: string;
    email:        string;
    documento:    string;
    direccion:    Direccion;
}

export interface Direccion {
    calle:       string;
    distrito:    string;
    ciudad:      string;
    numero:      string;
    complemento: string;
}
