
import { PencilSquare } from "react-bootstrap-icons"
import {  useNavigate } from "react-router-dom"
 const Note = ({note})=>{
    const navigate = useNavigate()
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
const created = new Date(note.createdAt).toLocaleString("en-AU", options)
const updated = new Date(note.updatedAt).toLocaleString("en-AU", options)

const handleEdit = ()=> navigate(`/dash/notes/${note._id}`)
    return <>
     
<div >{note.completed? <p className="text-success"> <b>Closed</b></p>: <p className="text-primary">Open</p>}</div>
<div>{note.title}</div>
<div className="cln-3">{note.user.username}</div>
<div className="cln-4">{created}</div>
<div className="cln-5">{updated}</div>
<div> 
     <button onClick={handleEdit} className="btn btn-success">
     {<PencilSquare size={20}/>}Edit
        </button> 
    </div>
    
    </>
 }

 export default Note;