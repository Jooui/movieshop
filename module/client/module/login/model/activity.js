$(document).ready(function(){
    checkLocalSwithSession();
    regenerateSession();
});

function regenerateSession(){
    if (localStorage.getItem('user_id') !== null && localStorage.getItem('user_type') !== null){ //comprobar que el usuario esté logueado
        regenerateSessionID().then(function(data){
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
    data = {                        
        "id":localStorage.getItem('user_id'),
        "type":localStorage.getItem('user_type')
    };
    checkSession(data).then(function(data){
        if (data === '"false"'){
            if (localStorage.getItem('user_id') === null || localStorage.getItem('user_type') === null){ //comprobar que el usuario esté logueado
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