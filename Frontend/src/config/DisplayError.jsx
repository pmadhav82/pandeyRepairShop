const DisplayError = ({error}) => {
  console.log(error)
  return (
    <>
    {error? <p className="text-danger">
        {error?.data?.message || error.error || "Something went wrong, try again.."}
      </p>: null }
     
    </>
  );
};
export default DisplayError