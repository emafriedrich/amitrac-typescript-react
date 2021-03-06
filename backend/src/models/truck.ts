import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Affiliate } from './affiliate';
import { User } from './user';

@Entity()
export class Truck extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  patent!: string;

  @Column('varchar')
  brand!: string;

  @Column('date')
  vtvExpiration!: Date;

  @Column('date')
  assuranceExpiration!: Date;

  @Column('date')
  patentExpiration!: Date;

  @ManyToOne(() => Affiliate, (affiliate) => affiliate.trucks)
  affiliate!: Affiliate;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column('bool', { default: true })
  active: boolean;

  @Column('varchar', { length: 1000, default: '' })
  truckImage: string;

  @Column('varchar', { length: 2000, default: '' })
  link: string;
}