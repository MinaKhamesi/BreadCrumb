export const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_LOCATION":
      return {
        ...state,
        location: [...state.location, action.payload],
      };
    case "POP_FROM_LOCATION":
      return {
        ...state,
        location: state.location.filter(
          (l, idx) => idx !== state.location.length - 1
        ),
      };
    case "GO_TO_LOCATION":
      const targetIdx = state.location
        .map((l) => l.path)
        .indexOf(action.payload.path);
      return {
        ...state,
        location: state.location.filter((l, idx) => idx <= targetIdx),
      };
    case "CONTENT_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "CONTENT_LOADED":
      return {
        ...state,
        content: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
