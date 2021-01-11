import {useEffect, useState} from 'react';
import {useHistory,Link} from 'react-router-dom'
import PreviewForm from './PreviewForm';

function RegForm(){
    var history = useHistory();
    const [name,setName] = useState("");
    const [orgName,setOrgName] = useState("");
    const [empID,setEmpID] = useState("");
    const [mobNo,setMobNo] = useState("");
    const [email,setEmail] = useState("");
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

    useEffect(()=>{
        if(valid!=="" && valid){//true
            let imgURL= cloudinaryUploadPromise();
            imgURL.then(
                (value)=>{
                    //imgURL is the url of the image after uploading to cloudinary
                    console.log("value : " + value)
                    let data = {name:null,orgName:null,empid:null,mobno:null,email:null,imgURL:null};
                    data.name = name;
                    data.orgName = orgName;
                    data.email = email;
                    data.empID = empID;
                    data.mobNo = mobNo;
                    data.imgURL = value;

                    fetch('/signup',{
                        method:"POST",
                        headers:{
                            'Accept': 'application/json',
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(data)
                        }).then((res)=>{
                            /*console.log(res)
                            console.log("res => " + res + " has type " + typeof res);
                            console.log("Before converting to json,id is " + res.regID)*/
                            return res.json();
                        }).then((serverData)=>{
                            //console.log(serverData);
                            //console.log("Server sent data with id "+ serverData.regID)
                            if(serverData.success){
                                //console.log("server Db created a user....");

                                //grab id
                                const id = serverData.regID;
                                console.log("id from server " + id)

                                //create a toast for success
                                setTimeout(() => {
                                    history.push('/successpage/' + id + "/" + empID);
                                }, 2500);
                            }else{
                                //create a toast for failure
                                console.log("Server sent error " + serverData.error)
                            }
                        }).catch((err)=>{
                            console.error(err);
                        })
                    },
                (error)=>{
                    console.log(error);
                }
            )
        }else if(valid === false){ //false
            let temp = [];
            let i =0;
            console.log("FormErrors state : " + JSON.stringify(formErrors));
            for(const property in formErrors){
                //console.log("formErrors[property]" + JSON.stringify(formErrors[property]));
                if(formErrors[property] === {}){

                }else{
                    let errObj = formErrors[property];
                    //console.log("errObj" + JSON.stringify(errObj));
                    if(errObj === {}){

                    }else{
                        for(const errProp in errObj){
                            //console.log("error property " + errProp)
                            let theErr = errObj[errProp];
                            console.log("The error " + theErr)
                            //use toast instead in final touches
                            temp.push(<div key={i++} style={{color:'red'}}>{theErr}</div>)
                        }
                    }
                }
            }
            console.log("Setting error message...")
            setErrMsgs(temp);
        }
        
    },[comp])

    function cloudinaryUploadPromise(){
        return new Promise((resolve,reject)=>{
            //for file upload we need to use form data
            console.log("Uploading to cloudinary....")
            const fd = new FormData();
            fd.append("file",img);
            fd.append("upload_preset","officeCafeteria");
            fd.append("cloud_name","chandracloudinarystorage123");
            //add loading bar
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
        let temp = {
            name:{},
            orgName:{},
            empID:{},
            mobNo:{},
            email:{},
            img:{}
        };
        //clear error messages
        setErrMsgs("");

        //flag to detect even event if single error occured 
        let isValid = true;
        
        console.log("img ....... : " + img);
        //check for empty fields
        if(name === "" || orgName === "" || empID === "" || mobNo === "" || email === "" || img === ".../..public/idCard.png"){
            console.log("Some empty fields..");
            isValid = false;
            let uploaded = {
                name,
                orgName,
                empID,
                mobNo,
                email,
                img
            };
            for(const prop in temp){
                console.log(typeof prop)
                if(uploaded[prop] === "" || uploaded[prop] === ".../..public/idCard.png"){
                    temp[prop].emptyField = `${prop} is required`;
                }
            }
            console.log("temp var " + JSON.stringify(temp));
            //setFormErrors((prevState)=>{console.log(prevState);
                //return {...prevState,temp}});
                setFormErrors(temp)
            console.log("FormErrors var after setting : " + JSON.stringify(formErrors))
            //return isValid;
            setValid(isValid);
            setComp(comp + "1");
            return;
        }

        //remove white spaces and check for length of name
        if(name.trim().length < 5){
            console.log("Name should be atleast 5 characters long");
            temp.name.shortName = "Name should be atleast 5 characters long";
            isValid = false;
        }

        //if name has integers
        for(let i = 0;i<name.length;i++){
            //if not (not a number) === a number
            if(!isNaN(name[i])){
                console.log("Name should not contain numbers")
                temp.name.nameNumber = "Name should not contain numbers";
                isValid = false;
                break;
            }
        }

        //mobile number cannot contain letters
        for(let i = 0;i<mobNo.length;i++){
            //if not a number === a letter
            if(isNaN(mobNo[i])){
                console.log("Mobile Number should not have alphabets")
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
            console.log("Setting.....")
            temp.email.dotErr = "Email should contain . and string after that";
        }

        //check for format of image uploaded
        let imgNameArr =  img.name.split(".");
        let fileType = imgNameArr[imgNameArr.length - 1];
        console.log("File type " + fileType);
        if(fileType === "png" || fileType === "jpeg" || fileType === 'jpg'){

        }else{
            temp.img.typeErr = "Image should be of the format png or jpeg";
            isValid = false;
        }

        //set the formErrors state
        console.log("Temp variable : " + JSON.stringify(temp));
        setFormErrors(temp);

        //set isValid;
        console.log("setting valid..")
        setValid(isValid);
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
            case "img-input":
                setImg(event.target.files[0]);
                console.log(event.target.files[0].name)
                setLocalImgUrl(window.URL.createObjectURL(event.target.files[0]))
                break;
            default:
                break;
        }
    }

    return(
        <div className="container">
            {load}
            <form>
                <h1>Registration Form</h1>
                {errMsgs}
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
                <div>Upload ID Card</div>
                <div className="btn">
                    <input type="file" onChange={(event)=>onChangeHandler(event)} id="img-input"/>
                </div>
                <p></p>
                <div className="waves-effect waves-light btn" onClick={formValidation}>Upload form</div>
                <p></p>
                <Link to="/signin">Already Have an account?</Link>
                <PreviewForm previewData={[name,orgName,empID,mobNo,email,localImgUrl]}/>
            </form>
        </div>

    )
}

export default RegForm;