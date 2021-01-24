import "./Footer.css";

function Footer(props){
    let cost = 0;
    let menu = props.menu
    for(let i = 0;i<menu.length;i++){
        for(let j = 0; j<menu[i].items.length; j++){
            cost += menu[i].items[j].quantity * menu[i].items[j].price;
        }
    }
    return(
        <div className="cart-footer">
            <span className="price">Total Bill : {<span>&#8377;</span>}{cost}</span>
            <input type="button" onClick={()=>props.orderFun()} className="checkout-btn" value="Checkout"></input>
        </div>
    )
}

export default Footer;