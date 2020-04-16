const convertDate = time => {
    let date = new Date(time);
    return date.toDateString();
};

const convertTime = time => {
    let date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    let timeString;

    if (hours === 0) {
        timeString = ` 12:${minutes}am `;
    } else if (hours === 12) {
        timeString = ` ${hours}:${minutes}pm`;
    } else if (hours > 12) {
        hours = hours % 12
        timeString = ` ${hours}:${minutes}pm`;
    } else {
        timeString = ` ${hours}:${minutes}am`;
    }

    return timeString;
};

export const convertDateTime = time => {
    return `${convertDate(time)} at ${convertTime(time)}`
};