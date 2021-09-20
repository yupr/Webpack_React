//初期値
const initialState = {
  name: '',
  age: 0
}

function inputReducer(state = initialState, action) {
  // console.log('actionnnnnn', action);
  // console.log('stateeee', state);
  switch (action.type) {
    case "INPUT_DATA":
      return {
        ...state, 
        name: action.payload.name,
        age: action.payload.age
      };
    default:
      return state;
  }
}

export default inputReducer;
