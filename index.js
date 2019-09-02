const ADD_TODO = {
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
}

function todo(state = [], action) {
  switch(action.type) {
    case 'ADD_TODO':
      return state.concat(action.todo)
    default:
      return state
  }
}

function createStore(reducer) {
  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

const store = createStore(todo)
const unsubscribe = store.subcribe(() => console.log('state has changed: ', store.getState()))
store.dispatch(ADD_TODO)