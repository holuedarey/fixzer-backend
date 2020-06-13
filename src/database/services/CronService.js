/* eslint-disable no-restricted-globals */
/* eslint-disable func-names */
import { Worker } from 'webworker-threads';
import cron from 'node-cron';
import moment from 'moment';
import Logger from '../../helpers/Logger';
import { sendNotification } from '../../socket/admin';
import BookingService from './BookingServices';

/**
* @class Cron Service
* Handle scheduled jobs and all cron related processes
*/
class CronService {

  /**
  * Pushes realtime data to online users
  */
  async realTimeNotificationAdmin() {
    const socketRoom = 'customer';
    

    /** Send real time updates to transaction history */
    try {
      const bookings = new BookingService();
      const data = await bookings.getAllForNotify();
      console.log('data : ', data)
      /** Check if there is active sockets */
    // if (data.length > 4) return;
       sendNotification(socketRoom,  data);
    } catch (err) { Logger.log(err); }

  }

  
  /**
  * Starts the cron jobs in a worker thread
  */
  startCron() {

    const worker = new Worker(function () {
      this.onmessage = function (event) {
        this.postMessage(event);
        // eslint-disable-next-line no-undef
        self.close();
      };
    });
    worker.onmessage = () => {
      // Run same day settlement hourly cron
      cron.schedule('0 * * * *', async () => {
        // try { await this.settlementSameDay(); } catch (error) { Logger.log(error.message); }
      });

     
      // Send real-time records every 45 secs
      cron.schedule('*/45 * * * * *', async () => {
        try { await this.realTimeNotificationAdmin(); } catch (error) { Logger.log(error.message); }
      });


    };
    worker.postMessage({});
  }
}


export default new CronService();
