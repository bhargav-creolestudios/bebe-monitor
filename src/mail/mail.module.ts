import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { SES } from 'aws-sdk';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailController } from './mail.controller';
import * as path from 'path';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        SES: new SES({
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
          },
          region: 'ap-south-1',
        }),
      },
      template: {
        dir: path.join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
