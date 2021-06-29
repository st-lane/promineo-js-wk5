
// Add common header - just to be fancy.
document.addEventListener('DOMContentLoaded', ()=>{
  // add H1 using content form doc title
  var header1 = document.createElement("H1");
  header1.textContent = document.title ? document.title : "Update document title";
  document.body.prepend(header1);
} );

// good stuff to share across classes.
class Utils {
    constructor(){
    }
    // handle the details of creating a menu prompt and collecting the return value
    showMenu(strIntro, arrOptions){
        let strOpts = "";
        for (let i=0; i<arrOptions.length; i++){
            strOpts += i + ") " + arrOptions[i] + "\n";
        }
        let retVal = prompt("================\n" + strIntro + "\n================\n" + strOpts );
        retVal = retVal === null ? "-1" : retVal;
        let testVal = parseInt(retVal);
        if (testVal <0 || testVal > arrOptions.length ) {
            retVal = "-1"; 
        }
        return retVal;
    }

    // handle the details of creating an informational alert
    showInfo(strIntro, arrOptions){
        alert("================\n" + strIntro + "\n================\n" + arrOptions.join("\n") );
        return true;
    }

    // take an arry of Items, return a string of their name property values
    showItemNames(arrIn){
        let arrItems = [];
        for( let i=0; i<arrIn.length; i++) {
            arrItems.push(arrIn[i].name);
        }
        return arrItems;
    }

    // take an arry of Items, return a string of their name and cost property values
    showItemNamesCosts(arrIn){
        let arrItems = [];
        for( let i=0; i<arrIn.length; i++) {
            arrItems.push(arrIn[i].name + " - " + this.currencyFormat(arrIn[i].cost));
        }
        return arrItems;
    }

    // convert string to int, check for null.
    toInt(strIn){
        if(strIn === null) return -1;
        else return parseInt(strIn);
    }

    //format number as currency
    currencyFormat(numIn){
        return "$" + numIn.toFixed(2);
    }
}

// A grocery item
class Item {
    constructor(name, cost){
        this.name = name; 
        this.cost = cost;
    }
}

// The grocery store, with an inventory
class Store extends Utils {
    constructor(arrIn){
        super();
        this.inventory = [];
        this.inventory.push( new Item("Eggs",1.78) );
        this.inventory.push( new Item("Milk",3.13) );
        this.inventory.push( new Item("Coffee",6.28) );
        this.inventory.push( new Item("Bread",2.50) );
        this.inventory.push( new Item("Salad Greens",1.78) );
        this.inventory.push( new Item("Strawberries",3.20) );
        this.inventory.push( new Item("Chicken Breasts",5.87) );
        this.inventory.push( new Item("Pork Loin",4.78) );
        this.inventory.push( new Item("Andoullie Sausage",3.78) );
        this.inventory.push( new Item("Cheddar Cheese",2.50) );
        this.inventory.push( new Item("Swiss Cheese",2.50) );
        this.inventory.push( new Item("Baked Beans", .78) );
        this.inventory.push( new Item("Green Beans",2.58) );
        this.inventory.push( new Item("Flour",2.54) );
    }

    // adds an item to the store
    addItem(name,cost){
        try{
            cost=parseInt(cost);
        } catch {
            cost = 0;
            console.log("ITEM: cost must be a number - is now free.  Whoops.");
        }
        this.inventory.push( new Item(name,cost) );
    }

    // remove an item from the store
    removeItem(idx){
        this.inventory.slice(idx,1);
    }
    // show names of current inventory
    showInventoryNames(){
        return super.showItemNamesCosts(this.inventory);
    }
    // alert to show current inventory by name.
    showInventory() {
        let arrItems = this.showInventoryNames();
        super.showInfo("Currently available at the Store", arrItems);
    }
}

// A shopping list
class ShoppingList {
    constructor(name){
        this.name = name;
        this.items = [];
        this.total = 0;
    }

    addItem(itemIn){
        this.items.push(itemIn);
        this.total += itemIn.cost;
    }

}


class ListController extends Utils {
    constructor(){
        super();
        this.Store = new Store;
        this.Items = [];
        this.Lists = [];
        this.currentList = null;
    }
    // add an Item to a list
    addItem(anItem,aList){
       // ideally, duplicate check goes here.  But I'm late and enought is enough
       this.currentList.push()
    }

    // creates, fires main menu, returns input
    getMenuChoice(){
        let strIntro ="Main Menu";
        let arrMenu = ["Exit", "Create a new list", "View a list", "Delete a list", "What's in the store?"];
        return super.showMenu(strIntro, arrMenu);
    }

    // creates a ShoppingList, adds to ListController Lists array
    createList(){
        let strIntro ="Create List:\nPlease provide a name for the list.";
        let name = super.showMenu(strIntro, [] );
        if (name === null) return false;        

        // ideally, duplicate check goes here.  But I'm late and enought is enough
        this.Lists.push( new ShoppingList(name) );
        this.setCurrentList(this.Lists.length-1);
        return true; 
    }

    // shows a specified ShoppingList as an alert
    viewList(){
        if (this.currentList === null) {
            super.showInfo("No lists have been created",[]);
        } else {
            let arrList = [];
            for (let i in this.Lists) {
                arrList.push(this.Lists[i].name + " " + super.currencyFormat(this.Lists[i].total));
            }

            let idxIn = super.toInt( super.showMenu("Choose a list to view:", arrList) );
            if (idxIn == -1  || idxIn > arrList.length-1 ) return;
            if (idxIn > arrList.length) {
                alert("Sorry, no list for that choice");
                return;
            }
            this.currentList = this.Lists[idxIn];
            let strIntro =`View List: ${this.currentList.name} - total: ${super.currencyFormat(this.currentList.total)}`;
            super.showInfo( strIntro, super.showItemNames(this.currentList.items) );
        }
    }

    // Deletes a list
    deleteList(){
        if (this.currentList === null) {
            super.showInfo("No lists have been created",[]);
        } else {
            let arrList = [];
            for (let i in this.Lists) {
                arrList.push(this.Lists[i].name);
            }

            let idxIn = super.toInt( super.showMenu("Choose a list to remove:", arrList) );
            if (idxIn == -1) return;
            if (idxIn <0 || idxIn > arrList.length) {
                alert("Sorry, no list for that choice");
                return;
            }
            this.Lists.splice(idxIn,1);
            if (this.Lists.length === 0 ) this.currentList = null;
            else this.currentList = this.Lists[0];
            alert("List deleted.");
        }
    }

    // set a list as the current list to be worked with
    setCurrentList(idxIn){
        this.currentList = this.Lists[idxIn];
    }

    addItemsToList(){
        let strIntro ="Add items to current list:\nAdd one or more items to the list,\nseparated by commas.";
        let arrMenu = this.Store.showInventoryNames();
        let retVal = super.showMenu(strIntro, arrMenu);
        if (retVal === -1) {
            console.log("Invalid entry in items list.");
            return;
        }

        let arrItems = retVal.split(",");
        let thisIdx;
        for (let i=0; i<arrItems.length; i++){
            try {
                thisIdx = parseInt(arrItems[i]);
                if (thisIdx > this.Store.inventory.length || thisIdx === -1) continue;
                // ideally, duplicate check goes here.  But I'm late and enought is enough
                this.currentList.addItem( this.Store.inventory[thisIdx] );
            }catch {
                console.log(`Could not add item ${arrItems[i]}`)
            }
        }
    }

    start(){
        let sel = super.toInt( this.getMenuChoice() );
        if (sel === -1) sel =0; 

        while(sel !== 0) {
            switch(sel){
                case 1:
                    let isOK = this.createList();
                    if (isOK) this.addItemsToList();
                    break;
                case 2:
                    this.viewList();
                    break;
                case 3:
                    this.deleteList();
                    break;
                case 4:
                    this.Store.showInventory();
                    break;
                default:
                    sel=0;
            }
            sel = super.toInt( this.getMenuChoice() );
            if (sel === -1) sel =0; 
        }
        alert("goodbye");
    }
}

// start
let LC = new ListController();
LC.start();