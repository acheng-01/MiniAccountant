const xss = require('xss');
const requireLogin = require('../middlewares/requireLogin');
const BudgetService = require('../services/budgetService');

module.exports = (app) => {
    const serializeAmount = ({ id, goal_month, goal_year, goal_amount, created_by }) => ({
        id,
        goal_month,
        goal_year,
        goal_amount: xss(goal_amount),
        created_by
    });

    app.get('/api/budget/:month_year', requireLogin, async (req, res) => {
        const parameter = req.params.month_year;
        const month = parameter.split('-')[0];
        const year = parameter.split('-')[1];
        console.log(month);
        console.log(year);

        try {
            const budget = await BudgetService.getBudgetById(req.user.id, month, year);
            if (budget) {
                res.status(200).json(serializeAmount(budget));
            } else {
                res.end();
            }
        } catch(err) {
            res.status(422).send(err);
        }
    })

    app.post('/api/budget', requireLogin, async (req, res) => {
        const { month, year, amount } = req.body;
        const newBudget = {
            goal_month: month,
            goal_year: year,
            goal_amount: amount,
            created_by: req.user.id };


        const response = await BudgetService.insertBudget(newBudget);
        if (response) {
            res.status(201).json(serializeAmount(response));
        }
    })

    app.patch('/api/budget/:budget_id', requireLogin, async (req, res) => {
        const { month, year, amount } = req.body;
        const newBudget = {
            goal_month: month,
            goal_year: year,
            goal_amount: amount,
            created_by: req.user.id
        }

        try {
            const response = await BudgetService.updateBudget(req.params.budget_id, newBudget);
            if (response) {
                res.status(201).json(serializeAmount(response));
            }
        } catch(err) {
            res.status(422).send(err);
        }
    })
}