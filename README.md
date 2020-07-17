To create database run code in console

npm init
npm install
npm run first

===========================================================
API root folders create a file named .env with content:
DB_NAME=nameYouruserDB
DB_PASSWORD=yourDBpassword
PORT=3000

===========================================================
In the config -> config.json folder, replace it with your data:

{
  "development": {
    "username": "nameYouruserDB",
    "password": "yourDBpassword",
    "database": "Coockbook",
    "host": "127.0.0.1 or yourHost",
    "dialect": "mysql"
  }
}
===========================================================
In the database environment, open the console and run the following script:

DELIMITER $$

CREATE TRIGGER create_recipe_version
    AFTER INSERT
    ON recipe FOR EACH ROW
BEGIN
    insert into recipeVersion (recipe_id, created_at, description, version) values ( NEW.id, now(), NEW.description, NEW.version );
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER update_recipe_version
    AFTER UPDATE
    ON recipe FOR EACH ROW
BEGIN
    insert into recipeVersion (recipe_id, created_at, description, version) values ( NEW.id, now(), NEW.description, NEW.version );
END$$

DELIMITER ;
