import React from 'react';

function FoodItem(props) {
  return (    
      <li className='foodItem'>
        <div className='foodItemContainer'>
          <figure className='food__item__pic-wrap' price={"₹"+props.price}>
            <img
              className='food-item-img'
              src={props.src}
              alt="food image"
            />
          </figure>
          <div className='food-item-info'>
            <h5 className='food-item-name'>{props.text}</h5>
            <div className="count-container">
              {props.count > 0? <>
                  <button className="count" id="neg" onClick={(event) => {
                    event.preventDefault();
                    props.removeItem(props);
                    }}>-</button>
                  <input className="count-val" type="text" value={props.count}/>
                  <button className="count" id="pos" onClick={(event) => {
                    event.preventDefault();
                    props.addItem(props);
                    }}>+</button></>
              :
              <button className="add-cart" onClick={(event) => {
                event.preventDefault();
                props.addItem(props);
                }}>Add To Cart</button>
              }
              
            </div>
            <p>{props.description}</p>
          </div>
        </div>
      </li>    
  );
}

export default FoodItem;