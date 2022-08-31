import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendMail(email: string): Promise<{
        opt: any;
        current_date_time_utc: string;
        message?: undefined;
    } | {
        message: any;
        opt?: undefined;
        current_date_time_utc?: undefined;
    }>;
}
