import { Usuario } from 'src/app/models/usuario.model';
import * as fromUsuario from '../actions';
import { createReducer, on, Action } from '@ngrx/store';

// Definición del State
export interface UsuarioState {
    user: Usuario;
    loaded: boolean;
    loading: boolean;
    error: any;
}

// Set del State inicial
const initState: UsuarioState = {
    user: null,
    loaded: false,
    loading: false,
    error: null
};

// Creamos la function reducer
const USUARIO_REDUCER = createReducer(
    initState,
    on( fromUsuario.CARGAR_USUARIO, ( state ) => {
        return{
            ...state,
            loading: true,
            error: null
        };
    }),
    on( fromUsuario.CARGAR_USUARIO_SUCCESS, ( state, { usuario }) => {
        return {
            ...state,
            loading: false,
            loaded: true,
            user: usuario
        };
    }),
    on( fromUsuario.CARGAR_USUARIO_FAIL, ( state, { payload }) => {
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
export function usuarioReducer(state: UsuarioState | undefined, action: Action) {
    return USUARIO_REDUCER(state, action);
}
