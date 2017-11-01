
function timestamp_to_date(event) {
    let timestamp = event.getTimestamp();
    let date = new Date(
        timestamp.getSeconds() * 1000  
        + timestamp.getNanos() / 1000
    );


    return date;
}


export default timestamp_to_date;