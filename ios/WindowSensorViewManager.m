#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTLog.h>
#import "WindowSensorView.h"

@interface WindowSensorViewManager : RCTViewManager
@end

@implementation WindowSensorViewManager

RCT_EXPORT_MODULE(WindowSensorView)
RCT_EXPORT_VIEW_PROPERTY(onCustomMeasure, RCTBubblingEventBlock)

- (UIView *)view
{
  WindowSensorView *view = [[WindowSensorView alloc] init];
  return view;
}

RCT_EXPORT_METHOD(measureAbsolutePosition:(nonnull NSNumber*) reactTag) {
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    WindowSensorView *view = viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[UIView class]]) {
      RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
      return;
    }
    CGRect absolutePosition = [view convertRect:view.bounds toView:nil];
    view.onCustomMeasure(@{
      @"x": @(absolutePosition.origin.x),
      @"y": @(absolutePosition.origin.y)
    });
  }];
}

RCT_CUSTOM_VIEW_PROPERTY(color, NSString, UIView)
{
  [view setBackgroundColor:[self hexStringToColor:json]];
}

- hexStringToColor:(NSString *)stringToConvert
{
  NSString *noHashString = [stringToConvert stringByReplacingOccurrencesOfString:@"#" withString:@""];
  NSScanner *stringScanner = [NSScanner scannerWithString:noHashString];

  unsigned hex;
  if (![stringScanner scanHexInt:&hex]) return nil;
  int r = (hex >> 16) & 0xFF;
  int g = (hex >> 8) & 0xFF;
  int b = (hex) & 0xFF;

  return [UIColor colorWithRed:r / 255.0f green:g / 255.0f blue:b / 255.0f alpha:1.0f];
}

@end
