import supabase from "./config.js";
let userName = document.getElementById('userName')

async function userFetchData() {
    try {
        const { data, error } = await supabase.auth.getUser()
        console.log(data)
        if(data){
        userName.innerHTML = data.user.user_metadata.name
    }
    } catch (err) {
        console.log(err);
    }
}

userFetchData()
