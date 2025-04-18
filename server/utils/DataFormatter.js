function processCloudWatchDataForChart(cloudWatchData, timePeriod, intervalSeconds) {
  const sortedData =cloudWatchData.sort((a,b) => new Date(a.Timestamp) - new Date(b.Timestamp));
  return sortedData

}
export default processCloudWatchDataForChart;