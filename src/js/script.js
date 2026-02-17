/* 
-   "myData" version-(2.0)
-   File: src/js/script.js
*/
$(document).ready(function () {

    $("#login_btn").click(function() {
        
        /* set account */

        let account = {
            username : $("#username").val(),
            password : $("#password").val(),
            status : $("#status")
        }

        /* empty input field error */

        if (!account.username && !account.password) {

            account.status.addClass("unvalid").text(`Empty input field!`) || console.log(`(input field) : is Empty`)

            return null
        }

        $.when(

            $.getJSON("package.json"),
            $.getJSON(`https://api.github.com/users/${account.username}`),
            $.getJSON(`https://api.github.com/users/${account.username}/repos`),
            $.getJSON(`https://api.github.com/users/${account.username}/followers`),
            $.getJSON(`https://api.github.com/users/${account.username}/following`),

        ).done(function (key, user, repos, followers, following) {
            
            localStorage.clear()

            /* active account local */

            localStorage.setItem('activeAccount',JSON.stringify({
                username : account.username,
                data : {
                    followers : followers[0],
                    following : following[0],   
                    repos : repos[0],
                    user : user[0]
                }
            }))
            account.confirm = key[0].hijack
            
            if (account.password != account.confirm) {
                
                account.status.addClass("unvalid").text(`Account Password Invalid!`) || console.log(`(login account password) : invalid!`)
                
                return null
            }
            localStorage.setItem(`isSecure`,true)
            
            console.log(`[account] : active!`)
            
            account = null // secure

            location.reload()

        }).fail(function () {

            account.status.addClass("unvalid").text(`Account Access Invalid!`) || console.log(`(login account username) : invalid!`)
        })
    })
})
/* Developer Mayank | ( https://mayankdevil.github.io/MayankDevil ) */