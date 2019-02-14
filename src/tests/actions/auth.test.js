import { login, logout } from '../../actions/auth'

test('Should return an action object to login user', () => {
    const uid = '123'
    const action = login(uid)
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    })
})

test('Should return an action object to logout user', () => {
    const action = logout()
    expect(action).toEqual({
        type: 'LOGOUT'
    })
})