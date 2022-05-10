import React from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import { listCategories } from '../../helpers';

function DataChart(props) {
    const generateData = () => {
        const output = [];
        const categories = listCategories();

        if (props.expenses.length === 0) {
            return output;
        }
        for (const category of categories) {
            const filteredExpenses = props.expenses.filter(expense => expense.category === category);
            const total = filteredExpenses.reduce((value, obj) => value + parseFloat(obj.cost), 0);
            output.push([category, total])
        }
        output.unshift(['Category', 'Amount Spent']);
        return output;
    }

    const options = {
        title: "Spending Breakdown",
        titleTextStyle: {
            fontName: "PT Sans Narrow",
            fontSize: 16
        }
    }

    return (
        <Chart 
            chartType="PieChart"
            data={generateData()}
            options={options}
            width={"100%"}
        />
    )
}

function mapStateToProps(state) {
    return {
        expenses: state.expenses
    }
}

export default connect(mapStateToProps)(DataChart);