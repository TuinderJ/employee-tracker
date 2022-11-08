const mysql = require(`mysql2`);
const cTable = require(`console.table`);

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
      console.table(data[0]);
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
      const data = await connection.promise().query(query);
      console.table(data[0]);
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
      const data = await connection.promise().query(query);
      console.table(data[0]);
    } catch (error) {
      console.log(error);
    }
  },

  addDepartment: async newDepartment => {
    try {
      const query = `
        INSERT INTO department (name)
          VALUES  ("${newDepartment}")
      `;
      const data = await connection.promise().query(query);
      data ? console.log(`Added ${newDepartment} to the database`) : console.log(`Something went wrong. Please try again.`);
    } catch (error) {
      console.log(error);
    }
  },

  addRole: async ({ role, salary, department }) => {
    try {
      const query = `
        INSERT INTO role (title, salary, department_id)
          VALUES  ("${role}", ${salary}, ${department})
      `;
      const data = await connection.promise().query(query);
      data ? console.log(`Added ${role} to the database`) : console.log(`Something went wrong. Please try again.`);
    } catch (error) {
      console.log(error);
    }
  },

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
};

module.exports = actions;