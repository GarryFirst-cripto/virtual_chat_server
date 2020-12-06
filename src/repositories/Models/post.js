import { Entity, Column, BeforeInsert, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, RelationId } from 'typeorm';
import { Users } from './user';
import { Reactions } from './reaction';

@Entity()
export class Posts extends BaseEntity {

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
  userId;

  @ManyToOne(() => Users, user => user.comments)
  @JoinColumn({ name: 'userId' })
  user;

  @Column({ type: String })
  text;

  @OneToMany(() => Reactions, reaction => reaction.post)
  postReactions;

}