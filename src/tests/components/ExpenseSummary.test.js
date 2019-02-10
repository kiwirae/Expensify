import React from 'react'
import ExpenseSummary from '../../components/ExpenseSummary'
import { shallow } from 'enzyme'

test('Should render Expense summary without expenses correctly', () => {
    const wrapper = shallow(<ExpenseSummary />)
    expect(wrapper).toMatchSnapshot()
})

test('Should render expense summary with only 1 expense.', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={50} />)
    expect(wrapper).toMatchSnapshot()
})

test('Should render expense summary with data.', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={3} expensesTotal={195} />)
})