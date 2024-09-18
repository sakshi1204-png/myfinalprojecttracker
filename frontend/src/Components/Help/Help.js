import React from 'react';

const Help = ({ isDarkMode }) => {
  const containerClass = `help-container p-4 ${
    isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
  }`;

  const contentClass = `help-content mt-4 p-4 rounded shadow-md ${
    isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'
  }`;

  return (
    <div className={containerClass}>
      <div className={contentClass}>
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          How to Use This App
        </h2>
        <ul className={`list-disc pl-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <li>
            <strong>Step 1: Sign Up or Log In</strong>
            <p>First, create an account if you're a new user, or log in if you already have an account. Your personal data will be securely stored for your convenience.</p>
          </li>
          <li>
            <strong>Step 2: Add Income Sources</strong>
            <p>Go to the "Income" section and add your sources of income. This can include your salary, rental income, investment dividends, or any other sources of money that you receive regularly.</p>
          </li>
          <li>
            <strong>Step 3: Enter Expenses</strong>
            <p>Head to the "Expenses" section and start adding your expenses. You can categorize them into various groups like rent/mortgage, utilities, groceries, entertainment, and more. This will give you a clear picture of where your money is going.</p>
          </li>
          {/* <li>
            <strong>Step 4: Set Budgets</strong>
            <p>Establish monthly or weekly budgets for different expense categories. The app can help you keep track of how well you're sticking to your financial plan.</p>
          </li> */}
          <li>
            <strong>Step 4: Track Your Transactions</strong>
            <p>Regularly update your income and expenses within the app. You can manually enter transactions or link your bank accounts to automate the process. This step is crucial for maintaining an accurate financial overview.</p>
          </li>
          <li>
            <strong>Step 5: Analyze Your Financial Health</strong>
            <p>Use the app's built-in tools to analyze your financial health. You can view income vs. expenses, track your progress towards budget goals, and identify areas where you can save money.</p>
          </li>
          {/* <li>
            <strong>Step 7: History</strong>
            <p>Generate detailed financial reports, such as income statements, expense breakdowns, and savings summaries. These reports can help you make informed financial decisions.</p>
          </li> */}
          <li>
            <strong>Step 7: Plan for the Future</strong>
            <p>Based on your financial summary and analysis, create a plan for your financial future. Set savings goals, investment strategies, and debt repayment plans to secure your financial well-being.</p>
          </li>
          <li>
            <strong>Step 8: Get Support</strong>
            <p>If you have questions or encounter issues, visit the app's support section. You can find FAQs, contact information, and helpful resources to assist you in using the app effectively.</p>
          </li>
          <li>
            <strong>Step 9: Secure Your Data</strong>
            <p>Always prioritize the security of your financial information. Ensure that you regularly update your password and enable two-factor authentication if available. Avoid sharing your login credentials with anyone.</p>
          </li>
        </ul>
        <p className={`mt-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          If you have any questions or need assistance, please contact us.
        </p>
      </div>
    </div>
  );
};

export default Help;
