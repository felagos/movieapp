import SQLite from "react-native-sqlite-storage";
import { sqlliteConfig as config } from '../config/sqlite-config';

class SqliteService {

    constructor() {
        //SQLite.DEBUG(true);
        SQLite.enablePromise(true);
    }

    async initDB() {
        const db = await SQLite.openDatabase(config.name, config.version, config.displayName, config.size);

        db.transaction((tx) => {
            tx.executeSql("create table if not exists upcoming(id integer primary key, data text);");
            tx.executeSql("create table if not exists movies(id integer primary key, data text);");
            tx.executeSql("create table if not exists series(id integer primary key, data text);");
            tx.executeSql("create table if not exists mylist(id integer primary key, data text);");
            tx.executeSql("create table if not exists detailMedia(id integer primary key, data text, type text);");
        });
        return db;
    }

    getInsertTable(table) {
        return `INSERT INTO ${table} (id, data) VALUES (?, ?)`;
    }

    getSelectTable(table) {
        return `select * from ${table} where id = ?`;
    }

    updateData(id, data, table) {
        this.initDB().then(db => {
            db.transaction(tx => {
                tx.executeSql(`update ${table} set data = ? where id = ?`, [JSON.stringify(data), id], (tx, results) => {
                    if(results.rowsAffected === 0){
                        this.insertData(db, table, id, data);
                    }
                });
            });
        });
    }

    insertData(db, table, id, data) {
        const stringData = JSON.stringify(data);

        return new Promise((reject, resolve) => {
            db.transaction((tx) => {
                tx.executeSql(this.getInsertTable(table),
                    [id, stringData],
                    () => {
                        resolve(true);
                    },
                    (e) => {
                        console.log(e)
                        reject(false);
                    });
            });

        });
    }

    getData(page, table) {
        const query = this.getSelectTable(table);
        return new Promise((resolve, reject) => {
            this.initDB().then(db => {
                db.transaction(tx => {
                    tx.executeSql(query, [page], (tx, results) => {
                        const len = results.rows.length;
                        const response = len == 0 ? [] : results.rows.item(0);
                        resolve(JSON.parse(response.data));
                    });
                });
            });

        });
    }

}

export default new SqliteService();