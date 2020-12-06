import { Entity, Column, BeforeInsert, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn, RelationId } from 'typeorm';
import { Users } from './user';
import { Posts } from './post';

@Entity()
export class Reactions extends BaseEntity {

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
  
  @Column({ type: 'uuid' })
  userId;

  @Column({ type: 'uuid' })
  postId;

  @Column({ type: Boolean })
  isLike;

  @ManyToOne(type => Posts, post => post.postReactions)
  post;

}