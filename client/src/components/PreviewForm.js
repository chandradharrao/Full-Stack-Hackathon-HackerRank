//name,orgName,empID,mobNo,email,localImgUrl is sent as props
//position this to the right hand side
function PreviewForm({previewData}){
    const keys = ["Name","Organization name","Employee ID","Mobile Number","Email"];

    return(
        <div className="container">
            <h3>Preview Screen</h3>
                <div className="card-image">{<img src={previewData.length===0?"./idCard.png":previewData[keys.length]} alt="Employee id Card"></img>}</div>
                {previewData.length === 0?<div className="card-content">No data to be displayed</div>:<ul className="collection">{keys.map((theKey,indx)=>{
                    return <li className="collection-item" key={indx}>{theKey}:{previewData[indx]}</li>
                })}</ul>}
        </div>
    )
}

export default PreviewForm;