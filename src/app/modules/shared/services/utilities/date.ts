export function convertToUTC4(date) {
    // Get the current time in milliseconds
    var currentTime = date.getTime();
  
    // Define the UTC+4 offset in milliseconds (4 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    var utc4Offset = 4 * 60 * 60 * 1000;
  
    // Adjust the time by adding the UTC+4 offset
    var utc4Time = new Date(currentTime + utc4Offset);
  
    return utc4Time;

}
  
