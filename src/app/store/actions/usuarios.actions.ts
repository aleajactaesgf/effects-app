
import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

export const CARGAR_USUARIOS = createAction('[Usuarios] :: Cargar usuarios.');
export const CARGAR_USUARIOS_FAIL = createAction('[Usuarios] :: Cargar usuarios FAIL.', props<{ payload: any }>());
export const CARGAR_USUARIOS_SUCCESS = createAction('[Usuarios] :: Cargar usuarios SUCCESS.', props<{ usuarios: Usuario[] }>());




