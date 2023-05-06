import { useState } from "react";
import SigninContext from "./signincontext";


const SigninState = (props)=>{
   const [ismemberlogin, setismemberlogin] = useState(false)
   const [islibrarianlogin, setislibrarianlogin] = useState(false)
   const [user, setuser] = useState([])
  function updatememberlogin(){
    setismemberlogin(true)
  }
    
  function memberlogout(){
    setismemberlogin(false)
  }

  function updatelibrarianlogin(){
    setislibrarianlogin(true)
  }
    
  function librarianlogout(){
    setislibrarianlogin(false)
  }

  function handlelogin(json){
  
      setuser(json.filter((user) => {
        return user.memberid === localStorage.getItem("memberid");
      }))
  }
return (
<SigninContext.Provider value={{user,handlelogin,ismemberlogin,updatememberlogin,memberlogout,islibrarianlogin,updatelibrarianlogin,librarianlogout}}>
    {props.children}
</SigninContext.Provider>
)
}

export default SigninState;


