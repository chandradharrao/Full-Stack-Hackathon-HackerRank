import {useState} from 'react';
import {useHistory,Link} from 'react-router-dom'
//import axios from 'axios';
import PreviewForm from './PreviewForm';

//we need to make sure we store the image in cloudinary and supply the url and not the image itself
//change code to first upload to cloudinary and then use the url

function RegForm(){
    var history = useHistory();
    const [name,setName] = useState("Enter your full name");
    const [orgName,setOrgName] = useState("Enter your Organization Name");
    const [empID,setEmpID] = useState("Enter your employee ID");
    const [mobNo,setMobNo] = useState("Enter your mobile Number");
    const [email,setEmail] = useState("Enter your Email");
    const [img,setImg] = useState(".../..public/idCard.png");
    //this state variable will hold the temp url of the image uploaded
    const [localImgUrl,setLocalImgUrl] = useState(".../..public/idCard.png");

    const URL = 'end-point created in the server';

    function onChangeHandler(event){
        //validate the form data using regex
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
                setLocalImgUrl(URL.createObjectURL(event.target.files[0]))
                break;
            default:
                break;
        }
    }

    function onClickHandler(){
        //post object and not form data
        //img is the url of the image after uploading to cloudinary
        let fd = {name:null,orgName:null,empid:null,mobno:null,email:null,imgURL:null};
        fd.name = name;
        fd.orgName = orgName;
        fd.email = email;
        fd.empid = empID;
        fd.mobno = mobNo;
        fd.imgURL = img;
        fd = JSON.stringify(fd);
        /*axios.post(URL,fd,{
            //display in ui
            //attach event handler for the evnt onUploadProgress by xmlhttp req
            onUploadProgress:(ProgressEvent)=>{
                console.log(`Progress : ${Math.round((ProgressEvent.loaded/ProgressEvent.total)*100)} %`)
            }
        })*/
        fetch('/upload',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":""
            },
            body:fd
        }).then(res=>res.json).then((data)=>{
            //res will contain an user id generated at server,send this to successpage url and query the data base for user with this id and display his data
            const id = data.regID;
            console.log(data.message)
            history.push('/successpage/' + id);
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
            <input type="file" onChange={(event)=>onChangeHandler(event)} id="img-input"/><br></br>
            <button onClick={onClickHandler}>Upload form</button><br></br>
            <Link to="/signin">Already Have an account?</Link>
            <PreviewForm previewData={[name,orgName,empID,mobNo,email,localImgUrl]}/>
        </form>
    )
}

export default RegForm;