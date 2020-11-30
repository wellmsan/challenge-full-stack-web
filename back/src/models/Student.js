import { Sequelize } from 'sequelize'

/**
 * @typedef Student
 * @property { string } academic_record.required
 * @property { string } name.required
 * @property { string } email.required
 * @property { string } cpf.required
 */
class Student extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                academic_record: {
                    type: DataTypes.STRING(10),
                    allowNull: false,
                    unique: true
                },
                name: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING(255),
                    allowNull: true
                },
                cpf: {
                    type: DataTypes.STRING(14),
                    allowNull: true,
                    unique: true
                },
            },
            {
                tableName: "students",
                modelName: "student",
                underscored: true,
                sequelize
            }
        );
    }
    static associate(models) {
    }
}

export default Student