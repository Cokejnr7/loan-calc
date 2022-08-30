
document.querySelector("#loan-form").addEventListener('submit',(e)=>{
    document.getElementById('results').style.display = "none";
    document.getElementById('loading').style.display = "block";
    setTimeout(calculateResults,2000);

e.preventDefault();
});

const amount = document.querySelector('#amount');
const interest =  document.querySelector('#interest');
const years =  document.querySelector('#years');
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalinterest = document.querySelector('#total-interest');


function  calculateResults(){
        const principal = parseFloat(amount.value);
        const calculatedInterest = parseFloat(interest.value)/100/12;
        const calculatedPayments = parseFloat(years.value)*12;
        const x = Math.pow(1+calculatedInterest,calculatedPayments);
        const monthly = (principal*x*calculatedInterest)/(x-1);

        if(isFinite(monthly)){
            monthlyPayment.value = monthly.toFixed(2);
            totalPayment.value = (monthly*calculatedPayments).toFixed(2);
            totalinterest.value = ((monthly* calculatedPayments)-principal).toFixed(2);
            document.getElementById('results').style.display = "block";     
        }
        else{
            showError('Please check your numbers');

        }

        document.getElementById('loading').style.display = "none";
    }

function showError(error){
    const errDiv = document.createElement("div");

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errDiv.className = "alert alert-danger";
    errDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errDiv,heading);
    setTimeout(clearError,3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}
