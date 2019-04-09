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
            console.log(
                    `ID: ${response[i].id} 
            Product Name: ${response[i].product_name}
            Department Name: ${response[i].department_name}
            Price: ${response[i].price}
            Stock capacity: ${response[i].stock_capacity}

            ` 
            )
       
            // console.log(' ID: ' + response[i].id +' >> Product Name: ' + response[i].product_name +' >>  Department Name: ' + response[i].department_name
            //  +' >>  Price: ' + response[i].price +' >>  Stock capacity: ' + response[i].stock_capacity+ "  \n");
          
        }
        // console.log("\n");
        // function will allow user to select a product from the database
        customerSelection();
    })
}

// function to select products use inquirer 


// function makes promise
// solve a promise

function customerSelection(){
    
    // calling inquirer from earlier prompting the user
    // user choses product from list
    inquirer.prompt([
        {
            type: "list",
            feedback:"Choose the id of your desired product.",
            choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            name:"choices"
        },
        {
            type: "input",
            feedback:"How many do you want to buy? Exit with X.",
            name:"quantity"
        },
        {
            type: "confirm",
            feedback:"confirm selection.",
            name:"select",
            default: true
        }
    ])
    // why the  ".then"  what is it?
    .then(function(response){
        var choices = response.choices;
        var quantity  = parseInt(response.quantity);
        var confirm = response.select;

        // validates select, then sell
        if (confirm) {
            validatingselect(choices, quantity);

            // prompt for user if otherwise to send through again
        } else{
            customerSelection();
        }
    });
}

// create function to process a select
function validatingselect(choices, quantity) {
    // what is the "WHERE id=?" ?
    connection.query("SELECT * FROM products WHERE id=?", [choices], function(error, response){
        if(error) throw error;
        var price;
        var currentCapacity;
        // update info on products

        if(quantity <= parseInt(response[0].stock_capacity)){
            currentCapacity = parseInt(response[0].stock_capacity) - quantity;

            // call update to the products after select
            updateCapacity(currentCapacity, choices);

            // display price of total items bought
            price = parseInt(response[0].price);
            cost = quantity * price;
            console.log("\n Your total is:" + cost.toFixed(2)+ "\n")

            // see if they will buy more
            buyMore();
        } else {
            // if user selects an amount that is impossible then prompt user so
            // and send back to select correctly
            console.log("I am sorry, you have an invalid selection!");
            buyMore();
        }
    });
}


// update original capacity minus selected amount
function updateCapacity (quantity, choices){
    var query = connection.query(
        "UPDATE products SET stock_capacity=? WHERE id=?",
    [quantity, choices],
    );
}

// get new input
// option to change input function
// ask user what else they want
function buyMore(){
    inquirer.prompt({
        type: "confirm",
        feedback:"Are you sure?",
        name:"purchase",
        choices: ["Y","N"]
    }).then(function(response){
        var choices = response.choices;

        // if yes log thank you for your business
        if (choices === "Y") {
            displayAll();
        } else {
            // if not log this
            console.log("\n thank you come again! \n");

            // end
            connection.end();
        }
    });
}