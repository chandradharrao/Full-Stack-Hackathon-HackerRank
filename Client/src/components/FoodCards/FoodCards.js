import React, {useContext} from 'react';
import './FoodCards.css';
import FoodItem from './FoodItems';


function FoodCards(props) {
  const map = props.menu.items.map((item,id)=>{
                return [
                    <FoodItem
                      key = {id}
                      src='/food.jpg' // Could be taken from the menu object itself
                      text={item.name}
                      description = {item.description}
                      //label='Not spicy' // This could also be parsed from the menu object and can be shown appropriately on the cards
                      addItem={props.addItem}
                      removeItem={props.removeItem}
                      price={item.price}
                      count={item.quantity}
                      category={props.menu.category}
                    />
                ]
          });
  return (
    <div className='foodMenu'>      
      <h3 className="menu-category">{props.menu.category}</h3>
      <ul className='foodContainer'>{map}</ul>
    </div>
  )
}

export default FoodCards;