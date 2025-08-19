# SnowDB

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]


**SnowDB** is a lightweight, high-performance key-versioned storage, append-only storage engine built in Rust, designed for scenarios where **history matters**. 
It’s not a traditional database — instead, it focuses on immutability and efficiency for workloads like:

* Transaction history
* Order logs
* Audit trails
* Game assets
* Any system where **data is never deleted**, only appended
* Persistent Multi-Map Store (HashMap-like, but versioned)

---

## Features

* **Fast core in Rust** — safe, efficient, and optimized for write-read-heavy workloads
* **Append-only design** — data is immutable, ensuring reliable audit trails
* **Key-Value Store with Versions** — Each key can have multiple versions
* **Node.js bindings** — simple API with stream support
* **Lightweight & embeddable** — no redundant  services
* **Memory Efficient** ~16MB RAM per 1 million records
* **Fast** Lookup time is **O(1)**

---

## Installation

```bash
npm install snowdb
```

---

## Usage



```js
import { SnowDB, SnowDBParser } from "snowdb";

const db = new SnowDB("./path/to/storage");
const doc = db.document('orders', SnowDBParser.OBJECT) // support OBJECT, STRING, BUFFER
// Insert record
await doc.save("user1", { orderId: 1, item: "Laptop", price: 1200 });

// Fetch all records
const history = doc.for('user1').all();
console.log(history);
// [{ orderId: 1, item: "Laptop", price: 1200 }]
```

---

## API

See docs: [https://yukiakai212.github.io/snowdb.js/](https://yukiakai212.github.io/snowdb.js/)

---

## Technical Specifications

- **Record size**: Supports up to **16777215 bytes** (~16 MB) per record.  
- **Total capacity**: Up to **549755813887 bytes** (~512 GB) per dataset.  
- **Memory usage**: Fixed at **~16 MB per 1 million records** for index management, independent of total dataset size.  
- **Access pattern**:  
  - O(1) lookup.  
  - Queries consume only the RAM needed for the returned records (no overhead scanning).  
- **Data model**: Works like a **persistent HashMap**, but with **1-to-N versioned storage** (each key can hold multiple versions).  
- **Durability**: Data is not lost after shutdown; behaves like a hybrid of in-memory hashmap and disk-backed storage.  
- **Scalability**: Optimized for both large sequential writes and fast point lookups.
- Load time: ~**1 second / 1 million records**.  
  - Faster on multi-core CPUs due to parallel loading.  

> Designed for high-performance workloads where memory predictability, persistence, and O(1) access matter.

---

## License

MIT © [yukiakai](https://github.com/yukiakai212)

---

[npm-downloads-image]: https://badgen.net/npm/dm/snowdb
[npm-downloads-url]: https://www.npmjs.com/package/snowdb
[npm-url]: https://www.npmjs.com/package/snowdb
[npm-version-image]: https://badgen.net/npm/v/snowdb
[changelog-url]: https://github.com/yukiakai212/snowdb.js/blob/main/CHANGELOG.md