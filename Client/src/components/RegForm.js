import {useEffect, useState,useReducer, useContext} from 'react';
import {useHistory,Link} from 'react-router-dom'
import PreviewForm from './PreviewForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { UserDetailsContext } from '../App';
toast.configure();

function RegForm(){
    var history = useHistory();
    const [name,setName] = useState("");
    const [orgName,setOrgName] = useState("");
    const [empID,setEmpID] = useState("");
    const [mobNo,setMobNo] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [img,setImg] = useState(".../..public/idCard.png");
    //this state variable will hold the temp url of the image uploaded
    const [localImgUrl,setLocalImgUrl] = useState("./idCard.png");
    //this state variable will hold the errors for form validation
    //each property will hold errors pertaining to that field
    const [formErrors,setFormErrors] = useState({
        name:{},
        orgName:{},
        empID:{},
        mobNo:null,
        email:{},
        password:{},
        img:{}
    });
    //this state will be used to display the error message
    const [errMsgs,setErrMsgs] = useState("");
    //state to indicate completion of validation
    const [comp,setComp] = useState("");
    //state to represent weather the inputs are all valid or not
    const [valid,setValid] = useState("");
    //state to store loading element
    const [load,setLoad] = useState(null);
    //use the context to access state and dispatcher
    const {state,dispatch} = useContext(UserDetailsContext);

    //useEffect triggered when user clicks on submit button 
    //setStates are async and take a while to perform
    useEffect(()=>{
        //check if all inputs are valid
        if(valid!=="" && valid){//all input fields are correct and to prevent execution on first time loading of useEffect
            //promise 
            let imgURL= cloudinaryUploadPromise();
            //after execution and getting result of promise that creates image url
            imgURL.then(
                (value)=>{
                    //imgURL is the url of the image after uploading to cloudinary
                    //console.log("value : " + value)

                    //create the form data,but no need to use form data since its not a file upload
                    let data = {name:null,orgName:null,empid:null,mobno:null,email:null,imgURL:null};
                    data.name = name;
                    data.orgName = orgName;
                    data.email = email;
                    data.empID = empID;
                    data.mobNo = mobNo;
                    data.imgURL = value;
                    data.password = password;
                    
                    //post data to server
                    fetch('/signup',{
                        method:"POST",
                        headers:{
                            'Accept': 'application/json',
                            "Content-Type":"application/json"
                            //add authorization
                        },
                        body:JSON.stringify(data)
                        }).then((res)=>{
                            /*console.log(res)
                            console.log("res => " + res + " has type " + typeof res);
                            console.log("Before converting to json,id is " + res.regID)*/
                            //when using curly braces we need to return or else no need to return
                            return res.json();
                        }).then((serverData)=>{
                            //console.log(serverData);
                            //console.log("Server sent data with id "+ serverData.regID)
                            if(serverData.success){
                                //console.log("server Db created a user....");

                                //grab regestration id of the user regestered at the database successfully
                                const id = serverData.regID;
                                //console.log("id from server " + id)

                                //create a toast for success
                                toast.success(serverData.message)

                                //store the user data
                                dispatch({type:"SET_USER_DETAILS",payload:serverData.user})
                                localStorage.setItem("user",JSON.stringify(serverData.user));
                                localStorage.setItem("jwt",serverData.token);

                                setTimeout(() => {
                                    //navigate the user manually to the successpage
                                    history.push('/successpage/' + id + "/" + empID);
                                }, 2500);
                            }else{
                                //ToDo : create a toast for failure
                                toast.error(serverData.message);
                                setLoad(null);
                                //console.log("Server sent error " + serverData.error)
                            }
                        }).catch((err)=>{
                            console.error(err);
                        })
                    },
                (error)=>{
                    console.log(error);
                }
            )
        }else if(valid === false){ //if input fields are not valid ie valid state is set to false
            let temp = [];
            //var to give unique key value to react elements
            let i =0;
            //console.log("FormErrors state : " + JSON.stringify(formErrors));
            //iterate through FormErrors object
            for(const property in formErrors){
                //console.log("formErrors[property]" + JSON.stringify(formErrors[property]));

                //if no form error for a particular iput field,do nothing
                if(formErrors[property] === {}){

                }else{
                    //capture the error name and error message
                    let errObj = formErrors[property];
                    //console.log("errObj" + JSON.stringify(errObj));
                    if(errObj === {}){

                    }else{
                        //iterate through the particular error of the input field
                        for(const errProp in errObj){
                            //console.log("error property " + errProp)
                            //capture the error message
                            let theErr = errObj[errProp];
                            //console.log("The error " + theErr)
                            //use toast instead in final touches
                            //create a error div
                            toast.error(theErr);
                            temp.push(<h6 key={i++} style={{color:'red'}}>{theErr}</h6>)
                        }
                    }
                }
            }
            ///console.log("Setting error message...")
            //set all the errors captured
            setErrMsgs(temp);
        }
        //dependent on the user click
    },[comp])

    function cloudinaryUploadPromise(){
        //return a new Promise since it takes time to complete
        return new Promise((resolve,reject)=>{
            //for file upload (image here) we need to use form data
            console.log("Uploading to cloudinary....")
            const fd = new FormData();
            fd.append("file",img);
            fd.append("upload_preset","officeCafeteria");
            fd.append("cloud_name","chandracloudinarystorage123");
            //loading bar
            setLoad(<div className="progress">
                        <div className="indeterminate"></div>
                    </div>)
            fetch("https://api.cloudinary.com/v1_1/chandracloudinarystorage123/image/upload",{
                method:"POST",
                body:fd
            }).then(res=>res.json()).then(data=>{
                console.log(data);
                resolve(data.url);
            }).catch(err=>{
                console.log(err);
                reject(err);
            });
        })
    }

    function formValidation(){
        //temp variable to store different errors associated with each input field
        let temp = {
            name:{},
            orgName:{},
            empID:{},
            mobNo:{},
            email:{},
            password:{},
            img:{}
        };

        //default image for id card
        const defaultIMG = ".../..public/idCard.png"
        //clear error messages
        setErrMsgs("");

        //flag to detect occurence of atleast one error in form fields
        let isValid = true;
        
        //console.log("img ....... : " + img);
        //check for empty fields
        if(name === "" || orgName === "" || empID === "" || mobNo === "" || email === "" || img === defaultIMG || password === "" || confirmPassword === ""){
            //console.log("Some empty fields..");
            isValid = false;

            //this will store the input form states in key value pair for easy printing of error
            let copyData = {
                name,
                orgName,
                empID,
                mobNo,
                email,
                password,
                confirmPassword,
                img
            };

            //check for the empty input form field or default image
            for(const prop in copyData){
                //console.log(typeof prop)
                if(copyData[prop] === "" || copyData[prop] === defaultIMG){
                    //attach error to emptyField property
                    temp[prop].emptyField = `${prop} is required`;
                }
            }
            //console.log("temp var " + JSON.stringify(temp));
            //update the FormErrors state
            setFormErrors(temp)
            //console.log("FormErrors var after setting : " + JSON.stringify(formErrors))
            //return isValid;
            //set the state representing weather form inputs are valid
            setValid(isValid);
            setComp(comp + "1");
            return;
        }

        //remove white spaces and check for length of name
        if(name.trim().length < 5){
            //console.log("Name should be atleast 5 characters long");
            temp.name.shortName = "Name should be atleast 5 characters long";
            isValid = false;
        }

        //if name has integers
        for(let i = 0;i<name.length;i++){
            //if not (not a number) === a number or is not a space
            if(!isNaN(name[i]) && name[i]!==" "){
                //console.log("Name should not contain numbers")
                temp.name.nameNumber = "Name should not contain numbers";
                isValid = false;
                break;
            }
        }

        //mobile number cannot contain letters
        for(let i = 0;i<mobNo.length;i++){
            //if not a number === a letter
            if(isNaN(mobNo[i])){
                //console.log("Mobile Number should not have alphabets")
                temp.mobNo.mobAlpha = "Mobile Number should not have alphabets"
                isValid = false;
                break;
            }
        }

        //email should have '@' and . followed by string
        let at = false;
        let dot = false;
        for(let i = 0;i<email.length;i++){
            if(email[i] === '@'){
                at = true;
            }
            if(email[i] === '.'){
                //check if there is string after .
                console.log("email length is ...... : " + email.length)
                if(i+1 < email.length && isNaN(email[i+1]) === true){
                    dot = true;
                }
            }
        }

        //check for @ after searching entire string
        if(!at){
            isValid = false;
            temp.email.atErr = "Email should contain @ symbol";
        }
        if(!dot){
            isValid = false;
            //console.log("Setting.....")
            temp.email.dotErr = "Email should contain . and string after that";
        }

        //check for password and confirm password match
        if(password !== confirmPassword){
            isValid = false;
            temp.password.donotMatchErr = "Passwords do not match";
        }else{
            //passwords match,check for length of passwords
            if(password.length<12){
                isValid = false;
                temp.password.shortPass = "Password must be atleast 12 characters long";
            }else{
                //password is fine lenght,check for spaces in password as not allowed
                for(let i = 0;i<password.length;i++){
                    if(password[i] === " "){
                        isValid = false;
                        temp.password.spaceErr = "Spaces in password not allowed";
                        break;
                    }
                }
            }
        }

        //check for format of image uploaded
        let imgNameArr =  img.name.split(".");
        let fileType = imgNameArr[imgNameArr.length - 1];
        //console.log("File type " + fileType);
        if(fileType === "png" || fileType === "jpeg" || fileType === 'jpg'){

        }else{
            temp.img.typeErr = "Image should be of the format png or jpeg";
            isValid = false;
        }

        //set the formErrors state
        //console.log("Temp variable : " + JSON.stringify(temp));
        setFormErrors(temp);

        //set isValid;
        //console.log("setting valid..")
        setValid(isValid);
        //state that changes when user clicks submit button everytime so that useEffect kicks in.This is because setState is async and doesnt happen instantaneously,hence we need to use useEffect to trigger submission of form if all input fields are valid
        setComp(comp + "1");
    }

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
            case "pass-input":
                setPassword(event.target.value);
                break;
            case "confirm-pass-input":
                setConfirmPassword(event.target.value);
                break;
            case "img-input":
                setImg(event.target.files[0]);
                console.log(event.target.files[0].name)
                //creating local copy url of the image uploaded
                setLocalImgUrl(window.URL.createObjectURL(event.target.files[0]))
                break;
            default:
                break;
        }
    }

    return(
        <div className="registration">
        <div className="container-registration">
            {load}
            <form className="registration-form">
                <h1>Registration Form</h1>
                <div className="input-field">
                    <input type="text" value={name} placeholder="Name" onChange={(event)=>onChangeHandler(event)} id="name-input"/>
                </div>
                <div className="input-field">
                    <input type="text" value={orgName} placeholder="Organization Name" onChange={(event)=>onChangeHandler(event)} id="org-input"/>
                </div>
                <div className="input-field">
                    <input type="text" value={empID} placeholder="Employee ID" onChange={(event)=>onChangeHandler(event)} id="empid-input"/>
                </div>
                <div className="input-field">
                    
                </div>
                <div className="input-field">
                    <input type="text" value={mobNo} placeholder="Mobile Number" onChange={(event)=>onChangeHandler(event)} id="mobno-input"/>
                </div>
                <div className="input-field">
                    <input type="text" value={email} placeholder="Email" onChange={(event)=>onChangeHandler(event)} id="email-input"/>
                </div>
                <div className="input-field">
                    <input type="text" value={password} placeholder="Password" onChange={(event)=>onChangeHandler(event)} id="pass-input"/>
                </div>
                <div className="input-field">
                    <input type="text" value={confirmPassword} placeholder="Confirm Password" onChange={(event)=>onChangeHandler(event)} id="confirm-pass-input"/>
                </div>
                <div>Upload ID Card</div>
                <div className="btn">
                    <input type="file" onChange={(event)=>onChangeHandler(event)} id="img-input"/>
                </div>
                <p></p>
                <div className="waves-effect waves-light btn" onClick={formValidation}>Submit</div>
                <p></p>
            </form>
                <PreviewForm previewData={[name,orgName,empID,mobNo,email,password,localImgUrl]}/>
                <p className="footer-acc"><Link to="/signin">Already Have an account?</Link></p>
        </div>  
        </div>  
    )
}

export default RegForm;