import { Entity, ObjectID, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('job_data_entity')
export class JobDataEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column() post_link: string;
  @Column() numberAccount: string;
}
@Entity('jobs')
export class JobsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column() job_type: string;
  @Column() status: boolean;
  @OneToOne(() => JobDataEntity, jobData => jobData.id)
  job_data: JobDataEntity;
  @Column() proxy: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
