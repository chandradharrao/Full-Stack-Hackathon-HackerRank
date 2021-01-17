import React from 'react';

function FoodItem(props) {
  return (
    
      <li className='foodItem'>
        <div className='foodItemContainer'>
          <figure className='games__item__pic-wrap' price={"₹"+props.price}>
            <img
              className='games__item__img'
              src={props.src}
            />
          </figure>
          <div className='games__item__info'>
            <h5 className='games__item__text'>{props.text}</h5>
            <div>
            <button onClick={(event) => {
              event.preventDefault();
              props.removeItem(props);
              }}>-</button>
            &nbsp;{props.count}&nbsp;
            <button onClick={(event) => {
              event.preventDefault();
              props.addItem(props);
              }}>+</button>
            </div>
            <p>{props.description}</p>
          </div>
        </div>
      </li>
    
  );
}

export default FoodItem;