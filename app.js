const express = require('express');
const chrome = require('selenium-webdriver/chrome');
const { Builder, By, Key, until } = require('selenium-webdriver');

let options = new chrome.Options();
// Specify the path to ChromeDriver if needed
options.setChromeBinaryPath('/usr/local/bin/chromedriver');

// Use headless mode if running on a server to avoid display errors
// options.headless();

const app = express();
const port = process.env.PORT || 3000;

// Other routes...

app.get('/run-selenium', async (req, res) => {
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    res.send('Selenium script executed successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error executing Selenium script: ' + error.message);
  } finally {
    await driver.quit();
  }
});
