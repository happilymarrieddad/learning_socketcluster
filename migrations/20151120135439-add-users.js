var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) {
	async.series([
		db.createTable.bind(db,'users', {
			id: { type: "int", primaryKey:true, autoIncrement: true, notNull: true },
			first: { type: "string", length: 60, notNull: true },
			last: { type: "string", length: 60, notNull: true },
			email: { type: "string", length: 60, notNull: true },
			password: { type: "string", length: 60, notNull: true },
		 	type_id: { type: "int", length: 11, notNull: true, defaultValue:4 },
		 	image: { type:'longblob' }
		}),
		db.insert.bind(db,'users', [ "first","last","email","password","type_id" ], [ "Nick ","Kotenberg","nick@mail.com","5f4dcc3b5aa765d61d8327deb882cf99",1 ]),
		db.insert.bind(db,'users', [ "first","last","email","password","type_id" ], [ "Mike ","Smith","mike@mail.com","5f4dcc3b5aa765d61d8327deb882cf99",2 ]),
		db.insert.bind(db,'users', [ "first","last","email","password","type_id" ], [ "John ","Smith","john@mail.com","5f4dcc3b5aa765d61d8327deb882cf99",3 ])
	], callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};
