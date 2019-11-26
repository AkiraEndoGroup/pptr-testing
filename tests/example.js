const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../lib/config')
const click = require('../lib/helpers').click
const typeText = require('../lib/helpers').typeText
const loadUrl = require('../lib/helpers').loadUrl
const waitForText = require('../lib/helpers').waitForText
const pressKey = require('../lib/helpers').pressKey
const shouldExist = require('../lib/helpers').shouldExist

const generateId = require('../lib/utils').generateId

describe('My first puppeteer test', () => {
  let browser
  let page

  before(async function() {
    browser = await puppeteer.launch({
      headless: config.headless,
      slowMo: config.slowMo,
      devtools: config.devtools,
      timeout: config.launchTimeout
    })
    page = await browser.newPage()
    await page.setDefaultTimeout(config.waitingTimeout)
    await page.setViewport({
      width: config.viewportWidth,
      height: config.viewportHeight
    })
  })

  after(async function() {
    await browser.close()
  })

  it('My first test step', async () => {
    
    // await page.goto('http://dev.to')
    // await page.goto(config.baseUrl)
    await loadUrl(page, config.baseUrl)
    
    // await page.waitForSelector('#nav-search')
    await shouldExist(page, '#nav-search')

    const url = await page.url()
    const title = await page.title()

    expect(url).to.contain('dev')
    expect(title).to.contains('Community')
  })

  it('browser reload', async () => {
    await page.reload()
    
    // await page.waitForSelector('#page-content')
    await shouldExist(page, '#page-content')
    
    await waitForText(page, 'body', 'WRITE A POST')

    const url = await page.url()
    const title = await page.title()

    // await page.waitFor(3000) // Bad practice !!

    expect(url).to.contain('dev')
    expect(title).to.contains('Community')
  })

  it('click method', async () => {
    // await page.goto('http://dev.to')
    await loadUrl(page, config.baseUrl)
    
    // await page.waitForSelector('#write-link')
    // await page.click('#write-link')
    // await page.click('#write-link', {
    //   button: 'right',
    //   clickCount: 5,
    //   delay: 100
    // })
    await click(page, '#write-link')
    
    // await page.waitForSelector('.registration-rainbow')
    await shouldExist(page, '.registration-rainbow')
  })

  it('submit searchbox', async () => {
    // await page.goto('http://dev.to')
    await loadUrl(page, config.baseUrl)

    // await page.waitForSelector('#nav-search')
    // await page.type('#nav-search', 'Javascript')
    // await typeText(page, 'Javascript', '#nav-search')
    await typeText(page, generateId(15), '#nav-search')
    await page.waitFor(3000)

    // await page.keyboard.press('Enter')
    await pressKey(page, 'Enter')

    // await page.waitForSelector('#articles-list')
    await shouldExist(page, '#articles-list')
  })
})