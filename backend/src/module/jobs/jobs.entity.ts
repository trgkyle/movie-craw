import { Entity, ObjectID, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('jobs')
export class JobsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column() job_type: string;
  @Column() status: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
