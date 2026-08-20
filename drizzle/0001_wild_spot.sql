CREATE TABLE `potensi_categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`icon` text NOT NULL,
	`color` text NOT NULL,
	`light_color` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `potensi_categories_slug_unique` ON `potensi_categories` (`slug`);--> statement-breakpoint
CREATE TABLE `potensi_features` (
	`id` integer PRIMARY KEY NOT NULL,
	`potensi_id` integer NOT NULL,
	`feature` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`potensi_id`) REFERENCES `potensi_items`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `potensi_images` (
	`id` integer PRIMARY KEY NOT NULL,
	`potensi_id` integer NOT NULL,
	`image_url` text NOT NULL,
	`caption` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`potensi_id`) REFERENCES `potensi_items`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `potensi_items` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`category` text NOT NULL,
	`owner` text,
	`rt_rw` text,
	`dusun` text,
	`year_founded` integer,
	`capacity` text,
	`whatsapp` text,
	`instagram` text,
	`tiktok` text,
	`marketplace` text,
	`is_sector` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `potensi_sector_data` (
	`id` integer PRIMARY KEY NOT NULL,
	`potensi_id` integer NOT NULL,
	`komoditas` text NOT NULL,
	`musim_tanam` text NOT NULL,
	`kelompok_tani` text NOT NULL,
	`pemasaran` text NOT NULL,
	`modernisasi` text NOT NULL,
	FOREIGN KEY (`potensi_id`) REFERENCES `potensi_items`(`id`) ON UPDATE no action ON DELETE no action
);
