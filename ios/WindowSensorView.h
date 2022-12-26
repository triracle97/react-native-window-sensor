#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

@interface WindowSensorView : UIView

@property (nonatomic, copy) RCTBubblingEventBlock onCustomMeasure;

@end
