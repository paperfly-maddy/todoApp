#!/usr/bin/mongo

var db = new Mongo().getDB("todosdb");

db.todos.remove({});

db.todos.insert([
  {priority: 'High', status:'New', note:'to this task', title:'First task'},
  {priority: 'low', status:'Pending', note:'do this task', title:'Second task'}
]);
