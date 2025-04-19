function getStartTime(timePeriod){

    const endTime = new Date();
    const hour = 60 * 60 * 1000;

    const timeMappings = {
    'Last Hour': new Date(endTime.getTime() - hour),
    'Last Day':  new Date(endTime.getTime() - 24 * hour),
    'Last Week':  new Date(endTime.getTime() - 7 * 24 * hour),
    'Last Month': (() => {
      const prevMonth = new Date(endTime);
      prevMonth.setMonth(endTime.getMonth() - 1);
      return prevMonth;
    })(),
    };
   
    const startTime = timeMappings[timePeriod]
    return {startTime, endTime}
}

export default getStartTime