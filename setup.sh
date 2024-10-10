mongosh learning_platform --eval "db.dropDatabase()" 
mongoimport -d learning_platform -c users --file data/export_users.json