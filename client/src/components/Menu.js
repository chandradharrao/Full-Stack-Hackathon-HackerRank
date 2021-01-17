import {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import FoodCards from "./FoodCards/FoodCards";

//add quantity feature
function Menu(){
    const history = useHistory();
    const [order,setOrder] = useState([]);

    function onChangeHandler(event){
        let temp = order.map((item)=>{
            return item
        });
        temp.push(event.target.value);
        setOrder(temp);
    }

    function onSubmitHandler(){
        let fd = {name:null,price:null};
        for(let i = 0;i<order.length;i++){
            let temp = order[i].split("&");
            fd.name = temp[0];
            fd.price = temp[1];
        }
        console.log(fd);
        //post data to server
        fetch('/book',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },body:JSON.stringify(fd)
        }).then(res=>res.json()).then((data)=>{
            if(data.success){
                //redirect to the payment page
                history.push('/payment')
            }
            else{
                //make toast
            }
        })
    }

    const [menu,setMenu] = useState([]);

    //get the menu from server
    useEffect(()=>{
        console.log("Called once")
        fetch("/menu").then(res=>res.json()).then((items)=>{
            let temp = [];
            for(let i = 0;i<items.menu.length;i++){
                console.log(items.menu[i]);
                temp.push(items.menu[i])
            }
            setMenu(temp);
        })
    },[])

    const addItem = (props)=>{
        console.log("Added Item")
        console.log(props)
    }

    const removeItem = (props)=>{
        console.log("Removed Item")
        console.log(props)
    }
    //change to checkbox from select/option
    //refer to this for UI: https://www.youtube.com/watch?v=oy9TEteCXdU&ab_channel=TheNetNinja
    return(
        <div className="container">
            <h2>Today's Menu</h2>
            <p></p>
            {menu.length === 0?
                <div className="progress">
                    <div className="indeterminate">
                    </div>
                </div>:
                <form className="menu">{menu.map((category,id)=>{
                console.log("a")
                console.log(category)
                return [
                    <FoodCards id={id} menu={category} addItem={addItem} removeItem={removeItem}/>
                ]
            /*
            return [
                <p key={id}>
                    <label>
                        <input type="number" min="0" max="100" name={item.name + "&" + item.price} onChange={(event)=>{onChangeHandler(event)}}/>
                        <span>{item.name + " " + " Cost :  " + item.price}</span>
                    </label>
                </p>
                ]
            */
            })}</form>}
            {localStorage.getItem("jwt")===null?<div className="waves-effect waves-light btn" onClick={history.push('signin')}>SignIn To Order</div>:<div className="waves-effect waves-light btn" onClick={onSubmitHandler}>Order Now!</div>}
        </div> 
    )
}

export default Menu;

/*menu.map((item,id)=>{
            return <li className="collection-item" value={`${menu[id].name}&${menu[id].price}`} key={id}>{item.name} : {item.price}</li>
            })*/