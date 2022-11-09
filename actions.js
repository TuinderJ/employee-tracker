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
      const data = await connection.promise().query(query);
      return data[0];
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

  // TODO:
  deleteDepartment: async () => {},

  viewAllRoles: async () => {
    try {
      const query = `
        SELECT role.id, title, name AS department, salary
        FROM role
        LEFT JOIN department
        ON department_id = department.id
      `;
      const data = await connection.promise().query(query);
      return data[0];
    } catch (error) {
      console.log(error);
    }
  },

  // TODO: fix
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
            const choises = [{ name: `None`, value: null }];
            allDepartmentsList.forEach(({ id, name }) => {
              choises.push({ name, value: id });
            });
            return choises;
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

  // TODO:
  updateRoleSalary: async () => {},

  // TODO:
  deleteRole: async () => {},

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
      const data = await connection.promise().query(query);
      return data[0];
    } catch (error) {
      console.log(error);
    }
  },

  // TODO: fix
  addEmployee: async ({ firstName, lastName, role, manager }) => {
    try {
      const query = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES  ("${firstName}", "${lastName}", ${role}, ${manager})
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
      const data = await connection.promise().query(query);
      data[0].affectedRows ? console.log(`Updated employee's role`) : console.log(`Something went wrong. Please try again.`);
    } catch (error) {
      console.log(error);
    }
  },

  // TODO:
  updateEmployeeManager: async () => {},

  // TODO:
  deleteEmployee: async () => {},

  // TODO:
  viewEmployeesByManager: async () => {},

  // TODO:
  viewEmployeesByDepartment: async () => {},

  // TODO:
  viewSingleDepartmentBudget: async () => {},

  // TODO:
  viewAllDepartmentBudgets: async () => {},
};

module.exports = actions;
