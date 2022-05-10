const db = require('../config/knex');

const BudgetService = {
    getBudgetById: (created_by, goal_month, goal_year) => {
        return db('goal')
            .select('*')
            .where({ created_by, goal_month, goal_year })
            .then(rows => {
                return rows[0];
            })
    },
    insertBudget: (newBudget) => {
        return db('goal')
            .insert(newBudget)
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    updateBudget: (budget_id, newAmount) => {
        return db('goal')
            .where({ id: budget_id })
            .update(newAmount)
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
};

module.exports = BudgetService;