## 基于sequelize创建数据访问层和数据库

> 安装sequlize

   ```
    npm install --save sequelize
    npm install --save mysql2

   ```

> 安装sequelize-cli

首先应安装sequelize-cli工具，可以选择全局安装，也可以选择本地安装。

   ```
    npm install --save sequelize-cli
    npm install -g sequelize-cli

   ```

> 建立初始的ORM引导框架

   ```
    mkdir db
    cd db
    ../node_modules/.bin/sequelize init

   ```

这将创建以下文件夹:

- config, 包含配置文件，它告诉CLI如何连接数据库

- models,包含您的项目的所有模型

- migrations, 包含所有迁移文件

- seeders, 包含所有种子文件

> 修改配置文件以连接到数据库管理系统，并创建数据库

在建立模型之前，应先修改config/config.json，以告诉 CLI 如何连接到数据库。config/config.json内容如下：

  ```
    {
        "development": {
            "username": "root",
            "password": "12345",
            "database": "database_development",
            "host": "localhost",
            "dialect": "mysql",
            "pool": {
            "max": 5,
            "min": 0,
            "idle": 10000
            },
            "timezone": "+08:00",
            "define": {
            "charset": "utf8",
            "dialectOptions": {
                "collate": "utf8_general_ci"
            }
            }
        },
        "test": {
            "username": "root",
            "password": "12345",
            "database": "database_test",
            "host": "localhost",
            "dialect": "mysql",
            "pool": {
            "max": 5,
            "min": 0,
            "idle": 10000
            },
            "timezone": "+08:00",
            "define": {
            "charset": "utf8",
            "dialectOptions": {
                "collate": "utf8_general_ci"
            }
            }
        },
        "production": {
            "username": "root",
            "password": "12345",
            "database": "database_production",
            "host": "localhost",
            "dialect": "mysql",
            "pool": {
            "max": 5,
            "min": 0,
            "idle": 10000
            },
            "timezone": "+08:00",
            "define": {
            "charset": "utf8",
            "dialectOptions": {
                "collate": "utf8_general_ci"
            }
            }
        }
    }

  ```

上述配置修改了数据库的字符集，使之能支持中文。当然在创建数据库之前，应配置mysql数据库管理系，使其支持utf8字符集。可执行如下命令查看其支持的字符集，如果其不支持uft字符集，请按照参考链接[3]进行修改。

```
mysql> show variables like '%char%';
+--------------------------+---------------------------------------------------------+
| Variable_name            | Value                                                   |
+--------------------------+---------------------------------------------------------+
| character_set_client     | utf8                                                    |
| character_set_connection | utf8                                                    |
| character_set_database   | utf8                                                    |
| character_set_filesystem | binary                                                  |
| character_set_results    | utf8                                                    |
| character_set_server     | utf8                                                    |
| character_set_system     | utf8                                                    |
| character_sets_dir       | C:\Program Files\MySQL\MySQL Server 5.5\share\charsets\ |
+--------------------------+---------------------------------------------------------+
8 rows in set (0.00 sec)

```

使用如下命令创建数据库：

```
 ../node_modules/.bin/sequelize db:create
```

> 创建模型

我们将使用 model:generate 命令。 此命令需要两个选项：

- name, 模型的名称

- attributes, 模型的属性列表

创建一个名叫 User 的模型：

```
../node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string

```

这将发生以下事情:

- 在 models 文件夹中创建了一个 user 模型文件

- 在 migrations 文件夹中创建了一个名字像 XXXXXXXXXXXXXX-create-user.js 的迁移文件

**注意:**_Sequelize 将只使用模型文件，它是表描述。另一边，迁移文件是该模型的更改，或更具体的是说 CLI 所使用的表。 处理迁移，如提交或日志，以进行数据库的某些更改。

再创建一个名为Role的模型，它跟User是一对多的关系：

```
../node_modules/.bin/sequelize model:generate --name Role --attributes roleName:string

```

> 定义关系

Role和User是一对多的关系，因此需要修改它们的模型定义。

models/role.js如下：

```
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    roleName: DataTypes.STRING,
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    Role.hasMany(models.User, {
      foreignKey: "roleId"
    })
  };
  return Role;
};
```

修改models/user.js如下：

```
'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    roleId: { // name of the key we're adding 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Roles', // name of Target model
            key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Role, {
            onDelete: "NULL",
            foreignKey: "roleId"
            // foreignKey: {
               // allowNull: false
            // }
        })
  };
  return User;
};

```

> 修改和运行迁移

Role和User是一对多的关系，因此需要修改User迁移文件的定义。

修改migrations/20190304084433-create-user.js如下：

```
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleId: { // name of the key we're adding 
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Roles', // name of Target model
              key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};

```

**注意：**这里主要给User添加了外键字段，外键字段命名有规则：通常为小写的模型名加Id，即驼峰风格。例如这里加了roleId的外键字段。

直到目前为止，CLI没有将任何东西插入数据库。 刚刚为模型 User和Role创建了必需的模型和迁移文件。 现在要在数据库中实际创建该表，需要运行 db:migrate 命令。

```
../node_modules/.bin/sequelize db:migrate

```

此命令将执行这些步骤：

- 将在数据库中确保一个名为 SequelizeMeta 的表。 此表用于记录在当前数据库上运行的迁移

- 开始寻找尚未运行的任何迁移文件。 这可以通过检查 SequelizeMeta 表。 在这个例子中，它将运行创建的 XXXXXXXXXXXXXX-create-role.js和XXXXXXXXXXXXXX-create-user.js 迁移。

- 创建一个名为 Roles 的表，其中包含其迁移文件中指定的所有列。

- 创建一个名为 Users 的表，其中包含其迁移文件中指定的所有列。

> 创建种子，生成测试数据

假设我们希望在默认情况下将一些数据插入到几个表中。 例如创建几个用户和角色：

```
../node_modules/.bin/sequelize seed:generate --name demo-role
../node_modules/.bin/sequelize seed:generate --name demo-user
```

这个命令将会在 seeders 文件夹中创建两个种子文件。文件名看起来像是 XXXXXXXXXXXXXX-demo-role.js和XXXXXXXXXXXXXX-demo-user.js，它遵循相同的 up/down 语义，如迁移文件。

现在我们应该编辑这两个文件，将演示角色插入Role表,将演示用户插入User表。修改XXXXXXXXXXXXXX-demo-role.js如下：

```
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Roles', [{
        roleName: '管理员',
        createdAt:new Date(),
        updatedAt:new Date()
      },{
        roleName: '普通用户',
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Roles', null, {});

  }
};
```

修改XXXXXXXXXXXXXX-demo-user.js如下：

```
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        roleId:1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@demo.com',
        createdAt:new Date(),
        updatedAt:new Date()
      },{
        roleId:1,
        firstName: 'Jack',
        lastName: 'Smith',
        email: 'jack@demo.com',
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
```

种子文件修改后，即可使用如下命令将演示数据插入数据库中：

```
../node_modules/.bin/sequelize db:seed:all
```


  [转载自sequelize-cli使用经验总结](https://huangwang.github.io/2018/06/22/sequelize-cli%E4%BD%BF%E7%94%A8%E7%BB%8F%E9%AA%8C%E6%80%BB%E7%BB%93/)