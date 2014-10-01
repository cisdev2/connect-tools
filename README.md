# Connect Tools
Javascript bookmarklets to help with using Blackboard Connect.

For more information and to install, visit: http://gondek.github.io/connect-tools

## Technical Notes
To turn any of the source .js files into a bookmarklet:

1. Copy all the code into a JS minifier, such as [JS Compress](http://jscompress.com/)
2. replace all "" (double-quotes) around strings to '' (single-quotes)
    - Only needed if it will be turned into a href in a HTML anchor/link tag
3. add `javascript:` in front of the code and use that as the bookmark URL