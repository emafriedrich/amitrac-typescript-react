import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { decrypt, encrypt } from '../services/encryption';
import { Affiliate } from './affiliate';
import { TruckDriver } from './truck-driver';

@Entity()
export class User extends BaseEntity {
 
  constructor(name: string, password: string) {
    super();
    this.name = name;
    this.password = password;
    this.realPassword = password;
  }
  
  @Column('varchar', { primary: true })
  name!: string;
  @Column('varchar')
  password!: string;

  @Column('varchar')
  realPassword: string;
  
  @OneToOne(() => Affiliate)
  affiliate: Affiliate;

  @OneToOne(() => TruckDriver, truckDriver => truckDriver.user)
  truckDriver: TruckDriver;

  credentialNumber() {
    return this.affiliate ? this.affiliate.credentialNumber : this.truckDriver.affiliate.credentialNumber;
  }

  changePassword(newPassword: any) {
    this.password = encrypt(newPassword);
    this.realPassword = newPassword;
  }

  @BeforeInsert()
  genPassword() {
    this.password = encrypt(this.password);
  }

  comparePassword(password: string) {
    return decrypt(this.password) === password;
  }
}