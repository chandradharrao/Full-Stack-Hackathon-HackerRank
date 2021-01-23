import "./RegForm.css"
//name,orgName,empID,mobNo,email,localImgUrl is sent as props
//position this to the right hand side
function PreviewForm({previewData}){
    const keys = ["Name","Organization","Employee ID","Mobile Number","Email"];

    /*function mask(text){
        let thePass = ""
        for(let i = 0;i<text.length;i++){
            thePass += "*"
        }
        return thePass
    }*/

    return(
        <div className="preview-form">
            <h1 className="preview">Account Preview</h1>
            <div>
                {<img src={previewData.length===0?"./idCard.png":previewData[keys.length]} alt="Employee id Card" style={{height:"128px",width:"128px",marginLeft:"100px"}}></img>}
            </div>
                {previewData.length === 0?<div>No data to be displayed</div>:<div className="prev-list">{keys.map((theKey,indx)=>{
                    return <h5 className="collection-item" key={indx}>{theKey} : <span>{console.log(theKey)}{previewData[indx]}</span></h5>
                })}</div>}
        </div>
    )
}

export default PreviewForm;