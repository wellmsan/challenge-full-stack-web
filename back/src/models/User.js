import { Sequelize } from 'sequelize'

/**
 * @typedef User
 * @property { string } nome.required
 * @property { string } email.required
 * @property { string } senha.required
 */
class User extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING(255),
                    allowNull: true
                },
                pass: {
                    type: DataTypes.STRING(100),
                    allowNull: true
                },
            },
            {
                tableName: "users",
                modelName: "user",
                underscored: true,
                sequelize
            }
        );
    }
    static associate(models) {
    }
}

export default User