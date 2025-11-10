ALTER TABLE `image` MODIFY COLUMN `related_types` enum('accomodation','transportation','destination','user') NOT NULL;--> statement-breakpoint
ALTER TABLE `accomodation_booking` ADD `starting_date` timestamp(0) NOT NULL;--> statement-breakpoint
ALTER TABLE `accomodation_booking` ADD `ending_date` timestamp(0) NOT NULL;--> statement-breakpoint
ALTER TABLE `transportation_booking` ADD `dispatch_date` timestamp(0) NOT NULL;--> statement-breakpoint
ALTER TABLE `transportation_booking` ADD `return_date` timestamp(0) NOT NULL;--> statement-breakpoint
ALTER TABLE `accomodation` DROP COLUMN `days`;--> statement-breakpoint
ALTER TABLE `accomodation_booking` DROP COLUMN `date`;--> statement-breakpoint
ALTER TABLE `transportation_booking` DROP COLUMN `date`;--> statement-breakpoint
ALTER TABLE `transportation` DROP COLUMN `time`;--> statement-breakpoint
ALTER TABLE `transportation` DROP COLUMN `distance`;