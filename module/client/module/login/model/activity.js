$(document).ready(function(){
    checkLocalSwithSession();
    regenerateSession();
});

function regenerateSession(){
    console.log('entra regeg_session');
    if (localStorage.getItem('user_id') !== null && localStorage.getItem('user_type') !== null){ //comprobar que el usuario esté logueado
        regenerateSessionID().then(function(data){
            console.log(data);
            if (data === '"error"'){
                localStorage.removeItem('user_id');
                localStorage.removeItem('user_avatar');
                localStorage.removeItem('user_type');
                location.href="index.php?page=503";
            }
        });   
    }
}

function checkLocalSwithSession(){ //comprobar que los credenciales en localstorage coincidan con los del session.
    console.log("entra en function");
    data = {                        
        "id":localStorage.getItem('user_id'),
        "type":localStorage.getItem('user_type')
    };
    checkSession(data).then(function(data){
        console.log('resuelve promise:');
        console.log(data);
        if (data === '"false"'){
            console.log('entra en if: checkSession.then');
            if (localStorage.getItem('user_id') === null || localStorage.getItem('user_type') === null){ //comprobar que el usuario esté logueado
                console.log("algun null en LS");
                localStorage.removeItem('user_id');
                localStorage.removeItem('user_avatar');
                localStorage.removeItem('user_type');
            }else{
                localStorage.removeItem('user_id');
                localStorage.removeItem('user_avatar');
                localStorage.removeItem('user_type');
                location.href="index.php";
                alert('You have done something suspicious 🤨');
            }
            
        }else{
            console.log('entra else');
        }
    });

}

var regenerateSessionID = function() {
    return new Promise(function(resolve, reject){
        $.ajax({
            type: 'POST',
            url: '/movieshop/module/client/module/login/controller/controller_login.php?op=regenerateSessionID',
        })
        .done(function(data){
            resolve(data);
        })
        .fail(function(data){
            console.log(data);
            reject("Error");
        });
    })
}

var checkSession = function(data) {
    return new Promise(function(resolve, reject){
        $.ajax({
            data: data,
            type: 'POST',
            url: '/movieshop/module/client/module/login/controller/controller_login.php?op=checkSession',
        })
        .done(function(data){
            resolve(data);
        })
        .fail(function(data){
            console.log(data);
            reject("Error");
        });
    })
}