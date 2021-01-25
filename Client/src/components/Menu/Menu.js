import {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import FoodCards from "../FoodCards/FoodCards";
import "./Menu.css";
import Footer from './MenuFooter';

//add quantity feature
function Menu(){
    const history = useHistory();
    const [order,setOrder] = useState([]);
    const [menu,setMenu] = useState([]);
    const [showCheckout, setCheckout] = useState(false);

    function placeOrder(){
        //let fd = {name:null,price:null};
        let cost = 0;
        for(let i = 0;i<menu.length;i++){
            for(let j = 0; j<menu[i].items.length; j++){
                cost += menu[i].items[j].quantity * menu[i].items[j].price;
            }
        }
       //alert("The cost is " + cost);
       setTimeout(() => {
        history.push('/payment/' + cost);
       }, 1500);
    }

    //get the menu from server
    useEffect(()=>{
        fetch("/menu", {headers : {'Accept': 'application/json'}}).then(res=>res.json()).then((items)=>{
            let temp = [];
            for(let i = 0; i < items.menu.length; i++){                
                for(let j = 0; j < items.menu[i].items.length; j++) items.menu[i].items[j].quantity = 0;
                temp.push(items.menu[i]);
            }
            setMenu(temp);
        })
    },[])

    function updateCheckoutFooter(){
        let cost = 0;
        for(let i = 0;i<menu.length;i++){
            for(let j = 0; j<menu[i].items.length; j++){
                cost += menu[i].items[j].quantity * menu[i].items[j].price;
            }
        }
        if(cost > 0){
            setCheckout(true)
        }else{
            setCheckout(false)
        }
    }

    const addItem = (product)=>{
        const category = menu.findIndex(p => p.category === product.category);
        if(category >= 0){
            const item = menu[category].items.findIndex(p => p.name === product.text);
            if(item >= 0){
                //let copy = menu;
                menu[category].items[item].quantity += 1;
                setMenu(menu);
                updateCheckoutFooter()

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
                    (menu[category].items[item].quantity -= 1) <= 0? console.log(">"):console.log(">");
                    setMenu(menu);
                    updateCheckoutFooter();
                    
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
                    <h1 className="user-greet">Today's Menu</h1>
                </div>
            }     
            {showCheckout?<Footer menu={menu} orderFun = {placeOrder}/> : <></>}
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