import {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import FoodCards from "../FoodCards/FoodCards";
import "./Menu.css";


//add quantity feature
function Menu(){
    const history = useHistory();
    const [order,setOrder] = useState([]);
/*
    function onChangeHandler(event){
        let temp = order.map((item)=>{
            return item
        });
        temp.push(event.target.value);
        setOrder(temp);
    }
*/
    function placeOrder(){
        //let fd = {name:null,price:null};
        let cost = 0;
        for(let i = 0;i<menu.length;i++){
            for(let j = 0; j<menu[i].items.length; j++){
                cost += menu[i].items[j].quantity * menu[i].items[j].price;
            }
        }
        alert("The cost is " + cost);
        /*
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
        })*/
    }

    const [menu,setMenu] = useState([]);
    const [showCheckout, setCheckout] = useState(false);

    //get the menu from server
    useEffect(()=>{
        console.log("Called once");
        fetch("/menu").then(res=>res.json()).then((items)=>{
            let temp = [];
            console.log("Items:::::");
            console.log(items);
            for(let i = 0; i < items.menu.length; i++){                
                for(let j = 0; j < items.menu[i].items.length; j++) items.menu[i].items[j].quantity = 0;
                temp.push(items.menu[i]);
            }
            setMenu(temp);
        })
    },[])

    const addItem = (product)=>{
        //console.log("Added Item: "+product.text);
        //console.log(order)
        const category = menu.findIndex(p => p.category === product.category);
        if(category >= 0){
            const item = menu[category].items.findIndex(p => p.name === product.text);
            if(item >= 0){
                //let copy = menu;
                menu[category].items[item].quantity += 1;
                setMenu(menu);
                setCheckout(true);
                
                const cartIndex = order.findIndex(p => p.name === product.text);
                if(cartIndex >= 0){
                    const cart = order.slice();
                    const existingProduct = cart[cartIndex];
                    const updatedProduct = {...existingProduct, quantity: existingProduct.quantity + 1};
                    cart[cartIndex] = updatedProduct
                    setOrder(cart)
                }
                else{
                    const newItem = menu[category].items[item];
                    newItem.quantity = 1;
                    setOrder([...order, newItem])
                }
                
            }
            else{
                console.log("Invalid Product"); // A product which is not in the menu has been passed (possibly by manually editing the webpage)
            }
        }
        else{
            console.log("Invalid Product"); // A product which is not in the menu has been passed (possibly by manually editing the webpage)
        }
    }

    const removeItem = (product)=>{
        const category = menu.findIndex(p => p.category === product.category);
        if(category >= 0){
            const item = menu[category].items.findIndex(p => p.name === product.text);
            if(item >= 0){
                if(menu[category].items[item].quantity){
                    (menu[category].items[item].quantity -= 1) <= 0? setCheckout(false): setCheckout(true);
                    setMenu(menu);
                    
                    const cartIndex = order.findIndex(p => p.name === product.text);
                    if(cartIndex >= 0){
                        const cart = order.slice();
                        const existingProduct = cart[cartIndex];
                        const updatedProduct = {...existingProduct, quantity: existingProduct.quantity - 1};
                        cart[cartIndex] = updatedProduct
                        setOrder(cart)
                    }
                    
                } 
            }
            else{
                console.log("Invalid Product"); // A product which is not in the menu has been passed (possibly by manually editing the webpage)
            }
        }
        else{
            console.log("Invalid Product"); // A product which is not in the menu has been passed (possibly by manually editing the webpage)
        }
    }

    return(
        <div>       
            {localStorage.getItem("jwt")===null? history.push('signin'):
                <div className="greet">
                    <h1 className="user-greet">Welcome!!</h1>
                </div>
            }     
            {showCheckout?
                    <button className="checkout" onClick={placeOrder}>Order Now!</button> : <></>
                }
                {menu.length === 0?
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>:
                    <div className="menu">
                        {menu.map((category,id)=>{return <FoodCards key={id} menu={category} addItem={addItem} removeItem={removeItem}/>})}
                    </div>
                }
        </div>
    )
}

export default Menu;