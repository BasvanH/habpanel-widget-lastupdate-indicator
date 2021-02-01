# Last update indicator widget for HABPanel (OpenHAB)
By making a donation, no matter how small, you are saying thanks and drawing a smile on my face because I will know, somebody thought my project was useful and worth paying for 🤩. [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QARL4KXHHZSK8)

## Description
Displays the time passed in hours when an item last received an update, it slowly goes to red when time increases. Usefull when using battery operated Zwave/Zigbee devices, those could die/drop of the network without you noticing. You cannot set the indicator directory to the item, you need to create a monitor rule for each device you wish to monitor. The rule updates a datetime item reflecting the last updated time of the monitored item.

![Screenshot](screenshot.png?raw=true "Screenshot")

## Download
* The widget json file: **[Last update indicator.widget.json](https://github.com/BasvanH/habpanel-widget-lastupdate-indicator)**
* The javascript file: **[lastupdate-indicator.controller.js](https://github.com/BasvanH/habpanel-widget-lastupdate-indicator)**

## Prerequisites
* You need to create a **_lastUpdate** item of type datetime for each device/item you want to monitor.
* For each, create a rule which updates the **_lastUpdate** item to the last date it receved an update.

## Example 1
This is an example for an battery operated Zwave smoke detector, but it shows the base princaple.

**zwave.items**
```
DateTime Zwave_Rookmelder_Gang_LastUpdate           "Laatst gezien [%1$ta %1$tR]"           <clock> (gZwave)
```

**zwave.rules**
```
rule "Rookmelder gang"
when
	Item Zwave_Rookmelder_Gang changed or 
	Item Zwave_Rookmelder_Gang_Battery changed or 
	Thing "zwave:device:a5062334:node2" received update
then
	Zwave_Rookmelder_Gang_LastUpdate.postUpdate(new DateTimeType())
end
```

## Example 2
With this example, suggested by [microneer](https://github.com/microneer), you can combine all devices in just one rule. Create a DateTime item per device with the trailing `_LUD` suffix.

```
// This Rule triggers when any Item in the gRecordLastUpdate Group is updated, and
// updates a virtual DateTime item with the same name as the Item but with _LUD as 
// a suffix, setting it to the current date and time.
rule "Record Last Update"
when
	Member of gRecordLastUpdate received update
then
	// Post an update to the item with the same name and _LUD suffix
 	sendCommand( triggeringItem.name+"_LUD", now.toString)
//	logInfo('lastUpdate', triggerItem.name)
end
```

## Installation
* Create a folder within '/conf/html/' folder, name it 'lastupdate-indicator'.
* Place the 'lastupdate-indicator.controller.js' file in the '/conf/html/lastupdate-indicator/' folder.
* Import the downloaded **[Last update indicator.widget.json](https://github.com/BasvanH/habpanel-widget-lastupdate-indicator/blob/master/Last%20update%20indicator.widget.json)** widget to your HABpanel.
* Add the widget to a dashboard, open the settings.
  * Select the **_lastUpdate** item.
  * Set the desired name which will be displayed in the widget.
  * Enjoy en drop me a like here on the [Openhab cummunity forum](https://community.openhab.org/t/lastupdate-indicator-widget-for-habpanel/69498).

The complete structure would look like this:

- /conf/html
  - /lastupdate-indicator
      - lastupdate-indicator.controller.js

## Help
If you need any help, use this [topic](https://community.openhab.org/t/lastupdate-indicator-widget-for-habpanel/69498) on the Openhab community forum.

For issues and feature requests, please use the [Issues module](https://github.com/BasvanH/habpanel-widget-lastupdate-indicator/issues) on Github.
