CREATE TABLE `image` (
	`id` int AUTO_INCREMENT NOT NULL,
	`related_id` int NOT NULL,
	`related_types` enum('accomodation','transportation','destination') NOT NULL,
	`url` varchar(255) NOT NULL,
	`created_at` timestamp(0) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(0) DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `image_id` PRIMARY KEY(`id`)
);
