 database if exists Bamazon_DB;
Create database Bamazon_DB;

USE Bamazon_DB;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_capacity INT NOT NULL,
PRIMARY KEY (id)
);


INSERT INTO products ( product_name, department_name, price, stock_capacity)
VALUES ("LizardmenModels", 'RareplasticToys', 20.30, 100);

INSERT INTO products ( product_name, department_name, price, stock_capacity)
VALUES ("StarWarsTrilogyOriginal", 'DVDs', 450.00, 50);

INSERT INTO products ( product_name, department_name, price, stock_capacity)
VALUES ("ArmyBuilderforPC", 'software', 120.50, 50);

INSERT INTO products ( product_name, department_name, price, stock_capacity)
VALUES ("ChaosModels", 'RareplasticToys', 29.80, 500);

INSERT INTO products ( product_name, department_name, price, stock_capacity)
VALUES ("HighelfModels", 'RareplasticToys', 505.60, 80);

INSERT INTO products ( product_name, department_name, price, stock_capacity)
VALUES ("Starcraft2Legacyofthevoid", 'PCGames', 105.52, 30);

INSERT INTO products ( product_name, department_name, price, stock_capacity)
VALUES ("ForHonor", 'PCGames', 48.28, 500);

INSERT INTO products ( product_name, department_name, price, stock_capacity)
VALUES ("HoratioHorblowerseries", 'DVDs', 5.99, 300);

INSERT INTO products ( product_name, department_name, price, stock_capacity)
VALUES ("EmireOfSigmarModels", 'RareplasticToys', 509.99, 80);

INSERT INTO products ( product_name, department_name, price, stock_capacity)
VALUES ("SkavenModels", 'RareplasticToys', 399.99, 70);
