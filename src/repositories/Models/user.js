import { Entity, Column, BeforeInsert, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Users extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id;

  @CreateDateColumn()
  createdAt;

  @BeforeInsert()
  setCreateDate() {
    this.createdAt = new Date();
  }

  @Column({ type: 'datetime', nullable: true })
  updatedAt;

  @Column({ type: String })
  username;

  @Column({ type: String })
  email;

  @Column({ type: String, length: 30 })
  password;

  @Column({ type: Boolean, default: false })
  admin;

  @Column({ type: String, length: 100, nullable: true })
  status;

  @Column({ type: String, nullable: true })
  avatar;

}
