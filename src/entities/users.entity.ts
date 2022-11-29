import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn("varchar")
  id: string;

  @Column("varchar", { nullable: true })
  name: string;

  @Column("timestamp without time zone", { default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Column("timestamp without time zone", { default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;
}
