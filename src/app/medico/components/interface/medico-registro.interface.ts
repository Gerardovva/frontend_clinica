export interface MedicoRegitroI {
    id:           number;
    nombre:       string;
    email:        string;
    telefono:     string;
    Especialidad: string;
    direccion:    Direccion;
}

export interface Direccion {
    calle:       string;
    distrito:    string;
    ciudad:      string;
    numero:      string;
    complemento: string;
}


export interface MedicoCuerpoI {
    nombre:       string;
    email:        string;
    telefono:     string;
    documento:    string;
    especialidad: string;
    direccion:    Direccion;
}

export interface Direccion {
    calle:       string;
    distrito:    string;
    ciudad:      string;
    numero:      string;
    complemento: string;
}
