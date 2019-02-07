import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('Should render expense form correctly.', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('Should render expense form correctly with data.', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)
    expect(wrapper).toMatchSnapshot()
})

test('Should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(wrapper.state('error').length).toBeGreaterThan(0)
    expect(wrapper).toMatchSnapshot()
})

test('Should set description on input change', () => {
    const value = 'New Description'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('description')).toBe(value)
    expect(wrapper).toMatchSnapshot()
})

test('Should set note on input change', () => {
    const value = 'New Note'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('textarea').simulate('change', {
        target: { value }
    })
    expect(wrapper.state('note')).toBe(value)
    expect(wrapper).toMatchSnapshot()
})

test('Should set amount on input change', () => {
    const value = '100.00'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe(value)
    expect(wrapper).toMatchSnapshot()
})

test('Should not set amount on invalid input', () => {
    const value = 'abc'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe('')
    expect(wrapper).toMatchSnapshot()
})

test('Should call on submit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        note: expenses[0].note,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt
    })
})

test('Should set new date on date change', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
})

test('Should set calendar focus', () => {
    const focused = true
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused })
    expect(wrapper.state('calendarFocused')).toBe(focused)
})