URLRedirector
=============

## Description

This widget enables you to redirect to a URL.

## Contributing
For more information on contributing to this repository visit [Contributing to a GitHub repository] (https://world.mendix.com/display/howto50/Contributing+to+a+GitHub+repository)

## Typical usage scenario

Redirect to a static url or a URL stored as a value in an object.

## Features and limitations
 
- Open redirect URL in a new browser window or in the current window
- Combine prefix URL with a dynamic URL part

## Installation

Import the widget to your project and add the widget to a dataview on a page. Configure the properties to determine how the widget will behave in your application.

### Properties

##### General

###### Data source

* *URL(prefix)* - URL to redirect to. (E.g. http://www.mendix.com)
* *URL Attribute* - Attribute containing a URL value to redirect to. (E.g. http://www.mendix.com, you could also combine with the prefix value and add the value '/learn' to it)
* *Target* - Window where the redirect URL should be opened 

## Troubleshooting

URLRedirector may not work on iOS in Phonegap, due to security policies. This issue, and the fix, was reported [here](https://github.com/mendix/URLRedirector/issues/2):

Add this to your ``config.xml``:

```xml
<gap:plugin name="cordova-plugin-whitelist" source="npm" version="1.3.2" />
<allow-navigation href="https://someurl.mendixcloud.com/*" />
```

Make sure the HREF points to your deployment url
