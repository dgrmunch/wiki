
# Run

In Phej dir:

```
npm install -g http-server
http-server
```

# Create Electron native app

```
npm install -g nativefier
nativefier https://wiki.xmunch.com/phej
```

# Extend

Add your own plugins to the dir `js/plugins` following the same structure that is displayed in `js/plugins/test.js`.

# Create your own programs in Phej

You can download your programs directly from `Phej` clicking in the download button.
If you save them in the `programs` folder you will be also able to load them directly in the browser.

For example, if your program is stored in `001.phej` you can load it by typing:

```
http://<server:port>/#@<program_file_name>
```

Some programs are included by default: `http://localhost:8080/#@001`


# Add your own samples

You can download more samples or create your own. Then you can save them in the `samples`. Remember to use their name without the extension to load them directly in `Phej`.

The samples used in the project have been downloaded from the Tone.js Github repo and https://samplefocus.com


