import { Injectable } from '@angular/core';
import { Actions,  createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';


@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        public usuariosService: UsuarioService
    ) { }

    cargarUsuarios$ =  createEffect(() => this.actions$.pipe(
        ofType(usuariosActions.CARGAR_USUARIOS),
        switchMap( () => {
            return this.usuariosService.getUsers().pipe(
                map((users: Usuario[]) => {
                    return usuariosActions.CARGAR_USUARIOS_SUCCESS({usuarios: users});
                  }),
                catchError((error: Error) => {
                    return of(usuariosActions.CARGAR_USUARIOS_FAIL({payload: error}));
                })
            );
        })
        )
      );

}
