const mysql = require(`mysql2`);
const cTable = require(`console.table`);
const inquirer = require("inquirer");

connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db",
});

const actions = {
  viewAllDepartments: async () => {
    try {
      const query = `
        SELECT *
        FROM department
      `;
      const [data] = await connection.promise().query(query);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  addDepartment: async () => {
    try {
      const question = [
        {
          type: `input`,
          name: `newDepartmentName`,
          message: `What is the name of the new department?`,
        },
      ];
      const { newDepartmentName } = await inquirer.prompt(question);
      const query = `
        INSERT INTO department (name)
          VALUES  ("${newDepartmentName}")
      `;
      const data = await connection.promise().query(query);
      data ? console.log(`Added ${newDepartmentName} to the database`) : console.log(`Something went wrong. Please try again.`);
    } catch (error) {
      console.log(error);
    }
  },

  deleteDepartment: async () => {
    try {
      const question = [
        {
          type: `list`,
          name: `department`,
          message: `Which department would you like to delete?`,
          choices: async () => {
            const choices = [{ name: `Back`, value: null }];
            const allDepartmentsList = await actions.viewAllDepartments();
            allDepartmentsList.forEach(({ id, name }) => choices.push({ name, value: { id, name } }));
            return choices;
          },
        },
      ];
      const { department } = await inquirer.prompt(question);
      if (!department) return;

      const query = `
        DELETE FROM department
        WHERE id = ${department.id}
      `;
      const [{ affectedRows }] = await connection.promise().query(query);
      affectedRows ? console.log(`${department.name} was successfully deleted.`) : console.log(`Something went wrong, please try again.`);
    } catch (error) {
      console.log(error);
    }
  },

  viewAllRoles: async () => {
    try {
      const query = `
        SELECT role.id, title, name AS department, salary
        FROM role
        LEFT JOIN department
        ON department_id = department.id
      `;
      const [data] = await connection.promise().query(query);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  addRole: async () => {
    try {
      const questions = [
        {
          type: `input`,
          name: `roleName`,
          message: `What's the name of the new role?`,
        },
        {
          type: `input`,
          name: `salary`,
          message: ({ roleName }) => `What is the salary for ${roleName}?`,
        },
        {
          type: `list`,
          name: `departmentId`,
          message: ({ roleName }) => `Which department does the role ${roleName} fall under?`,
          choices: async () => {
            const allDepartmentsList = await actions.viewAllDepartments();
            const choices = [{ name: `None`, value: null }];
            allDepartmentsList.forEach(({ id, name }) => choices.push({ name, value: id }));
            return choices;
          },
        },
      ];
      const { roleName, salary, departmentId } = await inquirer.prompt(questions);

      const query = `
        INSERT INTO role (title, salary, department_id)
          VALUES  ("${roleName}", ${salary}, ${departmentId})
      `;
      const data = await connection.promise().query(query);
      data ? console.log(`Added ${roleName} to the database`) : console.log(`Something went wrong. Please try again.`);
    } catch (error) {
      console.log(error);
    }
  },

  updateRoleSalary: async () => {
    try {
      const questions = [
        {
          type: `list`,
          name: `role`,
          message: `Which role's salary would you like to update`,
          choices: async () => {
            const choices = [{ name: `Back`, value: null }];
            const rolesList = await actions.viewAllRoles();
            rolesList.forEach(({ id, title }) => choices.push({ name: title, value: { id, title } }));
            return choices;
          },
        },
        {
          type: `input`,
          name: `newSalary`,
          message: ({ role }) => `What would you like the salary for ${role.title}`,
          when: ({ role }) => role,
        },
      ];
      const { role, newSalary } = await inquirer.prompt(questions);
      if (!role) return;

      const query = `
        UPDATE role
        SET salary = ${newSalary}
        WHERE id = ${role.id}
      `;

      const [{ affectedRows }] = await connection.promise().query(query);
      affectedRows ? console.log(`${role.title} has been succesfully updated.`) : console.log(`Something went wrong, please try again.`);
    } catch (error) {
      console.log(error);
    }
  },

  deleteRole: async () => {
    try {
      const question = [
        {
          type: `list`,
          name: `role`,
          message: `Which role would you like to delete?`,
          choices: async () => {
            const choices = [{ name: `Back`, value: null }];
            const rolesList = await actions.viewAllRoles();
            rolesList.forEach(({ id, title }) => choices.push({ name: title, value: { id, title } }));
            return choices;
          },
        },
      ];
      const { role } = await inquirer.prompt(question);
      if (!role) return;

      const query = `
        DELETE FROM role
        WHERE id = ${role.id}
      `;
      const [{ affectedRows }] = await connection.promise().query(query);
      affectedRows ? console.log(`${role.title} was deleted successfully.`) : console.log(`Something went wrong, please try again.`);
    } catch (error) {
      console.log(error);
    }
  },

  viewAllEmployees: async () => {
    try {
      const query = `
        SELECT a.id, a.first_name, a.last_name, role.title, department.name AS department, salary, CONCAT_WS(' ', b.first_name, b.last_name) AS manager
        FROM employee a
        LEFT JOIN employee b
        ON a.manager_id = b.id
        LEFT JOIN role
        ON a.role_id = role.id
        LEFT JOIN department
        ON role.department_id = department.id
      `;
      const [data] = await connection.promise().query(query);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  addEmployee: async () => {
    try {
      const questions = [
        {
          type: `input`,
          name: `firstName`,
          message: `What is the new employee's first name?`,
        },
        {
          type: `input`,
          name: `lastName`,
          message: ({ firstName }) => `What is ${firstName}'s last name?`,
        },
        {
          type: `list`,
          name: `role`,
          message: ({ firstName, lastName }) => `What is ${firstName} ${lastName}'s role?`,
          choices: async () => {
            const choices = [{ name: `None`, value: null }];
            const rolesList = await actions.viewAllRoles();
            rolesList.forEach(({ id, title }) => choices.push({ name: title, value: { id, title } }));
            return choices;
          },
        },
        {
          type: `list`,
          name: `manager`,
          message: ({ firstName, lastName }) => `Who is ${firstName} ${lastName}'s manager?`,
          choices: async () => {
            const choices = [{ name: `None`, value: null }];
            const employeeList = await actions.viewAllEmployees();
            employeeList.forEach(({ id, first_name, last_name }) => choices.push({ name: `${first_name} ${last_name}`, value: { id } }));
            return choices;
          },
        },
      ];
      const { firstName, lastName, role, manager } = await inquirer.prompt(questions);

      const query = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES  ("${firstName}", "${lastName}", ${role?.id || null}, ${manager?.id || null})
      `;
      const data = await connection.promise().query(query);
      data ? console.log(`Added ${firstName} ${lastName} to the database`) : console.log(`Something went wrong. Please try again.`);
    } catch (error) {
      console.log(error);
    }
  },

  // TODO: fix
  updateEmployeeRole: async ({ employeeId, newRoleId }) => {
    try {
      const query = `
        UPDATE employee
        SET role_id = ${newRoleId}
        WHERE id = ${employeeId}
      `;
      const [{ affectedRows }] = await connection.promise().query(query);
      affectedRows ? console.log(`Updated employee's role`) : console.log(`Something went wrong. Please try again.`);
    } catch (error) {
      console.log(error);
    }
  },

  // TODO:
  updateEmployeeManager: async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  },

  // TODO:
  deleteEmployee: async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  },

  // TODO:
  viewEmployeesByManager: async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  },

  // TODO:
  viewEmployeesByDepartment: async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  },

  // TODO:
  viewSingleDepartmentBudget: async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  },

  // TODO:
  viewAllDepartmentBudgets: async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = actions;
