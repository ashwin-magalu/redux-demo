const redux = require("redux"); //as it is a node application
/* import redux from "redux"; //for react application */

const reduxLogger = require("redux-logger");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleWare = redux.applyMiddleware;

const logger = reduxLogger.createLogger();

//Creating Action
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First Redux action",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
  };
}

// initial state creation
/* const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 20,
}; */

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

//Creating Reducer
//using single reducer
/* const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state, //we are making copy of state object, and change only required property
        numOfCakes: state.numOfCakes - 1,
      };
     case BUY_ICECREAM: 
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
}; */

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCake: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

//Creating Redux Store
/* const store = createStore(reducer); //step1
console.log("Initial state", store.getState()); //step2
const unsubscribe = store.subscribe(() =>
  console.log("Updated state", store.getState())
); //step4
store.dispatch(buyCake()); //step3
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe(); //step5 */

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer, applyMiddleWare(logger)); //step1
console.log("Initial state", store.getState()); //step2
const unsubscribe = store.subscribe(() => {}); //step4
store.dispatch(buyCake()); //step3
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe(); //step5

/* output: 
Initial state { numOfCakes: 10 }
Updated state { numOfCakes: 9 }
Updated state { numOfCakes: 8 }
Updated state { numOfCakes: 7 }
*/
