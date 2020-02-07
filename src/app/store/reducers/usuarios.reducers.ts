import { Usuario } from 'src/app/models/usuario.model';
import * as fromUsuarios from '../actions';
import { createReducer, on, Action } from '@ngrx/store';

// Definición del State
export interface UsuariosState {
    users: Usuario[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

// Set del State inicial
const initState: UsuariosState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
};

// Creamos la function reducer
const USUARIOS_REDUCER = createReducer(
    initState,
    on( fromUsuarios.CARGAR_USUARIOS, state => ({ ...state, loading: true, error: null})),
    on( fromUsuarios.CARGAR_USUARIOS_SUCCESS, ( state, { usuarios }) => {
        return {
            ...state,
            loading: false,
            loaded: true,
            users: usuarios
        };
    }),
    on( fromUsuarios.CARGAR_USUARIOS_FAIL, ( state, { payload }) => {
        return {
            ...state,
            loading: false,
            loaded: false,
            error: {
                status: payload.status,
                message: payload.message,
                url: payload.url
            }
        };
    })
);
export function usuariosReducer(state: UsuariosState | undefined, action: Action) {
    return USUARIOS_REDUCER(state, action);
}
