var button = document.getElementsByTagName('button');

button = document.addEventListener('click', alertMe);

function alertMe() {

    function dayPart () {
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        var midnight = new Date().setHours(00, 00, 00, 00);
        var noon = new Date().setHours(12, 00, 00, 00);
        var evening =  new Date().setHours(18, 00, 00, 00);

        if (currentTime == midnight) {
            return 'midnight';
        }        
        else if (currentTime < noon) {
            return 'morning';
        }        
        else if (currentTime == noon) {
            return 'noon';
        }        
        else if (currentTime < evening) {
            return 'afternoon';
        }        
        else if (currentTime >= evening ) {
            return 'evening';
        }
        else {
            return 'unknown';
        }
    }
    
    var dayPart = dayPart();

    alert('My favourite part of the day is ' + dayPart + '.') ; 
}

// • midnight (exactly 12:00 am)
// • morning (from 12:01 am to 11:59 am)
// • noon (exactly 12:00 pm)
// • afternoon (from 12:01 pm to 6:00 pm)
// • evening (from 6:00 pm to 11:59 pm)