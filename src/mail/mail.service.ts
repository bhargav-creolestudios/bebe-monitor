import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as otpGenerator from 'otp-generator';
import * as moment from 'moment';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string) {
    try {
      const otpNumber = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      await this.mailerService.sendMail({
        from: 'bebe@creole.tech',
        to: email,
        subject: 'OTP',
        template: './otp-content',
        context: {
          OTP: otpNumber,
        },
      });

      const currentDateTimeInUTC = moment.utc().format();
      //   response
      return {
        opt: otpNumber,
        current_date_time_utc: currentDateTimeInUTC,
      };
    } catch (error) {
      return { message: error.message };
    }
  }
}
