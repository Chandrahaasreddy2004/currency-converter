let s = document.querySelectorAll(".select-container select")

let URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


for (let each_select of s)
{
    for(let country in countryList)
    {
        let cs=document.createElement("option");
        cs.innerText=country;
        cs.value =country;
        each_select.append(cs);
        if (each_select.name==="from" && country==="USD")
        {
            document.querySelector(".from img").setAttribute("src","https://flagsapi.com/US/flat/64.png") 
           cs.selected='selected';
        } 
        if (each_select.name==="to" && country==="INR")
        {
           document.querySelector(".to img").setAttribute("src","https://flagsapi.com/IN/flat/64.png") 
           cs.selected='selected';
        }
    }
    each_select.addEventListener("change",(event)=>{
        check = event.target.name;
        countryCode = countryList[event.target.value];
        if (check==="to")
        {
            document.querySelector(".to img").setAttribute("src",`https://flagsapi.com/${countryCode}/flat/64.png`) 
        }
        if (check==="from")
        {
            document.querySelector(".from img").setAttribute("src",`https://flagsapi.com/${countryCode}/flat/64.png`) 
        }
    })
}

//BUTTON

let b = document.getElementsByTagName("button")[0];
b.addEventListener("click",(event)=>{
    event.preventDefault(); 
    let amt = document.getElementById("amount");
    if ((amt.value==="")||(amt.value<1))
    {
        amt.value=1;
    }
    let from_c=document.querySelector(".from select");
    let to_c=document.querySelector(".to select");
    
    //URL
    const url_money =`${URL}/${from_c.value.toLowerCase()}/${to_c.value.toLowerCase()}.json`;
    total_money = fetch(url_money);
    total_money.then((val)=>{
        val.json().then((money)=>{
            to_access=to_c.value.toLowerCase();
            let total_money = amt.value*money[to_access];
            let print = document.querySelector(".msg p");
            print.innerText=`${amt.value} ${from_c.value} = ${total_money} ${to_c.value}`

        })
    })
})
