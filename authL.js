import supabase from "./config.js";
let logIn = document.getElementById('logIn')

async function logInUser(e) {
    e.preventDefault()

    let lemail = document.getElementById('exampleInputEmail1')
    let lpaass = document.getElementById('exampleInputPassword1')

    try{
        if(!lemail.value){
            alert('Enter your email')
            return
        }
        else if(!lpaass.value){
            alert('Enter your password')
            return
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email: lemail.value ,
            password: lpaass.value ,
          })
        if(error){
            console.log(error);
            return
        }
        else{
            location.href = 'indexO.html'
        }
    }
    catch(err){
        console.log(err);
    }
}

logIn && logIn.addEventListener('submit',logInUser)