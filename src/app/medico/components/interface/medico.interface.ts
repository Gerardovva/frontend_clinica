export interface MedicoI {
    totalPages:       number;
    totalElements:    number;
    first:            boolean;
    last:             boolean;
    size:             number;
    content:          Content[];
    number:           number;
    sort:             Sort;
    numberOfElements: number;
    pageable:         Pageable;
    empty:            boolean;
}

export interface Content {
    id:           number;
    nombre:       string;
    especialidad: string;
    documento:    string;
    email:        string;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
