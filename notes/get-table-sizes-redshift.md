---
title: Get table size for all Redshift tables
tags:
  - database
  - redshift
emoji: 🐚
link: https://github.com/jhuizy/code-notes
---

The following query will return a list of results containing each table's name and the size of the table on disk in MB:

```sql
SELECT name, size_mb
FROM (
    SELECT tbl,
      count(*) AS size_mb
    FROM stv_blocklist
    GROUP BY tbl
  )
  LEFT JOIN (
    select distinct id,
      name
    FROM stv_tbl_perm
  ) ON id = tbl
```