import { Injectable } from '@angular/core';
import { Actions,  createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';


@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        public usuariosService: UsuarioService
    ) { }

    cargarUsuario$ =  createEffect(() => this.actions$.pipe(
        ofType(usuarioActions.CARGAR_USUARIO),
        switchMap( action => {
            return this.usuariosService.getUserByID( action.id).pipe(
                map((usuario: Usuario) => {
                    return usuarioActions.CARGAR_USUARIO_SUCCESS({usuario});
                  }),
                catchError((error: Error) => {
                    return of(usuarioActions.CARGAR_USUARIO_FAIL({payload: error}));
                })
            );
        })
        )
      );

}
