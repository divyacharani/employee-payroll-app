const formatDate = (date) => {
    let startDate = new Date(date);
    const options = {
        year: 'numeric', month: 'long', day: 'numeric'
    }; 
    const empDate = !startDate ? "undefined" : startDate.toLocaleDateString("en-IN", options);
    return empDate;
}