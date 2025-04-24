function maskPassword(pass) {
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str += "*"
    }
    return str
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            /* clipboard successfully set */
            document.getElementById("alert").style.display = "inline"
            setTimeout(() => {
                document.getElementById("alert").style.display = "none"
            }, 2000);

        },
        () => {
            /* clipboard write failed */
            alert("Clipboard copying failed")
        },
    );
}

// logic to fill the table 

const deletePassword = (website) => {
        console.log("website",website);
        
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data)
    console.log("arr",arr);
    
    arrUpdated = arr?.filter((item) => {
        return item.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert(`Successfully Delete ${website}'s password`)
    showPasswords()
}

const showPasswords = () => {

    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    console.log("data:::",typeof data);

    if (data === "undefined") {
        tb.innerHTML = "No Data To Show "
    }
    else {
        tb.innerHTML = ` <tr>
                <th>Website</th>
                <th>UserName</th>
                <th>Password</th>
                <th>Delete</th>
            </tr>`
        let arr = JSON.parse(data)
        let str = ""
        for (let index = 0; index < arr?.length; index++) {
            const element = arr[index];



            str += `<tr>
    <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
        </tr>`
        }
        tb.innerHTML = tb.innerHTML + str
    }
    website.value = ""
    username.value = ""
    password.value = ""
}

showPasswords()

// Add Password In Localstorage By Event Listener
 
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()
    console.log(username.value, password.value);
    let passwords = localStorage.getItem("passwords")
    console.log(passwords);
    if (passwords === "undefined") {
        let json = []
        json.push({ website: website.value, username: username.value, password: password.value })
        alert("passwor saved")
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ website: website.value, username: username.value, password: password.value })
        alert("passwor saved")
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showPasswords()
})
