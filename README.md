# Last update indicator widget for HABPanel (OpenHAB)

## Description
Displays the time passed in hours when an item last received an update, it slowly goes to red when time increases. Usefull when using battery operated Zwave/Zigbee devices, those could die/drop of the network without you noticing. You cannot set the indicator directory to the item, you need to create a monitor rule for each device you wish to monitor. The rule updates a datetime item reflecting the last updated time of the monitored item.

![Screenshot](screenshot.png?raw=true "Screenshot")

## Download
* The widget json file: **[Last update indicator.widget.json](https://github.com/BasvanH/habpanel-widget-lastupdate-indicator)**
* The javascript file: **[lastupdate-indicator.controller.js](https://github.com/BasvanH/habpanel-widget-lastupdate-indicator)**

## Prerequisites
* You need to create a '_lastUpdate' item of type datetime for each device/item you want to monitor.
* For each, create a rule which updates the '_lastUpdate' item to the last date it receved an update.

## Example
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

## Installation
* Create a folder within '/conf/html/' folder, name it 'lastupdate-indicator'.
* Place the 'lastupdate-indicator.controller.js' file in the '/conf/html/lastupdate-indicator/' folder.
* Import the downloaded **[Last update indicator.widget.json](https://github.com/BasvanH/habpanel-widget-openweathermap/blob/master/Last%20update%20indicator.widget.json)** widget to your HABpanel.
* Add the widget to a dashboard, open the settings.
  * Select the '_lastUpdate' item.
  * Set the desired name which will be displayed in the widget.
  * Enjoy en drop me a like here on the [Openhab cummunity forum](https://community.openhab.org/t/!!!!).

The complete structure would look like this:

- /conf/html
  - /lastupdate-indicator
      - lastupdate-indicator.controller.js

## Help
If you need any help, use this [topic](https://community.openhab.org/t/!!!!!!) on the Openhab community forum.

For issues and feature requests, please use the [Issues module](https://github.com/BasvanH/habpanel-widget-lastupdate-indicator/issues) on Github.
