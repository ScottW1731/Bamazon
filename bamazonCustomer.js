var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({ 
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Bamazon_DB"
})

connection.connect(function(error){
    if (error) throw error ;
    // here the function to show all the products goes
    displayAll();
})

function displayAll(){
    connection.query("SELECT * FROM products", function(error, response){
        if (error) throw error;
        for(var i= 0; i < response.length; i++){
            console.log('-------------------');
            console.log('ID: ' + response[i].id);
            console.log('Product Name: ' + response[i].product_name);
            console.log('Department Name: ' + response[i].department_name);
            console.log('Price: ' + response[i].price);
            console.log('Stock Quantity: ' + response[i].stock_quantity);
        }
        console.log("\n");
        // function will allow user to select a product from the database

    })
}

// function to select products use inquirer 
// function makes promise
// how to solve a promise
// create function to process a purchase
// update info on products
// get new input
// option to change input function

