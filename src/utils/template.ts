import { EmailInfo } from "../types";

export const mailTemplates = {
    getTemplate(input: EmailInfo) {
        switch (input.topic) {
            case 'VERIFY_EMAIL':
                return `
                    <!DOCTYPE html>
                    <html>
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome to Your New Store</title>
                    <style>
                        body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                        }
                        .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                        text-align: center;
                        padding: 10px 0;
                        background-color: #007bff;
                        color: #ffffff;
                        border-radius: 5px 5px 0 0;
                        }
                        .content {
                        padding: 20px;
                        }
                        .button {
                        display: inline-block;
                        padding: 10px 20px;
                        margin: 20px 0;
                        background-color: #007bff; /* Blue background */
                        color: #ffffff !important; /* White text, !important to override any link styles */
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                        }
                        .button:hover {
                        background-color: #0056b3; /* Darker blue on hover */
                        color: #ffffff !important;
                        }
                        .footer {
                        text-align: center;
                        font-size: 12px;
                        color: #777;
                        padding: 10px 0;
                        border-top: 1px solid #eee;
                        }
                        a {
                        color: #007bff;
                        text-decoration: none;
                        }
                        a:hover {
                        text-decoration: underline;
                        }
                    </style>
                    </head>
                    <body>
                    <div class="container">
                        <div class="header">
                        <h1>Welcome to your new store!</h1>
                        </div>
                        <div class="content">
                        <p>Dear ${input.name},</p>
                        <p>Welcome ${input.name}.</p>
                        <p>To get started, please reset your account password by clicking the link below:</p>
                        <p style="text-align: center;">
                             <p><a href="http://localhost:3000/verifyemail/token=${input.token}">click here to conform</a></p>
                        </p>
                        <p>For security purposes, this link will expire in 7 days. If you did not initiate this request, please contact our support team immediately.</p>
                        <p>Thank you for choosing our platform. We look forward to supporting you as your store grows and succeeds.</p>
                        <p>Best regards,<br>TrekMate</p>
                        </div>
                        <div class="footer">
                        <p>This is an automated message. Please do not reply directly to this email.</p>
                    </div>
                    </body>
                    </html>
                `
                case 'FORGOT_PASSWORD':
                    return `
                        <!DOCTYPE html>
                        <html>
                        <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Password Reset Request</title>
                        <style>
                            body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                            }
                            .container {
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 5px;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                            text-align: center;
                            padding: 10px 0;
                            background-color: #007bff; /* Blue background */
                            color: #ffffff;
                            border-radius: 5px 5px 0 0;
                            }
                            .content {
                            padding: 20px;
                            }
                            .button {
                            display: inline-block;
                            padding: 10px 20px;
                            margin: 20px 0;
                            background-color: #007bff; /* Blue background */
                            color: #ffffff !important; /* White text, !important to override link styles */
                            text-decoration: none;
                            border-radius: 5px;
                            font-weight: bold;
                            }
                            .button:hover {
                            background-color: #0056b3; /* Darker blue on hover */
                            color: #ffffff !important;
                            }
                            .footer {
                            text-align: center;
                            font-size: 12px;
                            color: #777;
                            padding: 10px 0;
                            border-top: 1px solid #eee;
                            }
                            a {
                            color: #007bff;
                            text-decoration: none;
                            }
                            a:hover {
                            text-decoration: underline;
                            }
                        </style>
                        </head>
                        <body>
                        <div class="container">
                            <div class="header">
                            <h1>Password Reset Request</h1>
                            </div>
                            <div class="content">
                            <p>Dear ${input.name},</p>
                            <p>We have received a request to reset the password associated with your account. To continue, please enter this OTP in the asked paged:</p>
                            <p style="text-align: center;">
                                 ${input.otp}
                            </p>
                            <p>Please note that for security purposes, this link will expire in 2 minute. If you did not initiate this request, kindly ignore this email.</p>
                            <p>Sincerely,<br>TrekMate</p>
                            </div>
                        </div>
                        </body>
                        </html>
                    `
            case 'BOOKING_CONFIRMATION':
                return `
                    <!DOCTYPE html>
                    <html>
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome to Your New Store</title>
                    <style>
                        body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                        }
                        .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                        text-align: center;
                        padding: 10px 0;
                        background-color: #007bff;
                        color: #ffffff;
                        border-radius: 5px 5px 0 0;
                        }
                        .content {
                        padding: 20px;
                        }
                        .button {
                        display: inline-block;
                        padding: 10px 20px;
                        margin: 20px 0;
                        background-color: #007bff; /* Blue background */
                        color: #ffffff !important; /* White text, !important to override any link styles */
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                        }
                        .button:hover {
                        background-color: #0056b3; /* Darker blue on hover */
                        color: #ffffff !important;
                        }
                        .footer {
                        text-align: center;
                        font-size: 12px;
                        color: #777;
                        padding: 10px 0;
                        border-top: 1px solid #eee;
                        }
                        a {
                        color: #007bff;
                        text-decoration: none;
                        }
                        a:hover {
                        text-decoration: underline;
                        }
                    </style>
                    </head>
                    <body>
                    <div class="container">
                        <div class="header">
                        <h1>Welcome to your new store!</h1>
                        </div>
                        <div class="content">
                        <p>Dear ${input.name},</p>
                        <p>Welcome ${input.name}.</p>
                        <p>Your bookings has been ${input.token}.</p>
                        <p>Thank you for choosing our platform. We look forward to supporting you as your store grows and succeeds.</p>
                        <p>Best regards,<br>TrekMate</p>
                        </div>
                        <div class="footer">
                        <p>This is an automated message. Please do not reply directly to this email.</p>
                    </div>
                    </body>
                    </html>
                `
            default:
                throw new Error("Invalid email template topic");
        }
    }
}