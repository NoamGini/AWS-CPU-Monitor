import AWS from 'aws-sdk'

async function getInstanceIdByIp(ipAddress) {
   const EC2 = new AWS.EC2();  
   console.log('the ip is', ipAddress)
   var params = {
      Filters: [
         {
         Name: 'private-ip-address', 
         Values: [
            ipAddress
         ]
      }
      ]
   };

    const data = await EC2.describeInstances(params).promise();
  
    const instance = data.Reservations?.[0]?.Instances?.[0];

    if (!instance) {
       console.log(`No instance found for IP: ${ipAddress}`);
    }

    return instance.InstanceId;
   
}

export default getInstanceIdByIp