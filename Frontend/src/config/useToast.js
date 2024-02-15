import { ToastContainer, toast } from "react-toastify";

  const useToast = ()=>{
const showToastMessage = (message) =>{
  return toast.success(message,{
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
 
    })
}
return showToastMessage
 
  }
  export default useToast;