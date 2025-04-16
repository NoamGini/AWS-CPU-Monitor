// import getInstanceIdByIp from './utils/EC2Utils.js';
// import getStartTime from './utils/TimeUtils.js';
// import express from 'express';
// import AWS from 'aws-sdk';
// import dotenv from 'dotenv';
// import path from 'path';

// const router = express.Router();
// const envPath = path.resolve(__dirname, '../.env');

// dotenv.config({path : envPath});

// console.log("hiiiiiiiii")

// AWS.config.update({
//     region: process.env.AWS_REGION,
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//   });

// const cloudwatch = new AWS.CloudWatch();

// router.get('/', async(req,res) =>{
//     try {
//         const { timePeriod, interval, instanceIp } = req.query;
//         const instanceId = await getInstanceIdByIp(instanceIp);
//         const {startTime, endTime} = getStartTime(timePeriod);
        
//         const params = {
//           MetricName: 'CPUUtilization',
//           Namespace: 'AWS/EC2',
//           Dimensions: [
//             {
//               Name: 'InstanceId',
//               Value: instanceId,
//             },
//           ],
//           StartTime: startTime,
//           EndTime: endTime,
//           Period: interval,
//           Statistics: ['Average'],
//           Unit: 'Percent',
//         };
//         console.log(params)
//         const data = await cloudwatch.getMetricStatistics(params).promise();
//         res.json(data);
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error fetching metrics' });
//       }
//     });
// export default router;