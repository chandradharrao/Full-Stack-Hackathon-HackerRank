import React, {useContext} from 'react';
import './FoodCards.css';
import FoodItem from './FoodItems';


function FoodCards(props) {
  const map = props.menu.items.map((item,id)=>{
                return [
                    <FoodItem
                      key = {id}
                      src='/food.jpg'
                      text={item.name}
                      description = {item.description}
                      label='Not spicy'
                      addItem={props.addItem}
                      removeItem={props.removeItem}
                      price={item.price}
                      count={item.quantity}
                    />
                ]
          });
  return (
    <div className='foodMenu'>      
      <h3 className="menu-category">{props.menu.category}</h3>
      <div >      
          <ul className='foodContainer'>{map}</ul>
      </div>
    </div>
  )
}

export default FoodCards;