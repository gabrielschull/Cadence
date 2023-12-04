import { withAuthenticator } from "@aws-amplify/ui-react";


function SignOut( {signOut, user}) {

    const handleSignOut = () => {
        signOut() ;
        console.log('signed out')
        }
    return (
          
          <div><button onClick = {handleSignOut} style = {{margin: '30px'}}>Sign Out</button></div>
          
    );
  }
  
  export default withAuthenticator(SignOut);