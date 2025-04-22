/*
-   myData ""
-   developer   : https://mayankdevil.github.io/MayankDevil
-   JavaScript  : ./src/js/account.js
*/

$(document).ready(function () {

    if (localStorage.getItem('activeAccount') == null)
    {
        location.href = '../login.html'

        return null
    }
    else
    {
        let activeAccount

        // accountStatus function ---

        function accountStatus()
        {
            if (localStorage.getItem("activeAccount"))
            {
                activeAccount = JSON.parse(localStorage.getItem('activeAccount'))
            }
            else if (localStorage.getItem('isSecure'))
            {
                console.log(`(login account status) :  secured!`)
            }
        }

        // logout function ---

        function logout()
        {
            localStorage.removeItem('activeAccount')
            localStorage.removeItem('isSecure')
            
            console.log(`(account) : close  ${ localStorage.length }`)

            location.reload()
        }

        /*
            ----------------------------
            | active section function  |
            ----------------------------
        */ 

        let section = document.getElementsByClassName("section")

        let aside_btn = document.getElementsByClassName("a_btn")

        function activeSection(index)
        {
            for (let i = 0; i < section.length; i++) 
            {
                section[i].style.display = 'none'
            }
            section[index].style.display = 'block'
        }

        for (let i = 0; i < aside_btn.length; i++)
        {
            aside_btn[i].onclick = () => {
                
                activeSection(i)
            }
        }
        activeSection(section.length - 1) // default active section

        /* 
            ----------------------
            | load data function |
            ---------------------- 
        */

        function loadData(account_data)
        {
            account_data.forEach(data => {

                const dataList = document.getElementById('dataList')
                
                let folder = document.createElement('details')

                folder.className = 'folder'

                let folder_icon = (data['isPrivate'])? `<span class='bi bi-folder-fill'></span>` : `<span class='bi bi-folder'></span>`
                
                // add summary element ---

                folder.insertAdjacentHTML("beforeend",`
                <summary>    
                    
                    <div class='item'>
                        <span class='first'>
                            <h5> ${folder_icon} ${data['folder']} </h5>
                            
                            <p> ${data['description']} </p>
                        </span>
                        <span class='first'>
                            <h3> ${data['name']} </h3>
                        </span>
                    </div>

                </summary>`)

                // add list item ---

                for (let key in data)
                {
                    if (Array.isArray(data[key])) 
                    {
                        folder.insertAdjacentHTML("beforeend",`
                            <div class='item items'>
                                <span class='first'> ${key} </span>
                                <span class='last'> ${data[key].join(' | ')} </span>
                            </div>    
                        `)
                    }  
                    else if (!['isPrivate', 'folder', 'name', 'description', 'url', 'clone', 'download'].includes(key))
                    {
                        folder.insertAdjacentHTML("beforeend",`
                            <div class='item items'>
                                <span class='first'> ${key} </span>
                                <span class='last'> ${data[key]} </span>
                            </div>    
                        `)
                    }
                }

                // add clone & donwload & url ---

                folder.insertAdjacentHTML("beforeend",`
                    <div class='item'>
                        <span class='first'>
                            <button class='clone_btn'> <span class='bi-clone bi-egg-fill'></span> ${data['clone']} </button>
                        </span>
                        <span class='last'>
                            <a href="#"  class='download_btn' download='${data['folder']}.zip'> download zip file </a>
                        </span>
                    </div>    
                `)
                dataList.append(folder)
            }) 
        }
        accountStatus()

        loadData(activeAccount.data)

        $("#profile_name").text(activeAccount.username)
        
        $("#profile_img").src = `${activeAccount.profile}`

        if (activeAccount.username === 'Mayank')
        {
            $("#heading h1").text(`Welcome Master, what may i do for you?`)
        }
        else
        {
            $("#heading h1").text(`Welcome ${activeAccount.username}`)
        }

        // logout button on click ---

        $("#logout_btn").on("click", logout)

        /*
            ---------------------------------------
            | clone button onclick copy git clone |
            ---------------------------------------
        */

        $(".clone_btn").on("click", function () {
                    
            let element = $(this)
            
            let clone_url = element.text().trim()
            
            navigator.clipboard.writeText(clone_url).then(function () {
                
                element.find("span").removeClass('bi-egg-fill').addClass('bi-egg-fried').css({
                    'color' : 'var(--green4)'
                })
            
            }).catch(function (error) {
            
                element.find('span').css('color', 'var(--red0)')

                console.log(`(clone) : unable! \n ${error}`)
            })
        })
        
        /*
            ----------------------------
            | download button on click |
            ----------------------------
        */

        $(".folder .download_btn").mouseout(() => {

            $(this).css('color','var(--red4)')
        })

        /*
            -----------------------
            | search bar function |
            -----------------------
        */ 

        $("#search #bar").on("keyup", function () {
            
            let search_value = $(this).val().toLowerCase().trim();

            $.each($("#dataList .folder"), function (index, data) {

                ($(data).text().toLowerCase().includes(search_value))? $(data).show() : $(data).hide();
            })
        })
    }
})
/* the end */