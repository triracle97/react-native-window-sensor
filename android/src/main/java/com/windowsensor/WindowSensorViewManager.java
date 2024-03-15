package com.windowsensor;

import android.graphics.Color;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;

public class WindowSensorViewManager extends SimpleViewManager<View> {
  public static final String REACT_CLASS = "WindowSensorView";
  public final int MEASURE_ABSOLUTE_POSITION = 1111;

  @Override
  @NonNull
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  @NonNull
  public View createViewInstance(ThemedReactContext reactContext) {
    return new View(reactContext);
  }

  @ReactProp(name = "color")
  public void setColor(View view, String color) {
    view.setBackgroundColor(Color.parseColor(color));
  }

  @Nullable
  @Override
  public Map<String, Integer> getCommandsMap() {
    return MapBuilder.of("measureAbsolutePosition", MEASURE_ABSOLUTE_POSITION);
  }

  @Override
  public Map getExportedCustomBubblingEventTypeConstants() {
    return MapBuilder.builder().put(
      "onCustomMeasure",
      MapBuilder.of(
        "phasedRegistrationNames",
        MapBuilder.of("bubbled", "onCustomMeasure")
      )
    ).build();
  }


  @Override
  public void receiveCommand(@NonNull View root, String commandId, @Nullable ReadableArray args) {
    super.receiveCommand(root, commandId, args);
    int reactNativeViewId = args.getInt(0);
    int commandIdInt = Integer.parseInt(commandId);

    switch (commandIdInt) {
      case MEASURE_ABSOLUTE_POSITION:
        try {
          View view = root.findViewById(reactNativeViewId);
          int pos[] = new int[2];
          view.getLocationOnScreen(pos);
          ReactContext reactContext = (ReactContext)view.getContext();
          int x1 = Math.round((pos[0] + view.getWidth()) / reactContext.getResources().getDisplayMetrics().density);
          int y1 = Math.round((pos[1] + view.getHeight()) / reactContext.getResources().getDisplayMetrics().density);
          pos[1] = Math.round(pos[1] / reactContext.getResources().getDisplayMetrics().density);
          pos[0] = Math.round(pos[0] / reactContext.getResources().getDisplayMetrics().density);
          WritableMap event = Arguments.createMap();
          event.putInt("x", pos[0]);
          event.putInt("y", pos[1]);
          event.putInt("x1", x1);
          event.putInt("y1", y1);
          reactContext
            .getJSModule(RCTEventEmitter.class)
            .receiveEvent(view.getId(), "onCustomMeasure", event);
        } catch (Exception e) {
          e.printStackTrace();
        }
        break;
      default:
        break;
    }
  }
}
