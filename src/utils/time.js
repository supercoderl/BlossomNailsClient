import moment from "moment";

export const getEndTime = (startTime, array) => {
    const [startHour, startMinute, startSecond] = startTime.split(":").map(Number);
    let endHour = startHour;
    let total = 0;
    array.map((data) => {
        total += parseInt(data.periodTime);
    });

    let endMinute = startMinute + total;
    while (endMinute >= 60) {
        endHour++;
        endMinute -= 60;
    }
    return `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}:${startSecond.toString().padStart(2, "0")}`;
}

export const combineDateTime = (dateString, timeString) => {
    if(!dateString || !timeString) return new Date();
    // Convert string to Date object
    let date = new Date(dateString);
    
    // Split hours, minutes, seconds from time
    let timeParts = timeString.split(':');
    let hours = parseInt(timeParts[0], 10);
    let minutes = parseInt(timeParts[1], 10);
    let seconds = parseInt(timeParts[2], 10);
    
    // Config hours, minutes, seconds for Date object
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
}

export const dateFormatter = (date, format) => {
    return date ? moment(date).format(format || "DD/MM/YYYY") : "N/A";
}