/* eslint-disable no-case-declarations */
import * as actionlabels from '../actionLabels/cart.label';

const intialState = {
  modalState: false,
  cartData: [],
};
export function cartReducer(state = intialState, { type, payload }) {
  switch (type) {
    case actionlabels.SET_CART: {
      return {
        ...state,
        cartData: [...state.cartData, { ...payload, qty: 1 }],
      };
    }

    case actionlabels.UPDATE_CART: {
      const updatedCartData = state.cartData.map((data) => {
        if (data.id === payload.id) {
          if (payload.ops == 'increment') {
            return { ...data, qty: data.qty + 1 };
          } else if (payload.ops == 'decrement') {
            if (data.qty <= 1) {
              return null;
            } else {
              return { ...data, qty: data.qty - 1 };
            }
          }
        } else {
          return data;
        }
      });
      return {
        ...state,
        cartData: [...updatedCartData.filter((a) => a != null)],
      };
    }
    case actionlabels.CART_MODAL_STATE: {
      return { ...state, modalState: payload.state };
    }
    case actionlabels.EMETY_CART: {
      return { ...state, cartData: [] };
    }
    default:
      return state;
  }
}
