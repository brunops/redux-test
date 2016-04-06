
const createStore = (reducer) => {
    let state
    let listeners = []

    const getState = () => state

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    const subscribe = (listener) => {
        listeners.push(listener)

        // returns an unsubscribe function
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }

    // start store
    dispatch({})

    return { dispatch, subscribe, getState }
}

const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

let store = createStore(reducer)

const render = () => {
    document.getElementById('state').innerText = store.getState()
}

store.subscribe(render)
render()

document.getElementById('inc').addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' })
})

document.getElementById('dec').addEventListener('click', () => {
    store.dispatch({ type: 'DECREMENT' })
})