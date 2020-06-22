---
title: Get row counts for all Redshift tables
tags:
  - database
  - redshift
emoji: 🐚
link: https://github.com/jhuizy/code-notes
---

The following query will return a list of results containing each table's name and row count:

```sql
select name, sum(rows) as rows
from stv_tbl_perm
group by 1
```