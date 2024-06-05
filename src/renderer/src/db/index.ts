import sqlite from 'sqlite3'

export function DB() {
  class SQLite {
    verbose: sqlite.sqlite3
    db: sqlite.Database
    defaultTable?: string
    constructor({ database, tableName }: { database: string; tableName: string }) {
      this.verbose = sqlite.verbose()
      this.db = new this.verbose.Database(database)
      this.defaultTable = tableName
    }

    insert(tableName: string, data) {
      const keys = data ? Object.keys(data).join(', ') : ''
      const values = data
        ? Object.values(data)
            .map((val) => {
              if (val && !['string', 'number', 'boolean'].includes(typeof val))
                return JSON.stringify(val)
              return val
            })
            .join(', ')
        : ''
      return new Promise((resolve, rejects) => {
        this.db.run(
          `insert into ${tableName || this.defaultTable} (${keys}) values (${values})`,
          (err, data = true) => {
            if (err) rejects(err)
            else resolve({ code: 0, data })
          }
        )
      })
    }

    delete(tableName: string, id: string | number) {
      return new Promise((resolve, rejects) => {
        this.db.run(
          `delete from ${tableName || this.defaultTable} where id = ${id}`,
          (err, data = true) => {
            if (err) rejects(err)
            else resolve({ code: 0, data })
          }
        )
      })
    }

    update(tableName: string, data) {
      const { id } = data
      delete data.id
      const sets = Object.keys(data)
        .map((key: string) => {
          const val =
            data[key] && !['string', 'number', 'boolean'].includes(typeof data[key])
              ? JSON.stringify(data[key])
              : data[key]
          return `${key} = ${val}`
        })
        .join(', ')
      return new Promise((resolve, rejects) => {
        this.db.run(
          `update ${tableName || this.defaultTable} set ${sets} where id = ${id}`,
          (err, data = true) => {
            if (err) rejects(err)
            else resolve({ code: 0, data })
          }
        )
      })
    }

    all(
      tableName: string,
      order?:
        | string
        | {
            by: string
            type: 'ASC' | 'DESC'
          }
    ) {
      order = order
        ? typeof order === 'string'
          ? order
          : `order by ${order.by || 'id'} ${order.type || 'ASC'}`
        : ''
      return new Promise((resolve, rejects) => {
        this.db.all(`select * from  ${tableName || this.defaultTable} ${order}`, (err, data) => {
          if (err) rejects(err)
          else resolve({ code: 0, data })
        })
      })
    }

    each(tableName: string, id: string | number) {
      return new Promise((resolve, rejects) => {
        this.db.each(
          `select * from  ${tableName || this.defaultTable} where id = ${id}`,
          (err, data = true) => {
            if (err) rejects(err)
            else resolve({ code: 0, data: data })
          }
        )
      })
    }

    run(sql: string, params) {
      return new Promise((resolve, rejects) => {
        this.db.run(sql, params, (err, data = true) => {
          if (err) rejects(err)
          else resolve({ code: 0, data })
        })
      })
    }

    exec(sql: string, params) {
      return this.run(sql, params)
    }

    get(sql: string, params) {
      return new Promise((resolve, rejects) => {
        this.db.get(sql, params, (err, data = true) => {
          if (err) rejects(err)
          else resolve({ code: 0, data })
        })
      })
    }

    prepare(sql: string, params) {
      return new Promise((resolve, rejects) => {
        this.db.prepare(sql, params, (err, data = true) => {
          if (err) rejects(err)
          else resolve({ code: 0, data })
        })
      })
    }

    close() {
      return new Promise((resolve, rejects) => {
        try {
          this.db.close((err) => {
            if (err) rejects(err)
            else resolve({ code: 0, data: true })
          })
        } catch (error) {
          rejects(error)
        }
      })
    }

    on(
      event: 'trace' | 'profile' | 'change' | 'error' | 'close',
      listener:
        | (() => void)
        | ((data: string | Error) => void)
        | ((sql: string, time?: number | string) => void)
        | ((type: string, database: string, table: string, rowid: number) => void)
    ) {
      this.db.on(event, listener)
    }
  }

  let instance: SQLite | null = null

  return function ({ database, tableName }: { database: string; tableName: string }) {
    if (instance) {
      instance = new SQLite({ database, tableName })
    }
    return instance
  }
}

export default DB
