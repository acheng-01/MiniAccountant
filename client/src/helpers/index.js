export const monthConvert = (monthNumber) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return months[monthNumber];
};

export const listMonths = () => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        
        return months;
};

export const listYears = () => {
        let year = 2010;
        const years = [];
        while (year <= 2030) {
                years.push(year);
                year++;
        }

        return years;
}

export const listCategories = () => {
        const categories = [
                'Car Payments', 'Child Expenses', 'Clothing', 'Education', 'Entertainment', 'Food & Beverage', 'Gas', 'Internet', 'Investments', 'Phone Carrier', 'Rent', 'Travel', 'Other'
        ];

        return categories;
}

export const renderMonths = () => {
        return listMonths().map(month => {
            return <option key={month} value={month}>{month}</option>
        })
}

export const renderYears = () => {
        return listYears().map(year => {
            return <option key={year} value={year}>{year}</option>
        });
}

export const renderCategories = () => {
        return listCategories().map(category => {
            return <option key={category} value={category}>{category}</option>
        })
}