USE employee_db;

INSERT INTO department (name)
  VALUES  ("Parts"),
          ("Sales"),
          ("Service"),
          ("Leasing");

INSERT INTO role (title, salary, department_id)
  VALUES  ("Parts Manager", 100000.00, 1),
          ("Service Manager", 120000.00, 3),
          ("Front Counter", 65000.00, 1),
          ("Back Counter", 60000.00, 1),
          ("Warehouseman", 45000.00, 1),
          ("Warehouse Manager", 70000.00, 1),
          ("Service Tech 1", 45000.00, 3),
          ("Service Tech 2", 50000.00, 3),
          ("Service Tech 3", 55000.00, 3),
          ("Service Tech 4", 60000.00, 3),
          ("Service Writer", 50000.00, 3),
          ("Foreman", 55000.00, 3),
          ("Outside Salesman", 100000.00, 2),
          ("Lease Account Manager", 100000.00, 4),
          ("Rental Manager", 80000.00, 4),
          ("General Manager", 150000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES  ("Mike", "Sheridan", 16, null),
          ("Robert", "Elliot", 2, 1),
          ("Joshua", "Tuinder", 1, 2),
          ("Jeff", "Thomas", 12, 2),
          ("Paul", "DeLeon", 7, 4),
          ("Joe", "Dirt", 6, 1),
          ("Stephen", "Ringman", 9, 2);