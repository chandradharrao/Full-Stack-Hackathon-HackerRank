import {useState} from 'react';
import axios from 'axios';
import PreviewForm from './PreviewForm';

function RegForm(){
    const [name,setName] = useState("Enter your full name");
    const [orgName,setOrgName] = useState("Enter your Organization Name");
    const [empID,setEmpID] = useState("Enter your employee ID");
    const [mobNo,setMobNo] = useState("Enter your mobile Number");
    const [email,setEmail] = useState("Enter your Email");
    const [img,setImg] = useState(".../..public/idCard.png");

    const URL = 'end-point created in the server';

    function onChangeHandler(event){
        switch (event.target.id) {
            case "name-input":
                setName(event.target.value);
                break;
            case "org-input":
                setOrgName(event.target.value);
                break;
            case "empid-input":
                setEmpID(event.target.value);
                break;
            case "mobno-input":
                setMobNo(event.target.value);
                break;
            case "email-input":
                setEmail(event.target.value);
                break;
            case "img-input":
                setImg({file:event.target.files[0],name:event.target.files[0].name});
                break;
            default:
                break;
        }
    }

    function onClickHandler(){
        let fd = new FormData();
        fd.append("name",name);
        fd.append("orgName",orgName);
        fd.append("empid",empID);
        fd.append("mobno",mobNo);
        fd.append("email",email);
        fd.append("image",img.file,img.name);
        axios.post(URL,fd,{
            //display in ui
            //attach event handler for the evnt onUploadProgress by xmlhttp req
            onUploadProgress:(ProgressEvent)=>{
                console.log(`Progress : ${Math.round((ProgressEvent.loaded/ProgressEvent.total)*100)} %`)
            }
        }).then((res)=>{
            console.log(res.message);
        }).catch((err)=>{
            console.error(err);
        })
    }

    return(
        <form>
            <h1>Registration Form</h1>
            <input type="text" value={name} onChange={(event)=>onChangeHandler(event)} id="name-input"/><br></br>
            <input type="text" value={orgName} onChange={(event)=>onChangeHandler(event)} id="org-input"/><br></br>
            <input type="text" value={empID} onChange={(event)=>onChangeHandler(event)} id="empid-input"/><br></br>
            <input type="text" value={mobNo} onChange={(event)=>onChangeHandler(event)} id="mobno-input"/><br></br>
            <input type="text" value={email} onChange={(event)=>onChangeHandler(event)} id="email-input"/><br></br>
            <input type="file" value={img} onChange={(event)=>onChangeHandler(event)} id="img-input"/><br></br>
            <button onClick={onClickHandler}>Upload form</button><br></br>
            <PreviewForm />
        </form>
    )
}

export default RegForm;