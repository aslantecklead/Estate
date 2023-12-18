create database RealEstate;
use RealEstate;

CREATE TABLE showingSchedule (
    id_showingSchedule INT AUTO_INCREMENT PRIMARY KEY,
    property TEXT NOT NULL,
    date DATE NOT NULL,
    clientName TEXT NOT NULL
);

INSERT INTO showingSchedule (property, date, clientName)
VALUES
    ('Spacious apartment in downtown', '2023-12-01', 'John Smith'),
    ('Cozy house with garden', '2023-11-28', 'Alice Johnson'),
    ('Luxury penthouse with city view', '2023-12-03', 'Robert Davis'),
    ('Modern condo near the beach', '2023-11-30', 'Emily Wilson'),
    ('Charming countryside villa', '2023-12-02', 'Sophia Brown');

SELECT * FROM showingSchedule;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
FLUSH PRIVILEGES;

SELECT user, host, plugin FROM mysql.user;

ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY '1234';

CREATE TABLE departments (
    id_departments INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL
);

INSERT INTO departments (name, location)
VALUES
    ('Sales', 'New York'),
    ('Development', 'San Francisco'),
    ('Marketing', 'Los Angeles'),
    ('Human Resources', 'Chicago'),
    ('Finance', 'Houston');

SELECT * FROM departments;

CREATE TABLE employees (
    id_employees INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL,
    position TEXT NOT NULL,
    id_departments INT,
    FOREIGN KEY (id_departments) REFERENCES departments(id_departments)
);

INSERT INTO employees (name, age, position, id_departments)
VALUES
    ('John Doe', 30, 'Manager', 1),
    ('Alice Smith', 25, 'Sales Representative', 2),
    ('Robert Johnson', 35, 'Developer', 1),
    ('Emily Wilson', 28, 'Marketing Specialist', 3),
    ('Sophia Brown', 32, 'HR Coordinator', 2);

SELECT * FROM employees;

CREATE TABLE projects (
    id_projects INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    column_3 TEXT
);

INSERT INTO projects (name, description, column_3)
VALUES
    ('Software Development', 'Developing a new mobile app', 'Value 1'),
    ('Marketing Campaign', 'Launching a new ad campaign', 'Value 2'),
    ('Research Project', 'Conducting market research', 'Value 3'),
    ('Infrastructure Upgrade', 'Upgrading server infrastructure', 'Value 4'),
    ('Product Launch', 'Preparing for a new product release', 'Value 5');

SELECT * FROM projects;

CREATE TABLE employee_project (
    id_employee_project INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    id_projects INT,
    id_employees INT,
    FOREIGN KEY (id_projects) REFERENCES projects(id_projects),
    FOREIGN KEY (id_employees) REFERENCES employees(id_employees)
);

INSERT INTO employee_project (name, id_projects, id_employees)
VALUES
    ('Software Development Task', 1, 3), -- Задача по разработке программного обеспечения для проекта 1, сотрудник 3
    ('Marketing Campaign Analysis', 2, 2), -- Анализ маркетинговой кампании для проекта 2, сотрудник 2
    ('Research Project Coordination', 3, 1), -- Координация исследовательского проекта для проекта 3, сотрудник 1
    ('Infrastructure Upgrade Planning', 4, 4), -- Планирование обновления инфраструктуры для проекта 4, сотрудник 4
    ('Product Launch Coordination', 5, 5); -- Координация запуска нового продукта для проекта 5, сотрудник 5

SELECT * FROM employee_project;

CREATE TABLE estate (
    id_estate INT AUTO_INCREMENT PRIMARY KEY,
    address TEXT NOT NULL,
    beds INT,
    baths INT,
    price VARCHAR(50),
    broker_name VARCHAR(100),
    image_url VARCHAR(1000), 
    latitude VARCHAR(50),
    longitude VARCHAR(50),
    area INT
);

INSERT INTO estate (address, beds, baths, price, broker_name, image_url, latitude, longitude, area)
VALUES
    ('123 Main St', 3, 2, '$350,000', 'John Doe', 'https://photos.zillowstatic.com/fp/bda92e278b4aebcf1846027767762ba9-p_e.jpg', '40.7128', '-74.0060', 200),
    ('456 Elm St', 4, 3, '$500,000', 'Jane Smith', 'https://photos.zillowstatic.com/fp/cff449bc5f0907e7b66d3531fab1ffaf-p_e.jpg', '34.0522', '-118.2437', 300),
    ('789 Oak St', 5, 4, '$750,000', 'Mike Johnson', 'https://photos.zillowstatic.com/fp/b7db14cecac558ec4e8ad095c2aec242-p_e.jpg', '51.5074', '0.1278', 400),
    ('101 Pine St', 2, 1, '$250,000', 'Emily Williams', 'https://photos.zillowstatic.com/fp/659e2c24ba85e6e464ce91d9d4361119-p_e.jpg', '48.8566', '2.3522', 150),
    ('222 Maple St', 6, 5, '$1,000,000', 'David Brown', 'https://photos.zillowstatic.com/fp/b1d34754866a6c206d1c56a18625042b-p_e.jpg', '37.7749', '-122.4194', 500);

SELECT * FROM estate;

delete from estate where id_estate = 1;

CREATE TABLE offer (
    id_offer INT AUTO_INCREMENT PRIMARY KEY,
    propertyDescription TEXT,
    price INT,
    agentName TEXT,
    id_estate INT,
    id_showingSchedule INT,
    id_employee_project INT,
    FOREIGN KEY (id_estate) REFERENCES estate(id_estate),
    FOREIGN KEY (id_showingSchedule) REFERENCES showingSchedule(id_showingSchedule),
    FOREIGN KEY (id_employee_project) REFERENCES employee_project(id_employee_project)
);

INSERT INTO offer (propertyDescription, price, agentName, id_estate, id_showingSchedule, id_employee_project)
VALUES
    ('Beautiful house with garden view', 400000, 'John Doe', 1, 1, 1),
    ('Spacious apartment in downtown', 250000, 'Jane Smith', 2, 2, 2),
    ('Luxury villa with pool', 800000, 'Mike Johnson', 3, 3, 3),
    ('Cozy cottage near the lake', 180000, 'Emily Williams', 4, 4, 4),
    ('Modern penthouse with city skyline', 1200000, 'David Brown', 5, 5, 5);

SELECT * FROM offer;

CREATE TABLE deal (
    id_deal INT AUTO_INCREMENT PRIMARY KEY,
    propertyDescription TEXT,
    price DOUBLE,
    date DATE,
    id_offer INT,
    FOREIGN KEY (id_offer) REFERENCES offer(id_offer)
);

INSERT INTO deal (propertyDescription, price, date, id_offer)
VALUES
    ('Sold house with garden', 380000, '2023-10-15', 11),
    ('Purchased downtown apartment', 230000, '2023-09-20', 12),
    ('Villa sale transaction', 780000, '2023-11-05', 13),
    ('Cottage purchase by the lake', 175000, '2023-08-28', 14),
    ('Penthouse sale completion', 1180000, '2023-12-10', 15);

SELECT * FROM deal;

CREATE TABLE client (
    id_client INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    firstName TEXT,
    lastName TEXT,
	nameOnCard TEXT DEFAULT NULL,
    creditCardNumber TEXT DEFAULT NULL,
    expiration TEXT DEFAULT NULL,
    CVV TEXT DEFAULT NULL,
    email TEXT CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    password TEXT CHECK (LENGTH(password) >= 8 AND password REGEXP '^[a-zA-Z0-9]+$'), 
    phoneNumber TEXT,	
    id_deal INT,
    age INT,
    passportSeries TEXT,
    passportNumber TEXT,
    city TEXT,
    avatarURL TEXT DEFAULT NULL,
    FOREIGN KEY (id_deal) REFERENCES deal(id_deal)
);

CREATE TABLE roles (
    id_role INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE
);

select * from roles;

INSERT INTO roles (role_name) VALUES ('admin'), ('client');

INSERT INTO client (name, email, password, phoneNumber)
VALUES ('Иван', 'ivan@example.com', '12121212121', '1234567890');

SELECT * FROM client;



