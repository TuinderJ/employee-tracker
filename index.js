const inquirer = require(`inquirer`);
const actions = require(`./actions`);

const init = async () => {
  try {
    const initialQuestion = [
      {
        type: `list`,
        name: `action`,
        message: `What would you like to do?`,
        choices: [`View All Departments`, `View All Roles`, `View All Employees`, `Add A Department`, `Add A Role`, `Add An Employee`, `Update An Employee Role`],
      },
    ];
    const answers = await inquirer.prompt(initialQuestion);
    switch (answers.action) {
      case `View All Departments`:
        await actions.viewAllDepartments();
        break;
      case `View All Roles`:
        await actions.viewAllRoles();
        break;
      case `View All Employees`:
        await actions.viewAllEmployees();
        break;
      case `Add A Department`:
        await actions.addDepartment();
        break;
      case `Add A Role`:
        await actions.addRole();
        break;
      case `Add An Employee`:
        await actions.addEmployee();
        break;
      case `Update An Employee Role`:
        await actions.updateEmployeeRole();
        break;
      default:
        break;
    }
    init();
  } catch (error) {
    console.log(error);
  }
};

init();
