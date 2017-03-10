import { expect } from 'chai'
import deserialize from '../lib/express-java-monetary-amount-deserializer'

function next() {}

describe('Nested tests', function () {

  it('should expand MonetaryAmount in nested object', function () {
    let request = {
      body: {
        goodsList: [
          { title: 'Dancing shoes', amount: 'GBP 100.00' },
          { title: 'Return of not so dancing shoes', amount: 'GBP -100.00' }
        ]
      }
    }
    let response = {}

    deserialize(request, response, next)

    expect(request.body.goodsList[0].amount.amount.toFixed(2))
      .to.equal('100.00')
    expect(request.body.goodsList[0].amount.currency)
      .to.equal('GBP')

    expect(request.body.goodsList[1].amount.amount.toFixed(2)).to.equal('-100.00')
    expect(request.body.goodsList[1].amount.currency).to.equal('GBP')

    // Test string representation
    expect(String(request.body.goodsList[0].amount)).to.equal('GBP 100.00')
    expect(String(request.body.goodsList[1].amount)).to.equal('GBP -100.00')
  })

  it('should expand MonetaryAmount in really nested object', function () {
    let request = {
      body: {
        computer: {
          components: [
            { type: 'ram', brand: 'GoodBrand Inc.', price: 'GBP 200.00' },
            { type: 'cpu', brand: 'GoodBrand Inc.', price: 'GBP 300.00' }
          ],
          sum: 'GBP 500.00'
        }
      }
    }
    let response = {}

    deserialize(request, response, next)

    expect(request.body.computer.components[0].price.amount.toFixed(2))
      .to.equal('200.00')
    expect(request.body.computer.components[1].price.amount.toFixed(2))
      .to.equal('300.00')

    // Should not corrupt rest of the object
    expect(request.body.computer.components[0].type).to.equal('ram')
    expect(request.body.computer.components[1].type).to.equal('cpu')

    // Test string representation
    expect(String(request.body.computer.components[0].price)).to.equal('GBP 200.00')
    expect(String(request.body.computer.components[1].price)).to.equal('GBP 300.00')
  })

  it('should parse arrays as arrays', function () {
    let request = {
      body: {
        computer: {
          components: [
            { type: 'ram', brand: 'GoodBrand Inc.', price: 'GBP 200.00' },
            { type: 'cpu', brand: 'GoodBrand Inc.', price: 'GBP 300.00' }
          ],
          sum: 'GBP 500.00'
        }
      }
    }
    let response = {}

    deserialize(request, response, next)
    request.body.computer.components.map(function(item) {
      expect(item.type).to.be.a('string')
      expect(item.price.amount).to.be.a('number')
      expect(item.price.currency).to.be.a('string')
    })
  })
})
