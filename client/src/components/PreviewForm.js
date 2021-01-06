//name,orgName,empID,mobNo,email,localImgUrl is sent as props
//position this to the right hand side
import {useState} from 'react'
function PreviewForm({prevData}){
    const [dispList,setDispList] = useState(null);

    function createPrev(){
        let temp = [];
        const keys = ["Name","Organization name","Employee ID","Mobile Number","Email","localImgUrl"]
        for(var i = 0;i<(prevData.length-1);i++){
            temp.push(<p key={i}>{keys[i]} : {prevData[i]}</p>);
        }
        i++;
        temp.push(<img src={prevData[i]} alt="Emp id card" key={i}/>);
        setDispList(temp);
    }

    return (
        <div>
            <h3>Preview Screen</h3><br></br>
            {dispList}<br></br>
            <input type="button" onClick={()=>createPrev()} value="Show Preview"/>
        </div>
    )
}

export default PreviewForm;