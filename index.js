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
          `View All Departments`,
          `Add A Department`,
          `Delete A Department`,
          `View All Roles`,
          `Add A Role`,
          `Delete A Role`,
          `View All Employees`,
          `Add An Employee`,
          `Update An Employee Role`,
          `Update An Employee Manager`,
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
        await actions.viewAllDepartments();
        break;
      case `Add A Department`:
        await actions.addDepartment();
        break;
      case `Update A Department`:
        await actions.updateDepartment();
        break;
      case `Delete A Department`:
        await actions.deleteDepartment();
        break;
      case `View All Roles`:
        await actions.viewAllRoles();
        break;
      case `Update a Role`:
        await actions.updateRole();
        break;
      case `Add A Role`:
        await actions.addRole();
        break;
      case `Delete A Role`:
        await actions.deleteRole();
        break;
      case `View All Employees`:
        await actions.viewAllEmployees();
        break;
      case `Add An Employee`:
        await actions.addEmployee();
        break;
      case `Update An Employee Role`:
        await actions.updateEmployeeRole();
        break;
      case `Update An Employee Manager`:
        await actions.updateEmployeeManager();
        break;
      case `Delete An Employee`:
        await actions.deleteEmployee();
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
