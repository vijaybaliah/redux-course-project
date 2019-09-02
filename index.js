const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

const addTodoAction = function(todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

const removeTodoAction = function(id) {
  return {
    type: REMOVE_TODO,
    id
  }
}

const toggleTodoAction = function(id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

const addGoalAction = function(goal) {
  return {
    type: ADD_GOAL,
    goal
  }
}

const removeGoalAction = function(id) {
  return {
    type: REMOVE_GOAL,
    id
  }
}

function todo(state = [], action) {
  switch(action.type) {
    case ADD_TODO:
      return state.concat(action.todo)
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id)
    case TOGGLE_TODO:
      return state.map(todo => todo.id !== action.id ? todo :
        Object.assign({}, todo, { complete: !todo.complete })
      )
    default:
      return state
  }
}

function goal(state = [], action) {
  switch(Selection.type) {
    case ADD_GOAL:
      return state.concat(action.goal)
    case REMOVE_GOAL:
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

store.dispatch(addTodoAction({
  id: 0,
  name: 'Learn Redux',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 1,
  name: 'Learn functional programming',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 2,
  name: 'Learn swimming',
  complete: false,
}))

store.dispatch(removeTodoAction(2))

store.dispatch(toggleTodoAction(1))

store.dispatch(addGoalAction({
  id: 0,
  name: 'Learn Redux',
  complete: false,
}))

store.dispatch(addGoalAction({
  id: 1,
  name: 'Learn music',
  complete: false,
}))

store.dispatch(removeGoalAction(1))
