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
    console.log("SUCCESS!!!")
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
        customerSelection();
    })
}

// function to select products use inquirer 
// function makes promise
// how to solve a promise


function customerSelection(){
    // why the brackets?
    // calling inquirer from earlier prompting the user
    inquirer.prompt([
        {
            type: "list",
            feedback:"Choose the id of your desired product.",
            selection: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            name:"selection"
        },
        {
            type: "input",
            feedback:"How many do you want to buy?",
            name:"quantity"
        },
        {
            type: "confirm",
            feedback:"Are you sure?",
            name:"purchase",
            default: true
        }
    ])
    // why the  ".then"  what is it?
    .then(function(response){
        var selection = response.selection;
        var quantity = parseInt(response.quantity);
        var confirm = response.purchase;

        // validates purchase, the sell
        if (confirm) {
            validatingPurchase(selection, quantity);

            // prompt for user if otherwise to send through 
        } else{
            customerSelection();
        }
    });
}
// create function to process a purchase
// update info on products
// get new input
// option to change input function

