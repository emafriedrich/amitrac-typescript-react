import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Affiliate } from './affiliate';
import { User } from './user';

@Entity({ name: 'truck_drivers' })
export class TruckDriver extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name!: string;

  @OneToOne(() => User, user => user.truckDriver)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Affiliate, affiliate => affiliate.truckDrivers)
  affiliate: Affiliate;

  @Column('int')
  affiliate_id: number;

  @Column('bool', { default: true })
  active: boolean;
}