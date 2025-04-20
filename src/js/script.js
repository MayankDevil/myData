/*
-   myData ""
-   developer   : https://mayankdevil.github.io/MayankDevil
-   JavaScript  : ./src/js/script.js
*/
try
{
	$(document).ready(function () {

		let username = $("#username")
			
		let password = $("#password")

		let login_status = $("#status")

		$("#login_btn").click(async function() {

			if (username.val() && password.val())
			{
				getAdminData(username.val()).then((account) => {

					if(account.password === password.val())
					{
						localStorage.clear()

						/* active account local */

						localStorage.setItem('activeAccount',JSON.stringify({
							username : account.username,
							profile : account.profile,
							gitHub : account.gitHub,
							portfolio : account.portfolio,
							experience : account.experience,
							data : account.data
						}))
						
						account = null // secure

						localStorage.setItem(`isSecure`,true)

						console.log(`[account] : active!`)
						
						if (localStorage.length != 0)
						{
							window.open('src/app.html','_self',true)
						}
					}
					else
					{
						login_status.addClass("unvalid").text(`Unvalid Password!`) || console.log(`(login account password) : unvalid!`)
					}

				}).catch((error) => {

					login_status.addClass("unvalid").text(`Unvalid Username!`) || console.log(`(login account username) : unvalid! ${error}`)
				})
			}
			else	
			{
				login_status.addClass("unvalid").text(`Empty input field!`) || console.log(`(input field) : is Empty`)
			}
		})
	})
}
catch (error)
{
    console.error(error.message)
}
/*  */