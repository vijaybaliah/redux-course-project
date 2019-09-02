const ADD_TODO = {
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
}

const REMOVE_TODO = {
  type: 'REMOVE_TODO',
  id: 2
}

const TOGGLE_TODO = {
  type: 'TOGGLE_TODO',
  id: 1
}

function todo(state = [], action) {
  switch(action.type) {
    case 'ADD_TODO':
      return state.concat(action.todo)
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id)
    case 'TOGGLE_TODO':
      return state.map(todo => todo.id !== action.id ? todo : Object.assign({},
        todo,
        {
          complete: !todo.complete
        })
      )
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