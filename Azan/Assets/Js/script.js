let cards=document.querySelector(".cards");
let myForm=document.querySelector(".myForm");
let dateInput=document.querySelector("input.date");
let select=document.querySelector("select.form-control");

myForm.addEventListener("submit",async function(e){
    e.preventDefault();
    cards.innerHTML="";
    let dateArray=[];
    let selectYear=dateInput.value.split("-")[0];
    let selectMonth=dateInput.value.split("-")[1];
    let selectDay=dateInput.value.split("-")[2];
    let city=select.options[select.options.selectedIndex].innerText;
    let selectCountry=select.value;
    let resp=await fetch(`http://api.aladhan.com/v1/calendarByCity?city=${city}&country=${selectCountry}&method=2&month=${selectMonth}&year=${selectYear}`);
    let data=await resp.json();
    let datas=data.data;

    datas.forEach(data => {
        if(data.date.gregorian.day>=selectDay){
            let {Fajr,Sunrise,Dhuhr,Asr,Sunset,Maghrib,Isha,Imsak,Midnight}=data.timings;
            dateArray.push(
                {   
                    Info:data.date.readable,
                    Fajr:Fajr,
                    Sunrise:Sunrise,
                    Dhuhr:Dhuhr,
                    Asr:Asr,
                    Sunset:Sunset,
                    Maghrib:Maghrib,
                    Isha:Isha,
                    Imsak:Imsak,
                    Midnight:Midnight
            }
            )
        }
    });
    createCard(dateArray);
}
)
function createCard(array){
    array.map((date)=>{
        cards.innerHTML+=`  <div class="col-3 mt-3 me-3 ">
        <div class="card">
            <ul>
                <li class="date">${date.Info}</li>
                <li>Fajr ${date.Fajr}</li>
                <li>Sunrise ${date.Sunrise}</li>
                <li>Dhuhr ${date.Dhuhr}</li>
                <li>Asr ${date.Asr}</li>
                <li>Sunset ${date.Sunset}</li>
                <li>Maghrib ${date.Maghrib}</li>
                <li>Isha ${date.Isha}</li>
                <li>Imsak ${date.Imsak}</li>
                <li>Midnight ${date.Midnight}</li>
            </ul>
        </div>
    </div>`
    }
    )
}