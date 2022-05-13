import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };


    case ActionTypes.ADD_COMENTARIO:
      const id = state.comentarios.length;
      const nuevoComentario = {
        id: id,
        excursionId: action.payload.excursionId,
        valoracion: action.payload.valoracion,
        comentario: action.payload.comentario,
        autor: action.payload.autor,
        dia: action.payload.dia
      }
      //console.log('Nuevo comentario: '+JSON.stringify(nuevoComentario));
      let auxComentarios = state.comentarios.concat(nuevoComentario);
      console.log(comentarios);
      console.log(auxComentarios);
      // auxComentarios = [...state.comentarios, nuevoComentario];

      //console.log('todos los comentarios + el nuevo: '+JSON.stringify(auxComentarios))
      return { ...state, comentarios: auxComentarios };

    case ActionTypes.POST_COMENTARIO:
      return state;


    default:
      return state;
  }
};