export interface EmailInfo{
    receiver: string;
    topic: string;
    subject: string;
    firstName?: string;
    otp?: number;
    token?: string;
}