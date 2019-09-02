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

const ADD_GOAL = {
  type: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
}

const REMOVE_GOAL = {
  type: 'REMOVE_GOAL',
  id: 2
}

function todo(state = [], action) {
  switch(action.type) {
    case 'ADD_TODO':
      return state.concat(action.todo)
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id)
    case 'TOGGLE_TODO':
      return state.map(todo => todo.id !== action.id ? todo :
        Object.assign({}, todo, { complete: !todo.complete })
      )
    default:
      return state
  }
}

function goal(state = [], action) {
  switch(Selection.type) {
    case 'ADD_GOAL':
      return state.concat(action.goal)
    case 'REMOVE_GOAL':
      return state.filter(goal => goal.id !== action.id)
    default:
      return state
  }
}

function app(state = {}, action) {
  return {
    todo: todo(state.todo, action),
    goal: goal(state.goal, action)
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

const store = createStore(app)
const unsubscribe = store.subcribe(() => console.log('state has changed: ', store.getState()))
store.dispatch(ADD_TODO)