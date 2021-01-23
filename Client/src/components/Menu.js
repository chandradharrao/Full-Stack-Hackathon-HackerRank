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

    function placeOrder(){
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
                menu[category].items[item].quantity += 1;
                setMenu(menu);
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
                    menu[category].items[item].quantity -= 1;
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
    //change to checkbox from select/option
    //refer to this for UI: https://www.youtube.com/watch?v=oy9TEteCXdU&ab_channel=TheNetNinja
    return(
        <div>            
                {menu.length === 0?
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>:
                    <div className="menu">
                        {menu.map((category,id)=>{return <FoodCards key={id} menu={category} addItem={addItem} removeItem={removeItem}/>})}
                    </div>
                }
                {
                localStorage.getItem("jwt")===null?
                    <button className="" onClick={history.push('signin')}>SignIn To Order</button>:
                    <button className="" onClick={placeOrder}>Order Now!</button>
                }
            
        </div>
    )
}

export default Menu;