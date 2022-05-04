import * as ActionTypes from './ActionTypes';

export const favoritos = (state = {favoritos: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
            let auxFavoritos = [state.favoritos];
            auxFavoritos = [...state.favoritos, action.payload];
            return {...state, favoritos: auxFavoritos};
        default:
          return state;
      }
};

