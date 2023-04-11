const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

var firstName = document.getElementById('firstName');
firstName.addEventListener('keydown', validatorIsLetterInput);

var lastName = document.getElementById('lastName');
lastName.addEventListener('keydown', validatorIsLetterInput);

var phone = document.getElementById('phone');
phone.addEventListener('keydown', validatorIsNumericInput);

var email = document.getElementById('email');

var startDate = document.getElementById('startDate');
startDate.addEventListener('change', daysLeftNumber);

var endDate = document.getElementById('endDate');
endDate.addEventListener('change', daysLeftNumber);

var daysLeft = document.getElementById('daysLeft');

var firstTask = document.getElementById('firstTask');
firstTask.addEventListener('change', taskChange);

var secondTask = document.getElementById('secondTask');
secondTask.addEventListener('change', taskChange);

var firstTaskResult = document.getElementById('firstTaskResult');
firstTaskResult.addEventListener('change', internAssessment)

var secondTaskResult = document.getElementById('secondTaskResult');
secondTaskResult.addEventListener('change', internAssessment)

var mentorFirstName = document.getElementById('mentorFirstName');
mentorFirstName.addEventListener('keydown', validatorIsLetterInput);

var mentorLastName = document.getElementById('mentorLastName');
mentorLastName.addEventListener('keydown', validatorIsLetterInput);

var department = document.getElementById('department');
department.addEventListener('change', departmentChange)

var internStatus = document.getElementById('internStatus');

var buttonBack = document.getElementById('buttonBack');

buttonBack.addEventListener("click", () => {
    window.location.replace("index.html");
});  

function daysLeftNumber() {
    var daysLeftNumber = validatorDaysLeft(endDate.value);
    var daysLeftPercentage = validatorDaysLeftPercentage(startDate.value, endDate.value);

    if(daysLeftNumber <=10){
        daysLeft.classList.add('dng');
    }else{
        daysLeft.classList.remove('dng');
    }

    daysLeft.innerHTML = daysLeftNumber + ' (' + daysLeftPercentage.toString() + '%)';
};

function taskChange(event) {
    if(event.target.id == "firstTask"){
        for (let i = 1; i < secondTask.length; i++) {
            if(secondTask[i].value == event.target.value){
                secondTask[i].setAttribute('hidden', 'true');
            }
            else{
                secondTask[i].removeAttribute('hidden');
            }            
        }

        if(firstTaskResult.disabled || secondTask.disabled) {
            firstTaskResult.disabled = false;
            secondTask.disabled = false;
        }else{
            firstTaskResult.value = firstTaskResult[0].value;
        }
    }else{
        for (let i = 1; i < firstTask.length; i++) {
            if(firstTask[i].value == event.target.value){
                firstTask[i].setAttribute('hidden', 'true');
            }
            else{
                firstTask[i].removeAttribute('hidden');
            }            
        }

        if(secondTaskResult.disabled) {
            secondTaskResult.disabled = false;
        }else{
            secondTaskResult.value = secondTaskResult[0].value;
        }
    }
}

function tasksList(element) {
    for (let i = 1; i <= 5; i++) {
        var taskOption = document.createElement('option');
        taskOption.innerHTML = 'Task ' + i;
        taskOption.value = 'Task ' + i;
        element.appendChild(taskOption);    
    }    
}

function resultsList(element) {
    for (let i = 0; i <= 100; i++) {
        var taskOption = document.createElement('option');
        taskOption.innerHTML = i + '%';
        taskOption.value = i;
        element.appendChild(taskOption);    
    }
}

function internAssessment() {
    if(firstTaskResult.value == '' || secondTaskResult.value == ''){
        department.disabled = true;
        department.value = department[0].value;
        internStatus.innerHTML = '';
        internStatus.classList.remove('dng', 'scs');
    }else if(firstTaskResult.value >= 50 && secondTaskResult.value >= 50){
        department.disabled = false;  
        internStatus.innerHTML = 'Passed';
        internStatus.classList.remove('dng');  
        internStatus.classList.add('scs');      
    }else if(firstTaskResult.value < 50 || secondTaskResult.value < 50){
        internStatus.innerHTML = 'Failed'; 
        internStatus.classList.remove('scs');  
        internStatus.classList.add('dng');
    } 
}

function departmentChange() {
    internAssessment();
    
    if(department.value != ''){
        internStatus.innerHTML += '. Moved to ' + department.value + ' department.';
    }
}

function submitForm(event) {
    var interns = window.localStorage.getItem('interns');
    var internsData = '';
    
    event.preventDefault();
  
    const data = new FormData(event.target);

    if(data.get('internStatus') == null){
        data.set('internStatus', '');
    }

    if(data.get('department') == null){
        data.set('department', '');
    }
    
    if(interns != null) {
        const dataTest = JSON.parse(localStorage.getItem('interns'));

        var nameChecked = dataTest.filter(a => (a.firstName + a.lastName) == (data.get('firstName')) + data.get('lastName'));
        var emailChecked = dataTest.filter(a => a.email == data.get('email'));
    
        if (emailChecked.length > 0 || nameChecked.length > 0){
            var errorMessage = document.getElementById('errorMessage');
            var message = ''

            if (nameChecked.length > 0){
                message = document.createElement('p');
                message.innerHTML = 'There is already an intern with these names!';
                errorMessage.appendChild(message);
            }
    
            if (emailChecked.length > 0){
                message = document.createElement('p');
                message.innerHTML ='There is already an intern with this email address!';
                errorMessage.appendChild(message);
            }
        
            var dialog = document.getElementById("errorDialog");
    
            dialog.style["visibility"] = 'visible';
    
            var closeError = document.getElementById('closeError');
            closeError.addEventListener('click', () => {
                while (errorMessage.firstChild) {
                    errorMessage.removeChild(errorMessage.firstChild);
                }
                
                if (nameChecked.length > 0){
                    firstName.focus();
                }else{
                    email.focus();
                }

                dialog.style['visibility'] = 'hidden';
            });
                
            return
        }
    }

    var internStatusData = '';
    
    if(data.get('firstTaskResult') == '' && data.get('secondTaskResult') == ''){
        internStatusData = '';
    }else if(data.get('firstTaskResult') >= 50 && data.get('secondTaskResult') >= 50){
        internStatusData = 'Passed'; 
    }else if(data.get('firstTaskResult') < 50 || data.get('secondTaskResult') < 50){
        internStatusData = 'Failed'; 
    }    

    var intern = '{"firstName":"' + data.get('firstName') +
                    '","lastName":"' + data.get('lastName') + 
                    '","phone":"' + data.get('phone') +
                    '","email":"' + data.get('email') +
                    '","startDate":"' + data.get('startDate') +
                    '","endDate":"' + data.get('endDate') +
                    '","daysLeft":"",' +
                    '"firstTask":"' + data.get('firstTask') +
                    '","firstTaskResult":"' + data.get('firstTaskResult') +
                    '","secondTask":"' + data.get('secondTask') +
                    '","secondTaskResult":"' + data.get('secondTaskResult') +
                    '","mentorFirstName":"' + data.get('mentorFirstName') +
                    '","mentorLastName":"' + data.get('mentorLastName') +
                    '","department":"' + data.get('department') +
                    '","internStatus":"' + internStatusData +
                  '"}';

    
    if (interns == null) {
        internsData = '[' + intern + ']';   

        window.localStorage.setItem('interns', JSON.stringify(JSON.parse(internsData)));     
    }else{
        internsData = JSON.parse(interns);

        internsData[internsData.length] = JSON.parse(intern);

        window.localStorage.setItem('interns', JSON.stringify(internsData));
    }
    
    window.location.replace("index.html");    
}


function onInit () {
    tasksList(firstTask);
    tasksList(secondTask);
    resultsList(firstTaskResult);
    resultsList(secondTaskResult);
}

onInit();

function validatorIsLetterInput(event) {
    if (!/['a-zA-z]/i.test(event.key) & event.key != 'Backspace' & event.key != ' '){
        return event.returnValue = false;
    }
};

function validatorIsNumericInput(event) {
    if (!/['+0-9]/i.test(event.key) & event.key != 'Backspace' & event.key != 'Delete' & event.key != 'ArrowLeft' & event.key != 'ArrowRight' & event.key != 'Tab'){
       return event.returnValue = false;
    }
};

function validatorDaysLeft(endDate) {
    let daysLeft = 0;

    if(endDate != '') {
        var currentDate = new Date();
        var inputEndDate = new Date(endDate);

        let difference = inputEndDate.getTime() - currentDate.getTime();
        daysLeft = Math.ceil(difference / (1000 * 3600 * 24));
    }

    if(daysLeft < 0){
        daysLeft = 0;
    }

    return daysLeft;
}

function validatorDaysLeftPercentage (startDate, endDate) {
    let daysLeftPercentage = '';

    if(startDate != '' && endDate != '') {
        var inputStartDate = new Date(startDate);
        var inputEndDate = new Date(endDate);
        
        let differenceTotal = inputEndDate.getTime() - inputStartDate.getTime();
        var daysTotal = Math.ceil(differenceTotal / (1000 * 3600 * 24));
        if(daysTotal == 0) {
           daysTotal = 1;
        }
        
        var daysLeftNumber = validatorDaysLeft(endDate);

        daysLeftPercentage = (((daysLeftNumber/(daysTotal))) * 100).toFixed(2);
    }

    return daysLeftPercentage;
}
