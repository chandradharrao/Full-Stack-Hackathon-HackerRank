import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./payment.css";
import { toast } from 'react-toastify';

function PaymentMode(){
    const params = useParams();
    const cost = params.amount;
    const history = useHistory();

    function onPay(){
        toast.success("Payment successfull!")
        setTimeout(() => {
            history.push("/menu");
        }, 2500);
    }

    function onExit(){
        history.push("/menu");
    }

    function now(){
        console.log("Now:   ")
        var date = new Date();
        //d += 30;
        var d = new Date(date.getTime() + 30*60000);
        var h = d.getHours();
        var m = d.getMinutes();
        return h.toString() + ":" + m.toString();
    }

    return(
        <div className="payment-card">
            <div className="payment-holder">
                <h2 className="payment-title">Checkout</h2>
            </div>
            <div className="pay-img-holder-google" onClick={onPay}>
                <img className="pay-img" src="/google-wallet.png" alt="google-pay"></img>
            </div>
            <div className="pay-img-holder-apple" id="google" onClick={onPay}>
                <img className="pay-img" src="/wallet-passes-app.png" alt="apple-pay"></img>
            </div>
            <div className="pay-img-holder-visa" onClick={onPay}>
                <img className="pay-img" src="/visa.png" alt="visa-pay"></img>
            </div>
            <div className="choose-time">
                <p>Choose checkout time (Minimum 30 mins for prep)</p>
                <input className="time" type="time" defaultValue={now()}></input>
            </div>
            <h3 className="amnt">Bill : {<span>&#8377;</span>}{cost}</h3>
            <input className="ckt-bttn" type="button" value="Exit" onClick={onExit}></input>
        </div>
    )
}

export default PaymentMode;