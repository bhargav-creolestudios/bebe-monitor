import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/')
  sendMail(@Body('email') email: string) {
    return this.mailService.sendMail(email);
  }
}
