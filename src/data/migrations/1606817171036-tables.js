import {QueryRunner} from "typeorm";

export class tables1606817171036 {
    name = 'tables1606817171036'

    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime NULL, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(30) NOT NULL, `admin` tinyint NOT NULL DEFAULT 0, `status` varchar(100) NULL, `avatar` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `reactions` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime NULL, `userId` varchar(255) NOT NULL, `postId` varchar(255) NOT NULL, `isLike` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `posts` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime NULL, `userId` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `reactions` ADD CONSTRAINT `FK_d9628397382a90981e26a915bc9` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `posts` ADD CONSTRAINT `FK_ae05faaa55c866130abef6e1fee` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    async down(queryRunner) {
        // await queryRunner.query("ALTER TABLE `reactions` DROP FOREIGN KEY `FK_d9628397382a90981e26a915bc9`");
        // await queryRunner.query("ALTER TABLE `posts` DROP FOREIGN KEY `FK_ae05faaa55c866130abef6e1fee`");
        // await queryRunner.query("DROP INDEX `REL_ae05faaa55c866130abef6e1fe` ON `posts`");
        await queryRunner.query("DROP TABLE `reactions`");
        await queryRunner.query("DROP TABLE `posts`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
