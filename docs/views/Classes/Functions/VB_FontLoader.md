---
title: VB_FontLoader 字体加载工具类
date: 2020-04-17
tags:
- 字体
categories:
- 功能类
---

# VB_FontLoader 字体加载工具类

VB_FontLoader是用于加载和管理非系统字体的工具类，并不继承和依赖于`ViperBase`，可以配合`VB_Entity`单独在项目中使用。

> VB_Entity本身也不继承与以来ViperBase其他组件，本身即为ViperBase基础组件。

### 引用类

|类名|描述|参考|
|---|---|---|
|AnyPromise|第三方框架类，用于事件流控制|[PromiseKit](../../3rd/PromiseKit/PromiseKit.md)|
|VB_Entity|基础实例类，依赖于Mantle，继承自MTLModel|[Mantle](../../3rd/Mantle/Mantle.md)|

### 声明类

|类名|描述|参考|
|---|---|---|
|VB_ImportFontEntity|用于注册全局唯一实例，与VB_FontLoader关联|继承自VB_Entity|
|VB_Font|外部字体描述实例|继承自VB_Entity|
|VB_FontLoader|字体加载器类|没有实例方法，全部为类方法封装|


## VB_ImportFontEntity

例子中的全局挂载实例，可以根据需要选择是否使用。

### 导入的字体数组

```objectivec
@property (nonatomic, strong) NSMutableArray* importedFonts;
```
 
## VB_Font

字体文件的对象映射，方便字体文件的使用和管理。

### 系统使用的字体名称

```objectivec
@property (nonatomic, strong) NSString* title;
```

### 字体文件Path
```objectivec
@property (nonatomic, strong) NSString* file;
```

## VB_FontLoader

### 声明

```objectivec
@interface VB_FontLoader : NSObject
```

### + registerFontsAtPath:

通过文件Path注册字体，返回新增字体名字字符串数组。

### + unregistFont:

通过文件Path取消字体注册，返回Promise对象。

### + fontsURL

返回导入字体存储目录，默认为 ~/Document/fonts/

### + importFont:

从外部（例如iCloud）将字体文件拷贝进本地目录

### + autoRegistFont

项目启动时调用，用于自动注册已经导入的字体

### + fontSizeWithTextStyle: 

根据`UIFontTextStyle`返回字体的Size

## 使用方法

一般在APP启动时调用，一定要放在字体被使用之前调用，建议通过Promise控制加载顺序，确保字体加载完再加载UI。例子是配合`VB_Router`使用了，实际使用中也可以配合全局单例使用，或将字体数据附加在`AppDelegate`或`SceneDelegate`来管理声明周期。

### 启动加载

```objectivec
/// 加载额外的字体，首先注册全局变量，然后加载字体，最后记录字体
- (void)loadExtraFonts {
    // 声明导入字体依赖实例
    VB_ImportFontEntity* model = [[VB_ImportFontEntity alloc] init];
    // VB_Router注册全局变量
    [VB_Router bind:@"fonts" entity:model].then(^ {
        // 自动加载额外字体
        return [VB_FontLoader autoRegistFont];
    }).then(^(NSArray* fonts){
        // 字体加入依赖实例
        [model.importedFonts addObjectsFromArray:fonts];
        return @(model.importedFonts.count);
    }).then(^(id num) {
        NSLog(@"加载了%@个字体",num);
    }).catch(^(NSError* e) {
        NSLog(@"%@",e);
    });
}
```

### 导入新字体

选择系统iCloud文件，可以配合[VB_FileSelectorInteractor](../ToolInteractor/VB_FileSelectorInteractor.md)使用。

``` objectivec
// 导入字体
[VB_FontLoader importFont:[NSURL fileURLWithPath:file]]
.then(^ (NSURL* url) {
    VB_Font* f = [[VB_Font alloc] init];
    // 注册字体，并获取字体名字
    f.title = [VB_FontLoader registerFontsAtPath:url.path].firstObject;
    f.file = url.path;
    return f;
}).then(^ (VB_Font* f){
    // 加入全局数组 , 如果fonts全局变量没有注册，可以抛个异常
    VB_ImportFontEntity* font = [VB_Router entityForKey:@"fonts"];
    if(font) {
        [font.importedFonts addObject:f];
    }
}).catch(^ (NSError* e) {
    // e.code == 516 说明文件已经拷贝过了
});
```

### 获取载入字体列表

``` objectivec
 [VB_Router globalEntityForKey:@"fonts"]
 .then(^(VB_ImportFontEntity* font) {
    // font.importedFonts 就是加载字体数组，为VB_Font实例    
 });
```

### 卸载字体/删除字体文件

例子中的font实例，是从`获取载入字体列表`接口中获取的

``` objectivec
VB_Font* targetFont = [font.importedFonts firstObject];
[VB_FontLoader unregistFont:targetFont.file].then(^{
    NSFileManager* fm = [NSFileManager defaultManager];
    if ([fm fileExistsAtPath:targetFont.file]) {
        NSError* error;
        BOOL deleteFile = [fm removeItemAtPath:targetFont.file error:&error];
        if (!deleteFile) {
            // 删除文件失败
        } else {
            // 删除文件成功
        }
    } else {
        // 文件不存在
    }
});
```

