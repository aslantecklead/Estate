create database RealEstate;
use RealEstate;

CREATE TABLE real_estate (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imageSrc VARCHAR(255),
    price VARCHAR(50),
    address VARCHAR(255),
    brokerName VARCHAR(100)
);

INSERT INTO real_estate (imageSrc, price, address, brokerName)
VALUES ('image1.jpg', '$300,000', '123 Main St, City, Country', 'John Smith');

INSERT INTO real_estate (imageSrc, price, address, brokerName)
VALUES ('image2.jpg', '$250,000', '456 Elm St, City, Country', 'Jane Johnson');

INSERT INTO real_estate (imageSrc, price, address, brokerName)
VALUES ('image3.jpg', '$400,000', '789 Oak St, City, Country', 'Michael Davis');

INSERT INTO real_estate (imageSrc, price, address, brokerName)
VALUES ('image4.jpg', '$350,000', '101 Pine St, City, Country', 'Sarah Wilson');

select * from real_estate;

ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY '1234';

