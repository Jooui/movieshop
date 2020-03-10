# Movieshop (Development name)
This web application consists of the administration and provision of movies for all those people who want to watch any movie without worrying about searching on Netflix, HBO or any online streaming platform for movies. The idea is to link the accounts of Netflix, HBO, Amazon Video, Crunchyroll or different video platforms and easily find the content instantly with the greatest amount of ratings and comments.

## Preview
All the images shown below are provisional and will not be the final aspect of the web application:
### Homepage
![Preview home](https://github.com/Jooui/movieshop/blob/master/readme%20media/homepage.png)
### Shop
![Preview home](https://github.com/Jooui/movieshop/blob/master/readme%20media/shop.png)

## Getting Started
To run the code on your local machine and be able to observe the latest changes you need to install the LAMP stack. You also need to import a database.
## Prerequisites

* [Apache2](https://httpd.apache.org/)
* [PHP](https://www.php.net/)
* [MySQL](https://www.mysql.com/)

## Installing
- If you have problems configuring the LAMP stack you can do the following steps:
https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04
- My database for testing:https://github.com/Jooui/movieshop/blob/master/readme%20media/bbdd.sql


## Technologies

### Frontend
* [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [JQuery](https://jquery.com/)
### Backend
* [PHP](https://www.php.net/)
### Database
* [MySQL](https://www.mysql.com/)

## File Structure Summary
```bash
├── model
├── module
│   ├── admin
│   │   ├── module
│   │   │   ├── aboutus
│   │   │   ├── contact
│   │   │   ├── films
│   │   │   │   ├── controller
│   │   │   │   ├── model
│   │   │   │   └── view
│   │   │   ├── home
│   │   │   └── services
│   │   └── view
│   │       ├── css
│   │       ├── img
│   │       ├── inc
│   │       ├── js
│   │       ├── json
│   │       └── libraries
│   └── client
│       ├── module
│       │   ├── contact
│       │   ├── home
│       │   ├── search
│       │   └── shop
│       │       ├── controller
│       │       ├── model
│       │       └── view
│       └── view
│           ├── css
│           ├── img
│           ├── inc
│           ├── js
│           ├── json
│           └── libraries
├── readme_media
└── view
```
