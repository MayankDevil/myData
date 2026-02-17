
$(document).ready(function () {

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
    // activeSection(section.length - 1) // default active section
    activeSection(0) // default active section

    /*
        --------------------
        | nav bar function |
        --------------------
    */ 

    let isNavActive = true

    $("#nav_btn").on('click', function () {
        
        if (isNavActive) {
            
            $("#sidebar").hide()
            $("#root .row").css("grid-template-columns","auto")

        } else {

            
            $("#root .row").css("grid-template-columns","2fr 8fr")
            $("#sidebar").show()
        }
        isNavActive = !isNavActive
    })
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

    /* private button on click function */

    let isActive = false

    $("#private_btn").on('click', function () {

        let element = $(this)

        let child = element.find('span')

        if (isActive) {
            
            element.css('color', 'var(--dark5)')
            element.html(`<span class="bi bi-shield"></span> is Private`)

            $("#dataList .folder").each(function (index, data) {

                if (data.innerHTML.includes('bi-folder')) {
                    
                    $(data).show()
                } 
            })

        } else {
        
            $("#dataList .folder").each(function (index, data) {

                (data.innerHTML.includes('bi-folder-fill'))? $(data).show() : $(data).hide();
            })
            
            element.css('color', 'var(--red0)')
            element.html(`<span class="bi bi-shield-check"></span> is Private`)
        }
        isActive = !isActive
    })

})