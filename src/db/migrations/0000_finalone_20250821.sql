CREATE TABLE `accomodation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`description` varchar(255),
	`destination_id` int,
	`price` int NOT NULL,
	`days` int NOT NULL,
	`created_at` timestamp(0) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(0) DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `accomodation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `accomodation_booking` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`accomodation_id` int NOT NULL,
	`date` varchar(50),
	`status` enum('pending','conformed','cancelled','completed') DEFAULT 'pending',
	`created_at` timestamp(0) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(0) DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `accomodation_booking_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transportation_booking` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`transportation_id` int NOT NULL,
	`date` varchar(50),
	`status` enum('pending','conformed','cancelled','completed') DEFAULT 'pending',
	`created_at` timestamp(0) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(0) DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `transportation_booking_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `destination` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`short_description` varchar(255),
	`description` varchar(255) NOT NULL,
	`highest_elivation` int NOT NULL,
	`region` varchar(50) NOT NULL,
	`created_at` timestamp(0) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(0) DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `destination_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `image` (
	`id` int AUTO_INCREMENT NOT NULL,
	`related_id` int NOT NULL,
	`related_types` enum('accomodation','transportation','destination') NOT NULL,
	`url` varchar(255) NOT NULL,
	`created_at` timestamp(0) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(0) DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `image_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transportation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`destination_id` int NOT NULL,
	`price` int NOT NULL,
	`time` varchar(50) NOT NULL,
	`distance` varchar(50) NOT NULL,
	`grade` enum('Easy','Moderate','Hard') NOT NULL,
	`vechile_type_id` int,
	`created_at` timestamp(0) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(0) DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `transportation_id` PRIMARY KEY(`id`)
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
CREATE TABLE `vehicle_type` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`capacity` int NOT NULL,
	CONSTRAINT `vehicle_type_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `accomodation` ADD CONSTRAINT `accomodation_destination_id_destination_id_fk` FOREIGN KEY (`destination_id`) REFERENCES `destination`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `accomodation_booking` ADD CONSTRAINT `accomodation_booking_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `accomodation_booking` ADD CONSTRAINT `accomodation_booking_accomodation_id_accomodation_id_fk` FOREIGN KEY (`accomodation_id`) REFERENCES `accomodation`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transportation_booking` ADD CONSTRAINT `transportation_booking_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transportation_booking` ADD CONSTRAINT `transportation_booking_transportation_id_transportation_id_fk` FOREIGN KEY (`transportation_id`) REFERENCES `transportation`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transportation` ADD CONSTRAINT `transportation_destination_id_destination_id_fk` FOREIGN KEY (`destination_id`) REFERENCES `destination`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transportation` ADD CONSTRAINT `transportation_vechile_type_id_vehicle_type_id_fk` FOREIGN KEY (`vechile_type_id`) REFERENCES `vehicle_type`(`id`) ON DELETE no action ON UPDATE no action;