/*
-   myData ""
-   developer   : https://mayankdevil.github.io/MayankDevil
-   JavaScript  : ./src/js/analysis.js
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
        }
        accountStatus()

        /*
            -------------------------------------------------------------
            | analyze function parama data or return data_set as object |
            -------------------------------------------------------------
        */
        
        /* analyze techstack function */
        
        function analyzeTechStack(data) 
        {    
            const data_set = {}
        
            data.forEach((item) => {

                if (Array.isArray(item.techStack)) 
                {
                    item.techStack.forEach((element) => {

                        data_set[element] = (data_set[element] || 0) + 1
                    })
                }
            })
            return data_set
        }

        /* analyze status function */

        function analyzeStatus(data)
        {
            const data_set = {}

            data.forEach((element) => {

                const status = element.status

                data_set[status] = (data_set[status] || 0) + 1
            })
            return data_set
        }

        /* analyze public function */

        function analyzePublic(data) 
        {
            return data.reduce((count, element) => {
                count + (!element.isPrivate ? 1 : 0)
            }, 0)
        }
        analyzePublic(activeAccount.data)
        
        // array.reduce((accumulator, currentItem) => { /* do something with currentItem */ return updatedAccumulator; }, initialValue) 

        $("#totalWork .lead").text(`number count : ${activeAccount.data.length}`)

        
        function experience(data, element)
        {
            element.html(`<h6 class='lead'> experience </h6>`)
            
            data.map((data_element) => {
                
                element.append(`<div class='work_box'>
                    <div class="group"> 
                        <h4> ${data_element.company} </h4> 
                        <span class="pipe"> | </span> 
                        <h6> ${data_element.time} <h6> 
                    </div>
                    <div> <a href="${data_element.website}" class="link"> <span class="bi bi-link"></span>  ${data_element.website} </a> </div>
                    <div>
                        <h2> ${data_element.position} </h2>
                        <p> ${data_element.description} </p>
                    </div>
                </div>`)
            })
            element.append(`<a href="${activeAccount.gitHub}" class='btn-outline'> <span class="bi bi-github    "></span> GitHub </a>`)
        }
        experience(activeAccount.experience, $("#experience"))

        /* workStatus() : parama data to target return status tag */

        function workStatus(data, target)
        {
            target.html(`<h6 class='lead'> status </h6>`)

            let data_status = ''

            $.each(data, function (key, value) {

                data_status += `<div class="status">
                    <div class="value"> ${value} </div>
                    <div class="key"> ${key}  </div>
                </div>`
            })
            target.append(`<div> ${data_status} </div>`)
        }
        workStatus(analyzeStatus(activeAccount.data), $("#workStatus"))

        
        /* insertChart() : parama data to target chart return bar */
        
        function insertChart(data, chart)
        {
            chart.html(`<h6 class='lead'> tech stack </h6>`)

            $.each(data, function (key, value) {

                let progress = ''

                for (let i = 0; i < value; i++)
                {
                    progress += `<div class="progress"></div>`
                }                                
                chart.append(`<div class="bar">
                    <div class="legend">
                        <div class="pill"> ${value} </div> ${key} 
                    </div> ${progress} 
                </div> `)
            })
        }
        insertChart(analyzeTechStack(activeAccount.data), $('#barChart'))   
    }
})
/* the end */