DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE SET NULL,
  FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

SELECT department.name, SUM(salary) AS budget
FROM department
JOIN role
ON role.department_id = department.id
JOIN employee
ON employee.role_id = role.id
GROUP BY department.name
WHERE department.id = 1