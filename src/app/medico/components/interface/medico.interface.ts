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
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    unsorted: boolean;
    empty:    boolean;
    sorted:   boolean;
}
