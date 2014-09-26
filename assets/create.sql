BEGIN TRANSACTION;
CREATE TABLE "program" (
	`id_program`	integer NOT NULL,
	`type`	TEXT,
	`name`	TEXT NOT NULL,
	`startTime`	INTEGER,
	`endTime`	INTEGER,
	`location`	INTEGER,
	`date`	TEXT,
	`id_chair`	INTEGER,
	PRIMARY KEY(id_program)
);
CREATE TABLE "presentation_author" (
	`id_presentation`	INTEGER NOT NULL,
	`id_author`	INTEGER NOT NULL,
	`author_number`	INTEGER
);
CREATE TABLE "presentation" (
	`id_presentation`	INTEGER NOT NULL,
	`title`	TEXT NOT NULL,
	`abstract`	TEXT,
	`startTime`	TEXT NOT NULL,
	`endTime`	TEXT NOT NULL,
	`id_program`	INTEGER NOT NULL,
	`type`	TEXT,
	PRIMARY KEY(id_presentation)
);
CREATE TABLE `event_author` (
	`id_event`	INTEGER,
	`id_author`	INTEGER,
	`author_number`	INTEGER
);
CREATE TABLE `event` (
	`id_event`	INTEGER,
	`title`	INTEGER,
	`description`	TEXT,
	`date`	INTEGER,
	`startTime`	INTEGER,
	`endTime`	INTEGER,
	PRIMARY KEY(id_event)
);
CREATE TABLE "author" (
	`id_author`	INTEGER NOT NULL,
	`name`	TEXT NOT NULL,
	`afiliation`	TEXT,
	PRIMARY KEY(id_author)
);
COMMIT;
