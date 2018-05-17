# How to Run this project?

1. `cd mobileapp`
2. `npm install`
3. `DEBUG=mobileapp:* npm start`

# How to Modify the port?

#### 可以通过修改mobileapp/bin/www中的配置来改变其所在的端口.



# How to initialize the database?

1. `create a schema named tinyworld in your mysql.`
2. `cd sql`
3. `mysql -u"yourAccount" -p"yourPassword" tinyworld < tinyworld.sql` 

