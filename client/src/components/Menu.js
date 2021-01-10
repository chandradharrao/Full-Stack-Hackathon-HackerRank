import axios from 'axios';
import {useState,useEffect} from 'react';

function Menu(){
    const [menu,setMenu] = useState([]);
    const URL = 'endpoint to get Menu json'
    //get the menu from server
    useEffect(()=>{
        fetch(URL).then(res=>res.json()).then((items)=>{
            setMenu([data])
        })
    },[]) //run only once exctly

    function onSubmitHandler(){
        //post data to 
    }

    //change to checkbox from select/option
    //refer to this for UI: https://www.youtube.com/watch?v=oy9TEteCXdU&ab_channel=TheNetNinja
    return(
        <div>
            <input type = "button" onClick={onClickHandler}/>
            <form>
                <label for="menu">Choose Items</label>
                <select name="menu" id="menu" onChange={}>
                    {menu.length === 0?<div className="progress"><div class="indeterminate"></div></div>:menu.map((item,id)=>{
                            return <option value={`${menu[id].name}&${menu[id].price}`} key={id}>{item[id].name} : {item[id].price}</option>
                        })}
                </select>
                <br></br>
                <input type="button" onClick={onSubmitHandler}>Order Now</input>
            </form>
        </div> 
    )
}

export default Menu;