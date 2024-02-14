const DisplayError = ({error}) => {
  return (
    <>
    {error? <p className="text-danger">
        {error?.data?.message || "Something went wrong, try again.."}
      </p>: null }
     
    </>
  );
};
export default DisplayError