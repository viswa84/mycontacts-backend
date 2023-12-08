// import { DECREMENT, INCREMENT } from "./action_types";
import * as types from "./action_types"

const initailastate = {
  count: 0,
};

export const count_reduser = (state = initailastate, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};
