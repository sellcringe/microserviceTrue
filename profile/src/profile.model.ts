import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ProfileAttributes {
    name: string;
    surname: string;
    phone: string;
}

@Table({ tableName: 'profiles' })
export class Profile extends Model<Profile, ProfileAttributes> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    surname: string;

    @Column({ type: DataType.STRING, allowNull: true })
    phone: string;

    @Column({ type: DataType.INTEGER, allowNull: true})
    userId: number;
}