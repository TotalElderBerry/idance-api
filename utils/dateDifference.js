function formatDate(date){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return mm + '/' + dd + '/' + yyyy;
}

function differenceOfDaysBetweenDates(date1, date2) {
    const formattedDate1 = new Date(date1)
    const formattedDate2 = new Date(date2)
    const diffTime = (formattedDate2 - formattedDate1)
    const diffDays = Math.ceil(diffTime / (1000*60*60*24))
    return diffDays
}

module.exports = {differenceOfDaysBetweenDates, formatDate}