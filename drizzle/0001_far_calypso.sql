CREATE TABLE `potensi_categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`icon` text,
	`color` text,
	`light_color` text,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `potensi_categories_slug_unique` ON `potensi_categories` (`slug`);--> statement-breakpoint
CREATE TABLE `potensi_features` (
	`id` integer PRIMARY KEY NOT NULL,
	`item_id` integer NOT NULL,
	`feature` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `potensi_items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `potensi_images` (
	`id` integer PRIMARY KEY NOT NULL,
	`item_id` integer NOT NULL,
	`image_url` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `potensi_items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `potensi_items` (
	`id` integer PRIMARY KEY NOT NULL,
	`category_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`owner` text,
	`rt_rw` text,
	`dusun` text,
	`year_founded` integer,
	`capacity` text,
	`contact` text,
	`is_sector` integer DEFAULT false NOT NULL,
	`sector_data` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `potensi_categories`(`id`) ON UPDATE no action ON DELETE no action
);
