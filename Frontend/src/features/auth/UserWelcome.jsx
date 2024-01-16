

const UserWelcome = ()=>{
const date = new Date();
const today = new Intl.DateTimeFormat("en-US",{dateStyle:"full",timeStyle:"short"}).format(date)
    return<>
    <p>Today is : {today}</p>
    </>
}

export default UserWelcome