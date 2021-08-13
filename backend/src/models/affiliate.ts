import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Truck } from './truck';
import { TruckDriver } from './truck-driver';
import { User } from './user';

@Entity()
export class Affiliate extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  companyName!: string;

  @Column('varchar', { unique: true })
  cuit!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @Column()
  credentialNumber: string;

  @Column()
  credentialExpiration: Date;

  @OneToMany(() => Truck, (truck) => truck.affiliate, { eager: true })
  trucks: Truck[];
  
  @OneToMany(() => TruckDriver, truckDriver => truckDriver.affiliate, { eager: true })
  truckDrivers: TruckDriver[];
}