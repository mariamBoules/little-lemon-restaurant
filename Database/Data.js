import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("little-lemon");

export const InitializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists menuItems (id integer primary key autoincrement, name text , price double, description text, image text, category text);",
        [],
        () => {
          resolve(true);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const fetchTableData = ([categories, searched]) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      if (categories.length === 0 && searched.length === 0) {
        tx.executeSql(
          "select * from menuItems ;",
          [],
          (_, { rows }) => {
            const result = rows._array || [];
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      } else if (searched.length === 0) {
        tx.executeSql(
          `select * from menuItems where category in (${categories
            .map(() => "?")
            .join(", ")});`,
          categories,
          (_, { rows }) => {
            const result = rows._array;
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      } else if (categories.length === 0) {
        tx.executeSql(
          `select * from menuItems where name like '%${searched}%';`,
          [],
          (_, { rows }) => {
            const result = rows._array;
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      } else {
        tx.executeSql(
          `select * from menuItems where category in (${categories
            .map(() => "?")
            .join(", ")}) and name like ?;`,
          [...categories, `%${searched}%`],

          (_, { rows }) => {
            const result = rows._array;
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      }
    });
  });
};

export const dropTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS menuItems;",
        [],
        () => {
          console.log("TABLE DROPPED");
          resolve(true);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const insertMenuItems = (menuItems) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      menuItems.forEach((item) => {
        tx.executeSql(
          "insert into menuItems (name, price, description, image, category) values (?, ?, ?, ?, ?);",
          [item.name, item.price, item.description, item.image, item.category]
        );
      });
    }),
      () => {
        resolve(true);
      },
      (_, error) => {
        reject(error);
      };
  });
};
