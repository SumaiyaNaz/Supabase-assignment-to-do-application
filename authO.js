import supabase from "./config.js";

let logOut = document.getElementById('logOut');

async function logOutUser(e) {
    e.preventDefault()
    try {
        const { error } = await supabase.auth.signOut()

    if(error){
        console.log(error)
    }
    else{
        alert('LogOut Successfully');
        location.href = 'index.html'
    }
    } 
    catch (err) {
        console.log(err)
    }
    
}

logOut.addEventListener('click',logOutUser)

