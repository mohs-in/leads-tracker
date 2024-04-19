let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')

let leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})  

tabBtn.addEventListener('click', () => {
    chrome.tabs.query({active:true,currentWindow:true}, tabs => {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })

    
})

delBtn.addEventListener('dblclick', () => {
    localStorage.clear(); 
    myLeads = []
    render(myLeads)
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}
