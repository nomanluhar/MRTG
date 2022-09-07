
CREATE TABLE admin_user (
    _id int NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    password varchar(255),
    PRIMARY KEY (_id)
);

CREATE TABLE customers (
    customers_id int NOT NULL AUTO_INCREMENT,
    full_name varchar(255) NOT NULL,
    email varchar(255),
    user_name varchar(255),
    password varchar(255),
    PRIMARY KEY (customers_id)
);

CREATE TABLE customers_mrtg (
    _id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    url varchar(255),
    customer_id int,
    PRIMARY KEY (_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customers_id)
);

INSERT INTO admin_user (email,password)
VALUES ('admin@example.in','1234');