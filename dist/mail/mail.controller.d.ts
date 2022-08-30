import { MailService } from './mail.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
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
