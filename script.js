(function(){

    'use strict';

    const pageTitle = document.querySelector('#pageTitle');

    const detailsForm = document.querySelector('#detailsForm');

    detailsForm.addEventListener('submit', sendForm); // send form details

    const allInputs = detailsForm.querySelectorAll('input');

    const btnDiv = detailsForm.querySelector('#btnDiv'); // form div buttons

    const btnCancel = detailsForm.querySelectorAll('button')[0]; // button cancel
    const btnSave = detailsForm.querySelectorAll('button')[1]; // button save

    btnSave.addEventListener('click', confirmationPage); // form event sumbit

    // create button - edit
    const editBtn = document.createElement("button");
    editBtn.innerHTML = 'Edytuj';
    editBtn.className = 'button cancel';
    editBtn.addEventListener("click", editDetails);

    // create button - confirmation
    const confirmBtn = document.createElement("button");
    confirmBtn.innerHTML = "Potwierdzam";
    confirmBtn.type = "submit";
    confirmBtn.className = "button save";


    function confirmationPage(event){
        event.preventDefault();

        let empty = 0; // empty input

        const statusCheckAlls = document.getElementsByName('status');

        for (let i = 0, length = statusCheckAlls.length; i < length; i++) {
            if (statusCheckAlls[i].checked) {
                
                var radioChecked = statusCheckAlls[i].value;

                break;
            }
        }

        // check radio then elements: pesel and name if empty
        if(radioChecked == 0){

            const nameCheck = document.getElementById("name");
            const peselCheck = document.getElementById("pesel");
            
            if(!nameCheck.value){

                nameCheck.classList.add("invalid"); 
                empty = 1;

            } else { nameCheck.classList.add("valid"); }

            if(!peselCheck.value){

                peselCheck.classList.add("invalid");  
                empty = 1;

            } else { peselCheck.classList.add("valid"); }        
            
        }

        // check raadio then elements: nip and company if empty
        if(radioChecked == 1){

            const companyCheck = document.getElementById("company");
            const nipCheck = document.getElementById("nip");
            
            if(!companyCheck.value){

                companyCheck.classList.add("invalid"); 
                empty = 1;

            } else { companyCheck.classList.add("valid"); }

            if(!nipCheck.value){

                nipCheck.classList.add("invalid"); 
                empty = 1;

            } else { nipCheck.classList.add("valid"); }        
            
        }



        const checkAll = detailsForm.querySelectorAll('input');
        // check values other than fullname, company, pesel, nip
        for(let x = 4; x < checkAll.length-2; x++){
            if (!checkAll[x].value) {

                empty = 1;
                checkAll[x].classList.add("invalid");

            }                
            else {
                checkAll[x].classList.add("valid");               
            }
        }

        const showError = document.querySelector('.nameError');
        showError.innerHTML = "Wypelnij wszystkie wymagane pola!";
        showError.style.display = 'block';


        if(empty == 0) {

            pageTitle.innerHTML = 'Potwierdz swoje dane';
            showError.style.display = 'none';

            for(let i = 0; i < allInputs.length; i++){
    

                allInputs[i].setAttribute('disabled', '');
                
            }
    
            let inputCounty = document.getElementById('county').setAttribute('disabled', '');
    
    
            btnDiv.appendChild(editBtn);
            btnDiv.appendChild(confirmBtn);
    
            btnSave.remove();
            btnCancel.remove();


        }

    }


    function editDetails(event){

        event.preventDefault();

        pageTitle.innerHTML = 'Dane identyfikacyjne';

        btnDiv.appendChild(btnCancel);      
        btnDiv.appendChild(btnSave);

        editBtn.remove();
        confirmBtn.remove();

        for(let i = 0; i < allInputs.length; i++){

            allInputs[i].removeAttribute('disabled', '');
            
        }

        const inputCounty = document.getElementById('county').removeAttribute('disabled', '');

    }

    function sendForm(event){
        event.preventDefault();

        const xStatus  = event.target.elements['status'];
        const status = event.target.elements['status'].value;
        const name = event.target.elements['name'].value;
        const company = event.target.elements['company'].value;
        const address = event.target.elements['address'].value;
        const nr_address = event.target.elements['nr_address'].value;
        const city = event.target.elements['city'].value;
        const postcode = event.target.elements['postcode'].value;
        const county = event.target.elements['county'].value;
        const prefix_mobile = event.target.elements['prefix_mobile'].value;
        const mobile = event.target.elements['mobile'].value;
        const email = event.target.elements['email'].value;
        const pesel = event.target.elements['pesel'].value;
        const nip = event.target.elements['nip'].value;

        const sentForm = sentFormDetails(status, name, company, address, nr_address, city, postcode, county, prefix_mobile, mobile, email, pesel, nip);
    }

    function sentFormDetails(status, name, company, address, nr_address, city, postcode, county, prefix_mobile, mobile, email, pesel, nip){

        pageTitle.innerHTML = 'Dziekujemy!';

        let tekst = `<div style="text-align: center; margin: 20px;">Dziekujemy <b>${name}</b> za rejestracje w naszym systemie! Zapraszamy do korzystania z naszych uslug. `;

        if(email){

            tekst += `Na Twoj adres <b>${email}</b> zostana przeslane dodatkowe informacje.`;

        }

        tekst += `</div>`;

        tekst += `<div style="text-align: center; margin: 20px;"> <b>status:</b> ${status}  <br /> <b>Imie i nazwisko:</b> ${name} <br /> <b>Firma:</b> ${company} <br /> <b>Adres:</b> ${address} <br /> <b>Nr domu:</b> ${nr_address} 
        <br /> <b>Miasto:</b> ${city} <br /> <b>Kod pocztowy:</b> ${postcode} <br /> <b>Wojewodztwo:</b> ${county} <br /> <b>Kierunkowy:</b> ${prefix_mobile} <br /> <b>Telefon:</b> ${mobile} <br />
        <b>Email:</b> ${email} <br /> <b>Pesel:</b> ${pesel} <br /> <b>Nip:</b> ${nip} </div>`;


        const mainSection = document.getElementById('mainPage');
        mainSection.innerHTML = tekst;

    }

    // hide selected inputs
    const contact = document.querySelectorAll('input[name="status"]');
    // or '.your_radio_class_name'

    for (let i = 0; i < contact.length; i++) {
        contact[i].addEventListener("change", function() {
                let val = this.value; // this == the clicked radio,

                const hidden = document.querySelectorAll('#display_status'); 

                if(val == 1 ) { 
                    
                    for (let i = 0; i < hidden.length; i++){
                        hidden[i].style.display = 'block';
                        hidden[0].style.display = 'none';  // input fullname
                        hidden[2].style.display = 'none';  // input pesel
                    } 
                }
                else { 

                    for (let i = 0; i < hidden.length; i++){
                        hidden[i].style.display = 'none';
                        hidden[0].style.display = 'block'; // input fullname
                        hidden[2].style.display = 'block'; // input pesel
                    }
                }

        });
    }

    // read endpoint county list
    $.ajax({
        url: "https://dro.nazwa.pl/api/public/",
        dataType: "json" //html, json, text, xml, jsonp, script
    })

    .done(res => {
    
        for (let i = 0; i < res.length; i++){

            $("#county").append("<option value='" + res[i] + "'>" + res[i] + "</option>");
            
        }
    });



})();