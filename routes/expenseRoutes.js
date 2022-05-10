const requireLogin = require('../middlewares/requireLogin');
const ExpenseService = require('../services/expenseService');
const xss = require('xss');

module.exports = (app) => {
    const serializeExpense = ({ id,
        item_name,
        cost,
        budget_month,
        budget_year,
        category,
        user_id,
        date_added }) => ({
            id,
            item_name: xss(item_name),
            cost: xss(cost),
            budget_month,
            budget_year,
            category,
            user_id,
            date_added
        })

    app.get('/api/expenses/:month_year', requireLogin, async (req, res) => {
        const parameter = req.params.month_year;
        const month = parameter.split('-')[0];
        const year = parameter.split('-')[1];

        try {
            const expenses = await ExpenseService.getExpensesById(req.user.id, month, year);
            res.status(201).json(expenses.map(expense => {return serializeExpense(expense)}));
        } catch(err) {
            res.status(422).send(err);
        }
    })

    app.post('/api/expenses', requireLogin, async (req, res) => {
        const { item_name, cost, budget_month, budget_year, category, date_added } = req.body;
        const newExpense = { item_name, cost, budget_month, budget_year, category, date_added };
        newExpense.user_id = req.user.id;

        try {
            const response = await ExpenseService.insertExpense(newExpense);
            if (response) {
                res.status(201).json(serializeExpense(response));
            }
        } catch(err) {
            res.status(422).send(err);
        }
    });

    app.patch('/api/expenses/:expense_id', requireLogin, async (req, res) => {
        const { item_name, cost, budget_month, budget_year, category, date_added } = req.body;
        const updatedExpense = { item_name, cost, budget_month, budget_year, category, date_added }
        updatedExpense.user_id = req.user.id;

        try {
            const response = await ExpenseService.updateExpense(req.params.expense_id, updatedExpense);
            if (response) {
                res.status(201).json(serializeExpense(response))
            }
        } catch(err) {
            res.status(422).send(err);
        }
    })

    app.delete('/api/expenses/:expense_id', requireLogin, async (req, res) => {
        try {
            await ExpenseService.deleteById(req.params.expense_id);
            res.status(204).end();
        } catch(err) {
            res.status(422).send(err);
        }
    })
};