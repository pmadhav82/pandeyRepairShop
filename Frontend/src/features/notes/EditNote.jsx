import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { getNoteById } from "./NotesApiSlice"
const EditNote = ()=>{
const {noteId} = useParams()
const note = getNoteById(noteId)

    return<>
    <Container>

<h2>Edit Note</h2>
{note.title}
    </Container>
    
    
    </>
}

export default EditNote