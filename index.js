const inquirer = require(`inquirer`);
const actions = require(`./actions`);

const init = async () => {
  try {
    const initialQuestion = [
      {
        type: `list`,
        name: `action`,
        message: `What would you like to do?`,
        choices: [
          // `View All Departments`,
          // `Add A Department`,
          // `Delete A Department`,
          // `View All Roles`,
          // `Add A Role`,
          // `Update a Role Salary`,
          // `Delete A Role`,
          `View All Employees`,
          // `Add An Employee`,
          // `Update An Employee's Role`,
          // `Update An Employee's Manager`,
          `Delete An Employee`,
          `View Employees By Manager`,
          `View Employees By Department`,
          `View A Single Department's Budget`,
          `View All Department Budgets`,
          `Quit`,
        ],
      },
    ];
    const answers = await inquirer.prompt(initialQuestion);
    switch (answers.action) {
      case `View All Departments`:
        const departmentsList = await actions.viewAllDepartments();
        console.table(departmentsList);
        break;
      case `Add A Department`:
        await actions.addDepartment();
        break;
      case `Delete A Department`:
        await actions.deleteDepartment();
        break;
      case `View All Roles`:
        const rolesList = await actions.viewAllRoles();
        console.table(rolesList);
        break;
      case `Update a Role Salary`:
        await actions.updateRoleSalary();
        break;
      case `Add A Role`:
        await actions.addRole();
        break;
      case `Delete A Role`:
        await actions.deleteRole();
        break;
      case `View All Employees`:
        const allEmployeeList = await actions.viewAllEmployees();
        console.table(allEmployeeList);
        break;
      case `Add An Employee`:
        await actions.addEmployee();
        break;
      case `Update An Employee's Role`:
        await actions.updateEmployeeRole();
        break;
      case `Update An Employee's Manager`:
        await actions.updateEmployeeManager();
        break;
      case `Delete An Employee`:
        await actions.deleteEmployee();
        break;
      case `View Employees By Manager`:
        const emlpoyeeByManagerList = await actions.viewEmployeesByManager();
        console.table(emlpoyeeByManagerList);
        break;
      case `View Employees By Department`:
        const employeeByDepartmentList = await actions.viewEmployeesByDepartment();
        console.table(employeeByDepartmentList);
        break;
      case `View A Single Department's Budget`:
        const singleDepartmentBudget = await actions.viewSingleDepartmentBudget();
        console.table(singleDepartmentBudget);
        break;
      case `View All Department Budgets`:
        const allDepartmentBudgets = await actions.viewAllDepartmentBudgets();
        console.table(allDepartmentBudgets);
        break;
      case `Quit`:
        process.exit();
      default:
        break;
    }
    init();
  } catch (error) {
    console.log(error);
  }
};

init();
