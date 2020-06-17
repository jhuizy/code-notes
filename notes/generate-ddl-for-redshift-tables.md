---
title: Generate DDL for redshift tables
tags:
  - ddl
  - database
  - redshift
emoji: 🐚
link: https://github.com/jhuizy/code-notes
---

DDL statements can be exported from redshift to recreate tables in different schemas or environments, or be used to [generate diagrams](./erd-from-ddl-datagrip)

### Create a view in redshift

Using the code [from AWS](https://github.com/awslabs/amazon-redshift-utils/blob/master/src/AdminViews/v_generate_tbl_ddl.sql) we can create a view in Redshift to query DDL statements.

Note: you will need to create the `admin` schema first (using `CREATE SCHEMA admin;`), or change the schema specified in the SQL file above to one that exists.

### Run a query

Next, you can run a query.
An example query below will search for all tables from schema `reports` that begin with `march_`.
The ordering is important to combine related DDL statements together.

```sql
SELECT ddl
FROM admin.v_generate_tbl_ddl
WHERE schemaname = 'reports' AND tablename like 'march_%'
ORDER BY tablename, seq
```

### Format DDL

There may be some formatting required, as the output has each line surrouned by quotes.
This can be fixed using `sed` (assuming `output.txt` contains the results of the above query)

```bash
sed -i 's/\"(.*)\"/\1/g' output.txt
```