export interface EmailInfo{
    receiver: string;
    topic: string;
    subject: string;
    name?: string;
    otp?: number;
    token?: string;
    status?: string;
}