```js
const fields = ['userId', '123', 'action', 'purchase', 'product', 'laptop', 'amount', '999.99'];
const data = {};

for (let i = 0; i < fields.length; i += 2) {
    data[fields[i]] = fields[i + 1];
}
console.log(data);

```
**Explain :** 
```js
for (let i = 0; i < fields.length; i += 2) {
    data[fields[i]] = fields[i + 1];
}
```

# Step-by-step Iteration of the Loop

## Initial state:
```javascript
fields = ['userId', '123', 'action', 'purchase', 'product', 'laptop', 'amount', '999.99']
data = {}
i = 0
````

---

## Iteration 1

* `i = 0`
* `fields[i] = 'userId'`
* `fields[i+1] = '123'`
* **Assignment:** `data['userId'] = '123'`

**data after iteration 1:**

```javascript
{ userId: '123' }
```

* Increment `i` by 2 → `i = 2`

---

## Iteration 2

* `i = 2`
* `fields[i] = 'action'`
* `fields[i+1] = 'purchase'`
* **Assignment:** `data['action'] = 'purchase'`

**data after iteration 2:**

```javascript
{ userId: '123', action: 'purchase' }
```

* Increment `i` by 2 → `i = 4`

---

## Iteration 3

* `i = 4`
* `fields[i] = 'product'`
* `fields[i+1] = 'laptop'`
* **Assignment:** `data['product'] = 'laptop'`

**data after iteration 3:**

```javascript
{ userId: '123', action: 'purchase', product: 'laptop' }
```

* Increment `i` by 2 → `i = 6`

---

## Iteration 4

* `i = 6`
* `fields[i] = 'amount'`
* `fields[i+1] = '999.99'`
* **Assignment:** `data['amount'] = '999.99'`

**data after iteration 4:**

```javascript
{
  userId: '123',
  action: 'purchase',
  product: 'laptop',
  amount: '999.99'
}
```

* Increment `i` by 2 → `i = 8`

---

## Stop Condition

* `i = 8`
* `i < fields.length → 8 < 8 → false`
* Loop ends

---

## ✅ Final `data` object

```javascript
{
  userId: '123',
  action: 'purchase',
  product: 'laptop',
  amount: '999.99'
}
```

---

## 🔑 Key Points

* `fields` is always **alternating key-value pairs**.
* `i += 2` ensures you step over each **pair**.
* `data[fields[i]] = fields[i+1]` converts the flat array into an **object** for easier use.

```


