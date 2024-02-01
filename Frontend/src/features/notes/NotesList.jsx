import Note from "./Note"
import { Container , Spinner} from "react-bootstrap"
import { useGetNotesQuery } from "./NotesApiSlice"

const NotesList = () => {
    const {data:notes, isError,  isLoading,isSuccess, error} = useGetNotesQuery()
    let content;
 
if(isLoading){
    content = <Spinner animation="border"/>
}

if(isError){
    content = <div>{error?.data?.message  || <p>Someting went wrong, try again</p>}</div>
}


    
if(isSuccess){
    content = <>
    <div className="notes-list-container">
<div className="header">Status</div>
<div className="header">Title</div>
<div className="header cln-3">Owner</div>
<div className="header cln-4">CreatedAt</div>
<div className="header cln-5">UpdatedAt</div>
<div className="header">Edit</div>
    {notes?.length ? notes.map(note => <Note note={note} key={note._id}/>): null}
    </div>

    </>
}
    
    
        return <>
    <Container >
        <h2>notesList</h2>
    
        {content}
    
        
    </Container>
    </>
    
}
export default NotesList