import {useState} from 'react';
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
    //const [cloudImgUrl,setCloudImgUrl] = useState("");

    function cloudinaryUploadPromise(){
        return new Promise((resolve,reject)=>{
            //for file upload we need to use form data
            console.log("Uploading to cloudinary....")
            const fd = new FormData();
            fd.append("file",img);
            fd.append("upload_preset","officeCafeteria");
            fd.append("cloud_name","chandracloudinarystorage123");
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

    function createFinalForm(){
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
                setLocalImgUrl(window.URL.createObjectURL(event.target.files[0]))
                break;
            default:
                break;
        }
    }

    return(
        <div className="container">
            <form>
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
                <div>Upload ID Card</div>
                <div className="btn">
                    <input type="file" onChange={(event)=>onChangeHandler(event)} id="img-input"/>
                </div>
                <p></p>
                <div className="waves-effect waves-light btn" onClick={createFinalForm}>Upload form</div>
                <p></p>
                <Link to="/signin">Already Have an account?</Link>
                <PreviewForm previewData={[name,orgName,empID,mobNo,email,localImgUrl]}/>
            </form>
        </div>

    )
}

export default RegForm;