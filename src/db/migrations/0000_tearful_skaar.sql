CREATE TABLE `admin` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255),
	`password` varchar(255),
	CONSTRAINT `admin_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`password` varchar(255),
	`phone` int,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
