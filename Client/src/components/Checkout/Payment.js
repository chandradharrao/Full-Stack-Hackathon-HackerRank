import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./payment.css";
import { toast } from 'react-toastify';

function PaymentMode(){
    const params = useParams();
    const cost = params.amount;
    const history = useHistory();

    function onPay(){
        toast.success("Payment successfull!");
        history.push("/menu");
    }

    function onExit(){
        history.push("/menu");
    }

    function now(){
        var date = new Date();
        var d = new Date(date.getTime() + 30*60000);
        var h = d.getHours();
        var m = d.getMinutes();
        var mins = m<10? "0" + m.toString() : m.toString();
        var hours = h<10? "0" + h.toString() : h.toString();
        var time = hours + ":" + mins;
        return time;
    }

    return(
        <div className="payment-card">
            <div className="payment-holder">
                <h2 className="payment-title">Select mode of payment and takeaway time</h2>
            </div>
            <h3 className="amnt">Bill : {<span>&#8377;</span>}{cost}</h3>
            <div className="pay-img-holder" id="google" onClick={onPay}>
                <img className="pay-img" style={{height:"80%"}} src="/google-wallet.png" alt="google-pay"></img>
            </div>
            <div className="pay-img-holder" id="apple" onClick={onPay}>
                <img className="pay-img" style={{height:"80%"}} src="/wallet-passes-app.png" alt="apple-pay"></img>
            </div>
            <div className="pay-img-holder" id="visa" onClick={onPay}>
                <img className="pay-img" style={{height:"80%"}} src="/visa.png" alt="visa-pay"></img>
            </div>
            <div className="choose-time">
                <p>Choose takeaway time (Minimum 30 mins for preparation)</p>
                <input className="time" type="time" defaultValue={now()}></input>
            </div>
            <input className="ckt-bttn" type="button" value="Exit" onClick={onExit}></input>
        </div>
    )
}

export default PaymentMode;