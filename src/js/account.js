/* 
-   "myData" version-(2.0)
-   File: src/js/account.js
*/
$(document).ready(function () {
    
    if (localStorage.getItem('activeAccount') === null) {
        
        $("#login").show()

        $("#root #account").hide()
        
        return null
        
    } else {

        $("#login").hide()
        
        $("#root #account").show()
        
        let activeAccount

        // logout function ---

        function logout()
        {
            localStorage.removeItem('activeAccount')
            localStorage.removeItem('isSecure')
            
            location.reload()
            
            console.log(` account status : ${ localStorage.length }`)
        }

        // accountStatus function ---

        function accountStatus()
        {    
            if (localStorage.getItem('isSecure') === null)
            {
                console.log(`account status : unsafe!`)

                logout()

                return null
            }
            activeAccount = JSON.parse(localStorage.getItem('activeAccount'))
        }

        /* load data function load repos */

        function loadData (data) {

            let folder = $('<details>').addClass('folder')
            
            let folder_icon = (data['private'])? `<span class='bi bi-folder-fill'></span>` : `<span class='bi bi-folder'></span>`

            folder.html(`<summary>    
                <div class='item'>
                    <span class='first'>
                        <h5> ${folder_icon} ${data['id']} </h5>
                        
                        <p> ${data['description']} </p>
                    </span>
                    <span class='first'>
                        <h3> ${data['name']} </h3>
                    </span>
                </div>
                
            </summary>`)

            $.each(data, function (key, value) {

                if (['id','private','name','description','owner','size','language','disabled','default_branch','open_issues','fork','created_at','updaed_at','url','html_url','clone_url','downloads_url',].includes(key)) {

                    if (['owner'].includes(key)) {
                                                
                        folder.append(`<div class="item items">
                            <span class='first'> ${key} </span>
                            <span class='last'> ${value.login} </span>
                        </div>`)
                
                    } else if (!['downloads_url','clone_url'].includes(key)) {

                        folder.append(`<div class="item items">
                            <span class='first'> ${key} </span>
                            <span class='last'> ${value} </span>
                        </div>`)
                    }
                }
            })

            folder.append(`<div class='item'>
                <span class='first'>
                    <button class='clone_btn'> <span class='bi-clone bi-egg-fill'></span> ${data['clone_url']} </button>
                </span>
                <span class='last'>
                    <a href="${data['download_url']}"  class='download_btn' download='${data['id']}.zip'> download zip file </a>
                </span>
            </div>`)

            $("#dataList").append(folder)
        }

        /* other user function load user data */

        function otherUser (data, target) {
                
            $("#statics").append(`<h3 class="lead"> ${target} ${data.length} </h3>
                <div id="${target}"></div>`)

            $.each(data, function (index, element) {
    
                $(`#${target}`).append(`<div class="item">
                    <div class="">
                        <a href="${element.avtor_url}" target="_blank" class=""> <span class="bi bi-person bi_btn"></span> </a>
                    </div>                    
                    <div class=""> ${element.id} </div>
                    <div class=""> ${element.type} </div>                    
                    <div class="">
                        <a href=${element.html_url}> ${element.html_url} </a> 
                    </div>                    
                    <div class=""> ${element.login} </div>
                </div>`)
            })
        }

        /* about us function load user data */

        function aboutUs(data) {

            let element = $(`<div id="row">`)

            element.append(`<div class="us">
                <span class="first">
                    <h2> ${data.name} &nbsp; ( <span>${data.id}</span> ) </h2>
                    <p> ${data.bio} </p>
                    <a href="${data.html_url}" class="url_btn"> <span class="bi bi-github"></span>  ${data.login} </a> 
                </span>
                <span class="first">
                    <a href="${data.avtor_url}" target="_blank" class="">
                        <img src=${data.avtor_url} alt=${data.node_id} class="profile_image">
                    </a>
                </span>
            </div>
            <div class="items">
                <div class="item">
                    <div class="first">Blog URL</div>
                    <div class="last">
                        <a href=${data.blog}>${data.blog}</a>
                    </div>    
                </div>
                <div class="item">
                    <div class="first"> Company Name </div>
                    <div class="last"> ${data.company} </div>    
                </div>
                <div class="item">
                    <div class="first"> Location </div>
                    <div class="last"> ${data.location} </div>    
                </div>
                <div class="item">
                    <div class="first"> Email ID </div>
                    <div class="last"> ${data.email} </div>    
                </div>
                <div class="item">
                    <div class="first"> Twitter ID </div>
                    <div class="last"> ${data.twitter_username} </div>    
                </div>
                <div class="item">
                    <div class="first"> Total Public Repository </div>
                    <div class="last"> ${data.public_repos} </div>    
                </div>
                <div class="item">
                    <div class="first"> HireAble </div>
                    <div class="last"> ${data.hireable} </div>    
                </div>
                <div class="item">
                    <div class="first"> Account Type </div>
                    <div class="last"> ${data.type} </div>    
                </div>
                <div class="item">
                    <div class="first"> Site Admin </div>
                    <div class="last"> ${data.site_admin} </div>    
                </div>
                <div class="item">
                    <div class="first"> View Status </div>
                    <div class="last"> ${data.user_view_type} </div>    
                </div>
                <div class="item">
                    <div class="first"> Account Created at </div>
                    <div class="last"> ${data.created_at} </div>    
                </div>
                <div class="item">
                    <div class="first"> Account Last Upated at </div>
                    <div class="last"> ${data.updated_at} </div>    
                </div>
            <div>`)

            /* $.each(data, function (key, value) {
            
                if (['login','id','node_id','avatar_url','html_url','type','user_view_type','site_admin','name','company','blog','location','email','hireable','bio','twitter_username','public_repos','created_at','updated_at'].includes(key)) {

                    element.append(`<div class="item">
                        <div class="first">${key}</div>
                        <div class="last">${value}</div>    
                    </div>`)
                }
            }) */

            $("#about").append(element)
        }

        /* active Account */
        
        accountStatus()
        
        $("#title").append(activeAccount.username)
        
        aboutUs(activeAccount.data.user)

        otherUser(activeAccount.data.followers, "followers")
        otherUser(activeAccount.data.following, "following")

        $.each(activeAccount.data.repos, function (index, element) {

            loadData(element)
        })

        $("#logout_btn").click(() => logout())
    }
})
/* Developer Mayank | ( https://mayankdevil.github.io/MayankDevil ) */