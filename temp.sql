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
