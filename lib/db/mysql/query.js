var mysql = require('../../../config/mysql');
var Q = require('q');

exports.query = function () {
  var connection;

  return {
    getConnection: function () {
      var defer = Q.defer();

      mysql.getConnection(function (err, conn) {
        if (err) return defer.reject(err);
        connection = conn;
        defer.resolve();
      });

      return defer.promise;
    },
    beginTransaction: function () {
      var defer = Q.defer();

      connection.beginTransaction(function (err) {
        if (err) return defer.reject(err);
        defer.resolve();
      });

      return defer.promise;
    },
    commit: function () {
      var defer = Q.defer();

      connection.commit(function (err) {
        if (err) defer.reject(err);
        else defer.resolve();
      });

      return defer.promise;
    },
    rollback: function () {
      var defer = Q.defer();

      connection.rollback(function (err) {
        if (err) defer.reject(err);
        else defer.resolve();
      });

      return defer.promise;
    },
    release: function () {
      var defer = Q.defer();

      connection.release();
      defer.resolve();

      return defer.promise;
    },
    exec: function (query) {
      return function () {
        var defer = Q.defer();

        connection.query(query, function (err, res) {
          if (err) defer.reject(err);
          else defer.resolve(res);
        });

        return defer.promise;
      };
    },
    insert: function (statement, data) {
      return function () {
        var defer = Q.defer();

        connection.query(statement, data, function (err, res) {
          if (err) defer.reject(err);
          else defer.resolve(res);
        });

        return defer.promise;
      };
    }
  };
};
