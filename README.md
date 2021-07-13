# Todo list laravel8 vuejs
A simple todolist for demonstration purpose. Based on Laravel 8.

# Installation
Clone the repository-
```sh
clone https://github.com/YoussefHarizi/todolist_laravel_vue.git todolist_laravel_vue
```
Then cd into the folder with this command-
```sh
cd todolist_laravel_vue
```
Then do a composer install
```sh
composer install
```
Then create a environment file using this command-
```sh
cp .env.example .env
```
Then edit .env file with appropriate credential for your database server. Just edit these two parameter(DB_USERNAME, DB_PASSWORD).

Then create a database named "todolist" and then do a database migration using this command-
```sh
php artisan migrate
```
generate application key, which will be used for password hashing, session and cookie encryption etc.
```sh
php artisan key:generate
```
Run ``` npm install && npm run dev ``` to install all front end dependencies
Run ``` npm run watch ``` to build vue 
# Screenshots




