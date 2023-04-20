import { Column, DataType, Model, Table } from "sequelize-typescript"

interface UserAttributes {
    email: string;
    password: string;
    profileId: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserAttributes> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    password: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @Column({ type: DataType.INTEGER })
    profileId: number;
}