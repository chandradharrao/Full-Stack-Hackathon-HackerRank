//name,orgName,empID,mobNo,email,localImgUrl is sent as props
//position this to the right hand side
function PreviewForm({previewData}){
    const keys = ["Name","Organization name","Employee ID","Mobile Number","Email","Password"];

    return(
        <div className="registration-form">
            <h3>Preview Screen</h3>
            <div className="card-header">
                {<img src={previewData.length===0?"./idCard.png":previewData[keys.length]} alt="Employee id Card" style={{height:"128px",width:"128px",marginLeft:"100px"}}></img>}
            </div>
                {previewData.length === 0?<div className="card-content">No data to be displayed</div>:<div className="prev-list">{keys.map((theKey,indx)=>{
                    return <h5 className="collection-item" key={indx}>{theKey} : <span className="prev-field">{previewData[indx]}</span></h5>
                })}</div>}
        </div>
    )
}

export default PreviewForm;