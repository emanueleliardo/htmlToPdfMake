'use strict'

const { expect } = require('chai')
const htmlToPdfmake = require('../src/htmlToPdfmake')

describe('pdfForElement', () => {

  const pdfForElement = htmlToPdfmake.pdfForElement

  it('should done', () => {
    const html = '<p>normale <b>grassetto</b> <i>corsivo</i> <u>sottolineato</u> <b><i>grassettocorsivo</i></b></p>'
    const expected = [
      {
        "stack": [
          {
            "text": [
              {
                "text": "normale "
              },
              {
                "text": "grassetto",
                "bold": true
              },
              {
                "text": " "
              },
              {
                "text": "corsivo",
                "italics": true
              },
              {
                "text": " "
              },
              {
                "text": "sottolineato",
                "decoration": "underline"
              },
              {
                "text": " "
              },
              {
                "text": "grassettocorsivo",
                "bold": true,
                "italics": true
              }
            ]
          }
        ]
      }
    ]

    return pdfForElement(html)
      .then(result => {
        expect(result).to.deep.eq(expected)
      })

  })

  it('should parse h1', () => {
    const html = `<div><h1>header1</h1></div>`
    const expected = [{"stack":[{"text":[]},{"stack":[{"text":[{"text":"header1","fontSize":32,"bold":true}]}]}]}]

    return pdfForElement(html)
      .then(result => {
        expect(result).to.deep.eq(expected)
      })

  })

  it('should parse h2', () => {
    const html = `<div><h2>header2</h2></div>`
    const expected = [{"stack":[{"text":[]},{"stack":[{"text":[{"text":"header2","fontSize":24,"bold":true}]}]}]}]

    return pdfForElement(html)
      .then(result => {
        expect(result).to.deep.eq(expected)
      })

  })

  it('should parse h3', () => {
    const html = `<div><h3>header3</h3></div>`
    const expected = [{"stack":[{"text":[]},{"stack":[{"text":[{"text":"header3","fontSize":19,"bold":true}]}]}]}]

    return pdfForElement(html)
      .then(result => {
        expect(result).to.deep.eq(expected)
      })

  })

})