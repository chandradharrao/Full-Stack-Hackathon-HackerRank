import axios from 'axios';
import {useState} from 'react-router-dom';

function Menu(){
    const [menu,setMenu] = useState(null);
    

    //admin should be able to ochange the menu
    const URL = 'url to fetch todays menu';

    function onClickHandler(){
        axios.get(URL).then((res)=>{
            //res will contain the object {items:[{name:dosa,price:10},{name:idli,price:15},{name:chapati,price:30}]}
            let items = res.items;
            let temp = [];
            for(let i = 0;i<items.length;i++){
                let item = items[i];
                temp.push(<option value={item.name+"&"+item.price} key={i}>{item.name}:{item.price}</option>)
            }
            setMenu(temp);
        })
    }

    function onSubmitHandler(){
        let fd = new FormData();
        axios.post({
            
        })
    }

    return(
        <div>
            <input type = "button" onClick={onClickHandler}/>
            <form>
                <label for="menu">Choose Items</label>
                <select name="menu" id="menu" onChange={}>
                    {menu}
                </select>
                <br></br>
                <input type="button" onClick={onSubmitHandler}>Book order</input>
            </form>
        </div> 
    )
}

export default Menu;