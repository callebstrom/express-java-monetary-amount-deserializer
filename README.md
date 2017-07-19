# express-java-monetary-amount-deserializer

[![dependencies Status](https://david-dm.org/callebstrom/express-java-monetary-amount-deserializer/status.svg)](https://david-dm.org/callebstrom/express-java-monetary-amount-deserializer)

A express middleware module for deserializing Javas MonetaryAmount object

### Usage

```es6
import deserializeMonetary from 'express-java-monetary-amount-deserializer'
let app = express()
app.use(deserializeMonetary)
``` 


### Example flat ###
Input:
```javascript
{
  sum: "GBP 100.00"
}
```

Output:
```javascript
{
  sum: {
    amount: 100
    currency: "GBP"
  }
}
```

### Example nested ###
Input:
```javascript
{
  goods_list: [
     { 
        title: "item 1",
        price: "EUR 10.50",
     },
     { 
        title: "item 2",
        price: "EUR 25.99",
     }
  ]
}
```

Output:
```javascript
{
  goods_list: [
     { 
        title: "item 1",
        price: {
           amount: 10.5,
           currency: "EUR"
        }
     },
     { 
        title: "item 2",
        price: {
           amount: 25.99,
           currency: "EUR"
        }
     }
  ]
}
```
