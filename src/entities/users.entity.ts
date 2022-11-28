import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn("varchar")
  id: string;

  @Column("varchar", { nullable: true })
  name: string;

  @Column("timestamp without time zone")
  createdAt: number;

  @Column("timestamp without time zone")
  updatedAt: number;
}
