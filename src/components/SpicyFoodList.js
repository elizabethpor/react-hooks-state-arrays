import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  //sets the initial state of foods to spicyFoods (imported from data)
  const [foods, setFoods] = useState(spicyFoods);
  //sets the initial state of filterBy to 'All'
  const [filterBy, setFilterBy] = useState("All");

  // adds a new food to the list using the getNewSpicyFood() function imported from data
  // assigns the newFoodArray to setFoods, which automatically changes the state of foods to match this value
  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray)
  }

  // .filter to look for all foods except the one we clicked on (that we want to remove)
  //  and gives us back a new array with a shortened list of foods (newFoodArray) that doesn't include that food
  // it uses the food id as parameter to do so
  // and assigns the newFoodArray to setFoods, which automatically changes the state of foods to match this value

  // function handleLiClick(id) {
  //   const newFoodArray = foods.filter((food) => food.id !== id);
  //   setFoods(newFoodArray);
  // }

  //to update the array use .map()
  // and assigns the newFoodArray to setFoods, which automatically changes the state of foods to match this value
  function handleLiClick(id) {
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }

// handles the filter by type of cuisine 
// and assigns the selected cuisine to setFilterBy 
// which automatically changes the state of filterBy to match this value
  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }

  //if filterBy is === 'All' then it displays all the foods, if it isn't it displays the foods that match the 
  // selected cuisine
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  })

  // uses .map to diplay a new food when the button is clicked. 
  // this callback function (foodList) is called to display the ul
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  //returns to the DOM:
    // a drop down menu to select the cuisine, with a change event on it
  // a button to randomly add a food to the list, with a click event on it;
  // a ul listing the foods

  return (
    <div>

<select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>

      <button onClick={handleAddFood}>Add New Food</button>

      <ul>{foodList}</ul>
    
    </div>
  );
}

export default SpicyFoodList;
