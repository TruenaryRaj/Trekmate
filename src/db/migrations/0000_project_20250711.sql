CREATE TABLE `accomodation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`owner_name` varchar(50),
	`phone` varchar(10),
	`description` varchar(255),
	`location_id` int,
	`created_at` timestamp(0) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(0) DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `accomodation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `booking` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`service_type` enum('accomodation','transportation') NOT NULL,
	`service_id` int NOT NULL,
	`status` enum('pending','conformed','cancelled') DEFAULT 'pending',
	`created_at` timestamp(0) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(0) DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `booking_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `destination` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`description` varchar(255),
	`created_at` timestamp(0) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(0) DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `destination_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `location` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`description` varchar(255),
	`estimated_time` varchar(20),
	`destination_id` int NOT NULL,
	`created_at` timestamp(0) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(0) DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `location_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`password` varchar(255),
	`role` enum('user','admin') DEFAULT 'user',
	`phone` varchar(10),
	`created_at` timestamp(0) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(0) DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `transportation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`number_plate` varchar(20) NOT NULL,
	`phone` varchar(10),
	`owner_name` varchar(50),
	`created_at` timestamp(0) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(0) DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `transportation_id` PRIMARY KEY(`id`),
	CONSTRAINT `transportation_numberPlate_unique` UNIQUE(`number_plate`)
);
--> statement-breakpoint
ALTER TABLE `accomodation` ADD CONSTRAINT `accomodation_location_id_location_id_fk` FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `booking` ADD CONSTRAINT `booking_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `location` ADD CONSTRAINT `location_destination_id_destination_id_fk` FOREIGN KEY (`destination_id`) REFERENCES `destination`(`id`) ON DELETE no action ON UPDATE no action;