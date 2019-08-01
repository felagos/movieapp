import SQLite from "react-native-sqlite-storage";
import { sqlliteConfig as config } from '../config/sqlite-config';

export const TABLES = {
    UPCOMING: "upcoming",
    MOVIES: "movies",
    SERIES: "series",
    MYLIST: "mylist",
    DETAILMEDIA: "detailmedia",
    SEARCH: "search",
    NOWPLAYING: "nowplaying",
    ONAIR: "onair"
};

class SqliteService {

    constructor() {
        //SQLite.DEBUG(true);
        SQLite.enablePromise(true);
    }

    async _initDB() {
        const db = await SQLite.openDatabase(config.name, config.version, config.displayName, config.size);

        db.transaction((tx) => {
            tx.executeSql("create table if not exists upcoming(id integer primary key, data text);");
            tx.executeSql("create table if not exists movies(id integer primary key, data text);");
            tx.executeSql("create table if not exists series(id integer primary key, data text);");
            tx.executeSql("create table if not exists mylist(data text);");
            tx.executeSql("create table if not exists detailmedia(id text primary key, data text, type text);");
            tx.executeSql("create table if not exists nowplaying(id text primary key, data text);");
            tx.executeSql("create table if not exists onair(id text primary key, data text);");
        });
        return db;
    }

    _getInsertTable(table) {
        return `INSERT INTO ${table} (id, data) VALUES (?, ?)`;
    }

    _getSelectTable(table) {
        return `select * from ${table} where id = ?`;
    }

    updateData(id, data, table) {
        this._initDB().then(db => {
            db.transaction(tx => {
                tx.executeSql(`update ${table} set data = ? where id = ?`, [JSON.stringify(data), id], (tx, results) => {
                    if (results.rowsAffected === 0) {
                        this.insertData(db, table, id, data);
                    }
                });
            });
        });
    }

    updateDetail(id, data, type) {
        this._initDB().then(db => {
            db.transaction(tx => {
                tx.executeSql(`update detailmedia set data = ? where id = ? and type = ?`, [JSON.stringify(data), id, type], (tx, results) => {
                    if (results.rowsAffected === 0) {
                        this._insertDetail(db, id, data, type);
                    }
                });
            });
        });
    }

    _insertDetail(db, id, data, type) {
        const stringData = JSON.stringify(data);

        return new Promise((reject, resolve) => {
            db.transaction((tx) => {
                tx.executeSql("insert into detailmedia (id, data, type, ?) values (? ,? ,?, ?)",
                    [id, stringData, type],
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

    _insertData(db, table, id, data) {
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
            this._initDB().then(db => {
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

    getDetail(id, type) {
        return new Promise((resolve, reject) => {
            this._initDB().then(db => {
                db.transaction(tx => {
                    tx.executeSql("select * from detailmedia where id = ? and type = ?", [id, type], (tx, results) => {
                        const len = results.rows.length;
                        const response = len == 0 ? {} : results.rows.item(0);
                        resolve(JSON.parse(response.data));
                    });
                });
            });

        });
    }

    insertMyList(data) {
        data = JSON.stringify(data);
        return new Promise((resolve, reject) => {
            this._initDB().then(db => {
                db.transaction(tx => {
                    tx.executeSql("delete from mylist", [], (tx) => {
                        tx.executeSql("insert into mylist(data) values (?)", [data], () => {
                            resolve(true);
                        });
                    });
                });
            });
        });
    }

    getMyList() {
        return new Promise((resolve) => {
            this._initDB().then(db => {
                db.transaction(tx => {
                    tx.executeSql("select * from mylist", [], (tx, results) => {
                        const len = results.rows.length;
                        const response = len == 0 ? {} : results.rows.item(0);
                        resolve(JSON.parse(response.data));
                    });
                });
            });
        });
    }

}

export default new SqliteService();