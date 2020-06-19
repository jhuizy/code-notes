---
title: Database query using pg8000
tags:
  - python
  - database
  - pg8000
emoji: 🐚
link: https://github.com/jhuizy/code-notes
---

pg8000 is a postgres client implementation written in pure python (no need for native bindings).

### Create a Connection

Creating a connection is as easy as


```py
import pg8000

conn = pg8000.connect(
  host=...,
  port=...,
  database=...,
  user=...,
  password=...
)
```

#### The connection type

The returned type from `.connect()` is a `Connection` class (if using type hints) which can be imported from the `pg8000` package, like

```py
from pg8000 import Connection

def create_connection(...) -> Connection:
  pass
```

### Run a query

Queries can be run using the `.run()` method

```py
from pg8000 import Connection
from typings import List, Dict

def list_users(conn: Connection) -> List[Dict[str, str]]:
  result = conn.run("SELECT name, age FROM users LIMIT 10")
  return dict([zip(["name", "age"], row) for row in result])

assert list_users(conn) == [{'name': 'john smith', 'age': 21}]
```