CREATE TABLE `accomodation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`ownerName` varchar(50),
	`phone` varchar(10),
	`description` varchar(255),
	`locationId` int,
	CONSTRAINT `accomodation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `accomodation` ADD CONSTRAINT `accomodation_locationId_subLocation_id_fk` FOREIGN KEY (`locationId`) REFERENCES `subLocation`(`id`) ON DELETE no action ON UPDATE no action;