--creates database
create database airbnb_data;

--uses database
use airbnb_data;

--creates table for python dataframe
create table airbnb_data_tbl (
    data_id int not null primary key auto_increment,
    room_id int,
    price float,
    lat float,
    long float,
    room_type varchar (50),
    city varchar (100),
    country varchar (100),
    city_country varchar (200)
);

--run this after data has been added to database to update the city_coutry field
update airbnb_data_tbl
set city_country = city+', '+city_country;

