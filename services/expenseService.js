const db = require('../config/knex');
const monthConvert = require('../helpers');

const expenseService = {
    getExpensesById: (user_id, budget_month, budget_year) => {
        return db('expenses')
            .select('*')
            .where({ user_id, budget_month, budget_year })
    },
    insertExpense: (newExpense) => {
        return db('expenses')
            .insert(newExpense)
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteById: (expense_id) => {
        return db('expenses')
            .where({ id: expense_id })
            .delete()
    },
    updateExpense: (expense_id, newExpenseFields) => {
        return db('expenses')
            .where({ id: expense_id })
            .update(newExpenseFields)
            .returning('*')
            .then(rows => {
                return rows[0];
            })
    }
};

module.exports = expenseService;