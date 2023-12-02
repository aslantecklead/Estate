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
    email TEXT,
    password text,
    phoneNumber TEXT,
    id_deal INT,
    FOREIGN KEY (id_deal) REFERENCES deal(id_deal)
);

INSERT INTO client (name, email, password, phoneNumber)
VALUES ('Иван', 'ivan@example.com', 'secretPassword', '1234567890');

SELECT * FROM client;

CREATE TABLE client_tokens (
    id_token INT AUTO_INCREMENT PRIMARY KEY,
    id_client INT,
    access_token TEXT,
    refresh_token TEXT,
    FOREIGN KEY (id_client) REFERENCES client(id_client)
);

SELECT * FROM client_tokens;

#Представление
CREATE VIEW AllPropertyData AS
SELECT
    o.id_offer,
    o.propertyDescription AS offerDescription,
    o.price AS offerPrice,
    o.agentName,
    e.address AS estateAddress,
    e.beds AS estateBeds,
    e.baths AS estateBaths,
    e.price AS estatePrice,
    e.broker_name AS brokerName,
    e.image_url AS imageUrl,
    e.latitude,
    e.longitude,
    e.area AS estateArea,
    d.date AS dealDate,
    c.name AS clientName,
    c.email AS clientEmail,
    c.phoneNumber AS clientPhoneNumber,
    s.date AS showingDate,
    s.clientName AS showingClientName
FROM offer o
JOIN estate e ON o.id_estate = e.id_estate
JOIN deal d ON o.id_offer = d.id_offer
JOIN client c ON d.id_deal = c.id_deal
JOIN showingSchedule s ON s.id_showingSchedule = o.id_showingSchedule;

SELECT * FROM AllPropertyData
	
# Функия: сумма купленной недвижимости для каждого клиента из их сделок #
SELECT 
    c.id_client,
    c.name AS client_name,
    SUM(d.price) AS total_purchase_amount
FROM client c
JOIN deal d ON c.id_deal = d.id_deal
GROUP BY c.id_client;

# Функия: добавление записей во все таблицы после покупки, но перед формированием отчета о покупке #
DELIMITER //

CREATE PROCEDURE InsertAllData(
    in_property_description TEXT,
    in_price INT,
    in_agent_name TEXT,
    in_estate_address TEXT,
    in_beds INT,
    in_baths INT,
    in_estate_price VARCHAR(50),
    in_broker_name VARCHAR(100),
    in_image_url VARCHAR(1000),
    in_latitude VARCHAR(50),
    in_longitude VARCHAR(50),
    in_area INT,
    in_deal_property_description TEXT,
    in_deal_price DOUBLE,
    in_deal_date DATE,
    in_client_name TEXT,
    in_client_email TEXT,
    in_client_phone_number TEXT
)
BEGIN
    DECLARE last_id_estate INT;
    DECLARE last_id_showing_schedule INT;
    DECLARE last_id_offer INT;
    DECLARE last_id_deal INT;
    DECLARE last_id_client INT;

    INSERT INTO showingSchedule (property, date, clientName)
    VALUES (in_property_description, CURDATE(), in_client_name);
    SET last_id_showing_schedule = LAST_INSERT_ID();

    INSERT INTO estate (address, beds, baths, price, broker_name, image_url, latitude, longitude, area)
    VALUES (in_estate_address, in_beds, in_baths, in_estate_price, in_broker_name, in_image_url, in_latitude, in_longitude, in_area);
    SET last_id_estate = LAST_INSERT_ID();

    INSERT INTO offer (propertyDescription, price, agentName, id_estate, id_showingSchedule)
    VALUES (in_property_description, in_price, in_agent_name, last_id_estate, last_id_showing_schedule);
    SET last_id_offer = LAST_INSERT_ID();

    INSERT INTO deal (propertyDescription, price, date, id_offer)
    VALUES (in_deal_property_description, in_deal_price, in_deal_date, last_id_offer);
    SET last_id_deal = LAST_INSERT_ID();

    INSERT INTO client (name, email, phoneNumber, id_deal)
    VALUES (in_client_name, in_client_email, in_client_phone_number, last_id_deal);
    SET last_id_client = LAST_INSERT_ID();
END //

DELIMITER ;

CALL InsertAllData(
    'Beautiful condo in the city center',
    300000,
    'Agent Name',
    '456 Oak St',
    2,
    2,
    '$250,000',
    'Broker Name',
    'http://example.com/image.jpg',
    '40.7128',
    '-74.0060',
    150,
    'Sold condo',
    280000.00,
    '2023-11-25',
    'Alice Johnson',
    'alice@example.com',
    '987-654-3210'
);

# Транзакция / пример #
START TRANSACTION;

INSERT INTO estate (address, beds, baths, price, broker_name, image_url, latitude, longitude, area) 
VALUES ('123 Main St', 3, 2, '300000', 'John Doe', 'example.com/image.jpg', '40.7128', '-74.0060', 2000);

INSERT INTO estate (address, beds, baths, price, broker_name, image_url, latitude, longitude, area) 
VALUES ('456 Elm St', 4, 3, '450000', 'Jane Smith', 'example.com/image2.jpg', '34.0522', '-118.2437', 3000);

COMMIT;

# Хранимая процедура для генерации отчета о купленной недвижимости #
DELIMITER //

CREATE PROCEDURE GetLatestPropertyData()
BEGIN
    DECLARE last_record_id INT;
    
    -- Находим последнюю запись в представлении
    SELECT MAX(id_offer) INTO last_record_id FROM AllPropertyData;
    
    -- Выводим только последнюю запись
    SELECT * FROM AllPropertyData WHERE id_offer = last_record_id;
END //

DELIMITER ;
CALL GetLatestPropertyData();


