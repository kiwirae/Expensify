import authReducer from '../../reducers/auth'

test('Should login user', () => {
  const action = {
    type: 'LOGIN',
    uid: '123'
  }
  const state = authReducer(undefined, action)
  expect(state.uid).toBe(action.uid)
})

test('Should logout user', () => {
  const action = {
    type: 'LOGOUT'
  }
  const state = authReducer({ uid: '123' }, action)
  expect(state).toEqual({})
})