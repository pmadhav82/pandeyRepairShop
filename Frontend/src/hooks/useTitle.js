import { useEffect, useState } from "react"


const useTitle = (title = document.title)=>{



    useEffect(()=>{
        const prevTitle = document.title
        document.title = title

        return () => document.title = prevTitle
    },[title])


}

export default useTitle