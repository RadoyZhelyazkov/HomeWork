export function isLetterInput(event) {
    if (!/['a-zA-z]/i.test(event.key) & event.key != 'Backspace' & event.key != ' '){
        return event.returnValue = false;
    }
};

export function isNumericInput(event) {
    if (!/['+0-9]/i.test(event.key) & event.key != 'Backspace' & event.key != 'Delete' & event.key != 'ArrowLeft' & event.key != 'ArrowRight' & event.key != 'Tab'){
       return event.returnValue = false;
    }
};

export function daysLeft(endDate) {
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

export function daysLeftPercentage (startDate, endDate) {
    let daysLeftPercentage = '';

    if(startDate != '' && endDate != '') {
        var inputStartDate = new Date(startDate);
        var inputEndDate = new Date(endDate);
        
        let differenceTotal = inputEndDate.getTime() - inputStartDate.getTime();
        var daysTotal = Math.ceil(differenceTotal / (1000 * 3600 * 24));
        if(daysTotal == 0) {
           daysTotal = 1;
        }
        
        var daysLeftNumber = daysLeft(endDate);

        daysLeftPercentage = (((daysLeftNumber/(daysTotal))) * 100).toFixed(2);
    }

    return daysLeftPercentage;
}