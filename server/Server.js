import express from 'express';
import cors from 'cors';
// import metrices from './routes/Metrices.js';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import getInstanceIdByIp from '../utils/EC2Utils.js';
import getStartTime from '../utils/TimeUtils.js';

const app = express();
const PORT = 5000


app.use(cors());
app.use(express.json());
// const envPath = path.resolve(__dirname, '../.env');

dotenv.config('.env');

console.log("hiiiiiiiii");

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

const cloudwatch = new AWS.CloudWatch();

app.get('/', async(req,res) =>{
    try {
        const { timePeriod, interval, instanceIp } = req.query;
        const instanceId = await getInstanceIdByIp(instanceIp);
        const {startTime, endTime} = getStartTime(timePeriod);
        
        const params = {
          MetricName: 'CPUUtilization',
          Namespace: 'AWS/EC2',
          Dimensions: [
            {
              Name: 'InstanceId',
              Value: instanceId,
            },
          ],
          StartTime: startTime,
          EndTime: endTime,
          Period: interval,
          Statistics: ['Average'],
          Unit: 'Percent',
        };
        console.log(params)
        const data = await cloudwatch.getMetricStatistics(params).promise();
        res.json(data);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching metrics' });
      }
    });

app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
});

export default app;