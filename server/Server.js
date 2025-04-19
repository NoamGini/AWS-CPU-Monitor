import express from 'express';
import cors from 'cors';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import getInstanceIdByIp from './utils/EC2Utils.js';
import getStartTime from './utils/TimeUtils.js';
import processCloudWatchDataForChart from './utils/DataFormatter.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000
dotenv.config({ path: path.resolve(__dirname, './.env') });

app.use(cors());
app.use(express.json());

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

const cloudwatch = new AWS.CloudWatch();

app.get('/metrics', async(req,res) =>{

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

        const data = await cloudwatch.getMetricStatistics(params).promise();
       
        const formattedData = processCloudWatchDataForChart(data.Datapoints, timePeriod, interval)
        res.json(formattedData);
      } catch (err) {
        res.status(500).json({ error: 'Error fetching metrics' });
      }
    });

app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
});

export default app;