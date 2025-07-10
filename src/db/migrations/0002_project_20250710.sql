CREATE TABLE `destination` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`description` varchar(255),
	CONSTRAINT `destination_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subLocation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`description` varchar(255),
	`estimatedDay` int,
	`destinationId` int NOT NULL,
	CONSTRAINT `subLocation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transportation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`numberPlate` varchar(20) NOT NULL,
	`phone` varchar(10),
	`ownerName` varchar(50),
	CONSTRAINT `transportation_id` PRIMARY KEY(`id`),
	CONSTRAINT `transportation_numberPlate_unique` UNIQUE(`numberPlate`)
);
--> statement-breakpoint
CREATE TABLE `transportationRoutes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tansportationId` int NOT NULL,
	`locationId` int NOT NULL,
	CONSTRAINT `transportationRoutes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `subLocation` ADD CONSTRAINT `subLocation_destinationId_destination_id_fk` FOREIGN KEY (`destinationId`) REFERENCES `destination`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transportationRoutes` ADD CONSTRAINT `transportationRoutes_tansportationId_transportation_id_fk` FOREIGN KEY (`tansportationId`) REFERENCES `transportation`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transportationRoutes` ADD CONSTRAINT `transportationRoutes_locationId_subLocation_id_fk` FOREIGN KEY (`locationId`) REFERENCES `subLocation`(`id`) ON DELETE no action ON UPDATE no action;