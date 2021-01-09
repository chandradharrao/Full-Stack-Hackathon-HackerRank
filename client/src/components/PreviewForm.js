//name,orgName,empID,mobNo,email,localImgUrl is sent as props
//position this to the right hand side
function PreviewForm({previewData}){
    const keys = ["Name","Organization name","Employee ID","Mobile Number","Email"];

    return(
        <div>
            <h3>Preview Screen</h3>
            {previewData.length === 0?<div>No data to be displayed</div>:<ul>{keys.map((theKey,indx)=>{
                return <li key={indx}>{theKey}:{previewData[indx]}</li>
            })}</ul>}{<img src={previewData[keys.length]} alt="Employee id Card"></img>}
        </div>
    )
}

export default PreviewForm;