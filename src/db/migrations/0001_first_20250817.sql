ALTER TABLE `transportation` RENAME COLUMN `destiantion_id` TO `destination_id`;--> statement-breakpoint
ALTER TABLE `transportation` DROP FOREIGN KEY `transportation_destiantion_id_destination_id_fk`;
--> statement-breakpoint
ALTER TABLE `transportation` ADD CONSTRAINT `transportation_destination_id_destination_id_fk` FOREIGN KEY (`destination_id`) REFERENCES `destination`(`id`) ON DELETE no action ON UPDATE no action;