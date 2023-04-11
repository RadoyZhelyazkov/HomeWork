import * as validators from './validators.js';

const internsData = JSON.parse(localStorage.getItem('interns'));

var list = document.getElementById('internList');

function deleteInternsData(){
    var dialogDeleteInternsData = document.getElementById("dialogDeleteInternsData");

    dialogDeleteInternsData.style["visibility"] = 'visible';

    var cancelDeleteInternsData = document.getElementById('cancelDeleteInternsData');
    cancelDeleteInternsData.addEventListener('click', () => {
        dialogDeleteInternsData.style['visibility'] = 'hidden';
    });

    var confirmDeleteInternsData = document.getElementById('confirmDeleteInternsData');
    confirmDeleteInternsData.addEventListener('click', () => {
        window.localStorage.removeItem('interns');
        location.reload();
    });
}

function deleteInternData(event){
    var dialogDeleteInternData = document.getElementById("dialogDeleteInternData");

    dialogDeleteInternData.style["visibility"] = 'visible';

    var cancelDeleteInternData = document.getElementById('cancelDeleteInternData');
    cancelDeleteInternData.addEventListener('click', () => {
        dialogDeleteInternData.style['visibility'] = 'hidden';
    });

    var confirmDeleteInternData = document.getElementById('confirmDeleteInternData');
    confirmDeleteInternData.addEventListener('click', () => {
        if(internsData.length > 1){
            internsData.splice(event.target.getAttribute('internid'), 1);
            window.localStorage.setItem('interns', JSON.stringify(internsData));        
        }else{
            window.localStorage.removeItem('interns');
        }
    
        location.reload();
    });
}

function editInternData(event){
    sessionStorage.setItem('internID', event.target.getAttribute('internid'));
    window.location.replace("edit-intern.html");    
}

function listInterns(){
    var tableHeaderArray = ['Intern', 'Telephone', 'Email', 'Start Date', 'End Date', 'Day(s) Left', 'First Task', 'Result', 
                            'Second Task', 'Result', 'Mentor', 'Department', 'Status', 'Action']

    var table = document.createElement('table');
    table.classList.add('sortable');

    var tableHeader = table.createTHead();
    var tableHeaderRow = tableHeader.insertRow(0);

    for (let i = 0; i < tableHeaderArray.length; i++) {
        var tableHeaderCell = document.createElement('th');

        if(tableHeaderArray[i] == 'Action'){
            tableHeaderCell.classList.add('no-sort'); 
            tableHeaderCell.innerHTML = tableHeaderArray[i];
        }else{
            var tableHeaderButton = document.createElement('button');
            tableHeaderButton.innerHTML = tableHeaderArray[i];
    
            var tableHeaderButtonSpan = document.createElement('span');
            tableHeaderButtonSpan.setAttribute('aria-hidden', 'true');
    
            tableHeaderButton.appendChild(tableHeaderButtonSpan);
    
            
            tableHeaderCell.appendChild(tableHeaderButton);
        }

        tableHeaderRow.appendChild(tableHeaderCell);       
    }

    var tableBody = document.createElement('tbody');

    for (let i = 0; i < internsData.length; i++) {
        const tableRow = tableBody.insertRow();

        var interName = tableRow.insertCell();
        interName.appendChild(document.createTextNode(internsData[i].firstName + ' ' + internsData[i].lastName));

        var phone = tableRow.insertCell();
        phone.appendChild(document.createTextNode(internsData[i].phone));

        var email = tableRow.insertCell();
        email.appendChild(document.createTextNode(internsData[i].email));

        var startDate = tableRow.insertCell();
        startDate.appendChild(document.createTextNode(internsData[i].startDate));

        var endDate = tableRow.insertCell();
        endDate.appendChild(document.createTextNode(internsData[i].endDate));

        var daysLeft = tableRow.insertCell(); 
        var daysLeftValue = validators.daysLeft(internsData[i].endDate);

        if(daysLeftValue <= 10){
            daysLeft.classList.add('dng', 'txt-bld');
        }    

        daysLeft.appendChild(document.createTextNode(daysLeftValue + ' (' + validators.daysLeftPercentage(internsData[i].startDate, internsData[i].endDate) + '%)'));

        var firstTask = tableRow.insertCell(); 
        firstTask.appendChild(document.createTextNode(internsData[i].firstTask));

        var firstTaskResult = tableRow.insertCell(); 
        var firstTaskResultValue = internsData[i].firstTaskResult;

        if (firstTaskResultValue != ''){
            firstTaskResultValue = firstTaskResultValue + '%'
        }

        firstTaskResult.appendChild(document.createTextNode(firstTaskResultValue));

        var secondTask = tableRow.insertCell(); 
        secondTask.appendChild(document.createTextNode(internsData[i].secondTask));

        var secondTaskResult = tableRow.insertCell();
        var secondTaskResultValue = internsData[i].secondTaskResult;

        if (secondTaskResultValue != ''){
            secondTaskResultValue = secondTaskResultValue + '%'
        }

        secondTaskResult.appendChild(document.createTextNode(secondTaskResultValue));

        var mentorName = tableRow.insertCell();
        mentorName.appendChild(document.createTextNode(internsData[i].mentorFirstName + ' ' + internsData[i].mentorLastName));

        var department = tableRow.insertCell(); 
        department.appendChild(document.createTextNode(internsData[i].department));

        var internStatus = tableRow.insertCell(); 
        internStatus.appendChild(document.createTextNode(internsData[i].internStatus));

        var action = tableRow.insertCell();
        var actionSpan = document.createElement('span');

        var editIntern = document.createElement('button');
        editIntern.classList.add('btn-edt-crl', 'txt-l-bld');        
        editIntern.innerHTML = '&#9998;'
        editIntern.setAttribute('internid', i);
        editIntern.addEventListener('click', editInternData);
        actionSpan.appendChild(editIntern);

        if(internsData[i].firstTaskResult != '' && internsData[i].secondTaskResult != ''){
            var deleteIntern = document.createElement('button');
            deleteIntern.classList.add('btn-del-crl', 'txt-l-bld');  
            deleteIntern.innerHTML = '&#10006;'
            deleteIntern.setAttribute('internid', i);
            deleteIntern.addEventListener('click', deleteInternData);
            actionSpan.appendChild(deleteIntern);
        }

        action.appendChild(actionSpan);
        action.classList.add('nofill')
    }

    table.appendChild(tableBody);

    list.appendChild(table);
}

function onInit () {
    const interns = window.localStorage.getItem('interns');
    
    var buttons = document.getElementById('manageButtons');

    if (interns == null) {
       var message = document.createElement('p');
       message.innerHTML = "No active interns! Please add intern using the button above!";
       message.classList.add('txt-bld');
       list.appendChild(message);
    } else {
        var buttonDeleteAll = document.createElement('button');
        buttonDeleteAll.className = 'btn txt-l-bld btn-del';
        buttonDeleteAll.innerText = 'Delete All';
        buttonDeleteAll.setAttribute('id', 'deleteAll'); 
        buttons.appendChild(buttonDeleteAll);
        buttonDeleteAll.addEventListener('click', deleteInternsData);
        
        listInterns();
    }

    var buttonAdd = document.createElement('button');
    buttonAdd.className = 'btn btn-cfm txt-l-bld';
    buttonAdd.innerText = 'Add Intern';
    buttons.appendChild(buttonAdd);

    buttonAdd.addEventListener("click", () => {
            window.location.replace("add-intern.html");
        });  
};

onInit();



